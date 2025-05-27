import { auth, db, storage } from "./firebase";
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  User,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  orderBy,
  getDoc,
  setDoc,
  DocumentData,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { BlogPost, Project, AboutData, Blog } from '@/types';

// Auth functions
export const logoutUser = () => signOut(auth);

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    return result.user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

// Firestore functions
export const addDocument = <T extends DocumentData>(collectionName: string, data: T) =>
  addDoc(collection(db, collectionName), data);

export const getDocuments = async <T extends DocumentData>(collectionName: string): Promise<T[]> => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  })) as unknown as T[];
};

export const updateDocument = <T extends DocumentData>(collectionName: string, id: string, data: any) =>
  updateDoc(doc(db, collectionName, id) as any, data);

export const deleteDocument = (collectionName: string, id: string) =>
  deleteDoc(doc(db, collectionName, id));

// Storage functions
export const uploadFile = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// Fetch projects ordered by 'order' field
export const fetchProjects = async (): Promise<Project[]> => {
  const q = query(collection(db, "projects"), orderBy("order", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Project[];
};

// Blog Firestore functions
export const fetchBlogs = async (): Promise<Blog[]> => {
  const q = query(collection(db, "blog"), orderBy("datePublished", "desc"));
  const querySnapshot = await getDocs(q);
  const blogs = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Blog[];
  
  // Debug logs
  console.log("Total blogs fetched:", blogs.length);
  if (blogs.length > 0) {
    console.log("First blog ID:", blogs[0].id);
    console.log("First blog title:", blogs[0].title);
  }
  
  return blogs;
};

export const addBlog = (data: Partial<Blog>) => addDoc(collection(db, "blog"), data);

export const updateBlog = (id: string, data: Partial<Blog>) => updateDoc(doc(db, "blog", id), data);

export const deleteBlog = (id: string) => deleteDoc(doc(db, "blog", id));

// Import blogs from Medium RSS feed
interface MediumRSSItem {
  title: string;
  content: string;
  thumbnail: string;
  link: string;
  pubDate: string;
  categories: string[];
  author: string;
  enclosure?: {
    link: string;
  };
}

interface MediumImportResult {
  success: boolean;
  totalImported?: number;
  totalSkipped?: number;
  blogs?: Blog[];
  error?: string;
}

export const importBlogsFromMedium = async (mediumUsername: string): Promise<MediumImportResult> => {
  try {
    const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Medium RSS feed: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(`RSS feed error: ${data.message || 'Unknown error'}`);
    }
    
    const blogs = await Promise.all(data.items.map(async (item: MediumRSSItem) => {
      let featuredImage = '';
      
      if (item.thumbnail) {
        featuredImage = item.thumbnail;
      }
      
      if (!featuredImage) {
        const storyImageRegex = /<img[^>]*src="(https:\/\/miro\.medium\.com\/v2\/resize:fit:1400\/[^"]+)"[^>]*>/i;
        const storyMatch = storyImageRegex.exec(item.content);
        
        if (storyMatch?.[1]) {
          featuredImage = storyMatch[1];
        }
      }
      
      if (!featuredImage) {
        const imgRegex = /<img[^>]+src="([^">]+)"/;
        const match = imgRegex.exec(item.content);
        if (match?.[1]) {
          featuredImage = match[1];
        }
      }
      
      if (!featuredImage && item.enclosure?.link) {
        featuredImage = item.enclosure.link;
      }
      
      if (featuredImage?.startsWith('http:')) {
        featuredImage = featuredImage.replace('http:', 'https:');
      }
      
      const datePublished = new Date(item.pubDate).toISOString();
      
      const blogQuery = query(collection(db, "blog"));
      const querySnapshot = await getDocs(blogQuery);
      const existingBlog = querySnapshot.docs.find(doc => {
        const data = doc.data();
        return data.title === item.title || data.originalLink === item.link;
      });
      
      if (existingBlog) {
        console.log(`Blog "${item.title}" already exists, skipping...`);
        return {
          id: existingBlog.id,
          skipped: true,
          ...existingBlog.data()
        };
      }
      
      const blogData: Partial<Blog> = {
        title: item.title,
        content: item.content,
        excerpt: item.content.replace(/<[^>]*>/g, '').substring(0, 160),
        featuredImage,
        datePublished,
        originalLink: item.link,
        categories: item.categories,
        importedFromMedium: true,
        author: item.author,
      };
      
      const docRef = await addDoc(collection(db, "blog"), blogData);
      
      return {
        id: docRef.id,
        ...blogData
      } as Blog;
    }));
    
    const importedBlogs = blogs.filter(blog => !('skipped' in blog));
    
    return {
      success: true,
      totalImported: importedBlogs.length,
      totalSkipped: blogs.length - importedBlogs.length,
      blogs: importedBlogs
    };
  } catch (error) {
    console.error("Error importing blogs from Medium:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
};

// About page content functions
export const fetchSkills = async (): Promise<string[]> => {
  try {
    const docRef = doc(db, "about", "skills");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().items || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
};

export const updateSkills = async (skills: string[]): Promise<boolean> => {
  try {
    await setDoc(doc(db, "about", "skills"), { items: skills });
    return true;
  } catch (error) {
    console.error("Error updating skills:", error);
    throw error;
  }
};

export const fetchTimeline = async () => {
  try {
    const docRef = doc(db, "about", "timeline");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().items || [];
    }
    return [];
  } catch (error) {
    console.error("Error fetching timeline:", error);
    return [];
  }
};

export const updateTimeline = async (timeline: AboutData['experience']): Promise<boolean> => {
  try {
    await setDoc(doc(db, "about", "timeline"), { items: timeline });
    return true;
  } catch (error) {
    console.error("Error updating timeline:", error);
    throw error;
  }
};

// Default data
const defaultSkills: string[] = [
  'React',
  'Next.js',
  'TypeScript',
  'Node.js',
  'Firebase',
  'Tailwind CSS',
];

const defaultTimelineData: AboutData['experience'] = [
  {
    company: "Lowe's",
    position: "Product Designer",
    duration: "2024-Present",
    description: "Leading design initiatives for digital products, collaborating with cross-functional teams to create intuitive user experiences."
  },
  {
    company: "Design Agency",
    position: "Senior UX Designer",
    duration: "2017-2020",
    description: "Created user-centered designs for various clients across retail, finance, and healthcare sectors."
  },
];

// Initialize About page data in Firebase
export const initializeAboutData = async () => {
  try {
    const skillsRef = doc(db, "about", "skills");
    const skillsSnap = await getDoc(skillsRef);
    
    const timelineRef = doc(db, "about", "timeline");
    const timelineSnap = await getDoc(timelineRef);
    
    if (!skillsSnap.exists()) {
      console.log("Initializing skills data in Firebase...");
      await setDoc(skillsRef, { items: defaultSkills });
    }
    
    if (!timelineSnap.exists()) {
      console.log("Initializing timeline data in Firebase...");
      await setDoc(timelineRef, { items: defaultTimelineData });
    }
    
    return {
      skillsInitialized: !skillsSnap.exists(),
      timelineInitialized: !timelineSnap.exists()
    };
  } catch (error) {
    console.error("Error initializing about data:", error);
    return {
      skillsInitialized: false,
      timelineInitialized: false,
      error
    };
  }
};

export const updateBlogPost = async (id: string, data: Partial<BlogPost>): Promise<void> => {
  // ... existing code ...
};

export const updateProject = async (id: string, data: Partial<Project>): Promise<void> => {
  // ... existing code ...
};

export const updateAboutData = async (data: Partial<AboutData>): Promise<void> => {
  // ... existing code ...
};
