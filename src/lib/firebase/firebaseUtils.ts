import { auth, db, storage } from "./firebase";
import {
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
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
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

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
export const addDocument = (collectionName: string, data: any) =>
  addDoc(collection(db, collectionName), data);

export const getDocuments = async (collectionName: string) => {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};

export const updateDocument = (collectionName: string, id: string, data: any) =>
  updateDoc(doc(db, collectionName, id), data);

export const deleteDocument = (collectionName: string, id: string) =>
  deleteDoc(doc(db, collectionName, id));

// Storage functions
export const uploadFile = async (file: File, path: string) => {
  const storageRef = ref(storage, path);
  await uploadBytes(storageRef, file);
  return getDownloadURL(storageRef);
};

// Fetch projects ordered by 'order' field
export const fetchProjects = async () => {
  const q = query(collection(db, "projects"), orderBy("order", "asc"));
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// Add Blog type
export type Blog = {
  id: string;
  title?: string;
  subtitle?: string;
  body?: string;
  category?: string;
  datePublished?: string;
  featuredImage?: string;
  categories?: string[];
  importedFromMedium?: boolean;
};

// Blog Firestore functions
export const fetchBlogs = async (): Promise<Blog[]> => {
  const q = query(collection(db, "blog"), orderBy("datePublished", "desc"));
  const querySnapshot = await getDocs(q);
  const blogs: Blog[] = querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
  
  // Debug logs
  console.log("Total blogs fetched:", blogs.length);
  if (blogs.length > 0) {
    console.log("First blog ID:", blogs[0].id);
    console.log("First blog title:", blogs[0].title);
  }
  
  return blogs;
};

export const addBlog = (data: any) => addDoc(collection(db, "blog"), data);

export const updateBlog = (id: string, data: any) => updateDoc(doc(db, "blog", id), data);

export const deleteBlog = (id: string) => deleteDoc(doc(db, "blog", id));

// Import blogs from Medium RSS feed
export const importBlogsFromMedium = async (mediumUsername: string) => {
  try {
    // Fetch the RSS feed from Medium
    const rssUrl = `https://medium.com/feed/@${mediumUsername}`;
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch Medium RSS feed: ${response.statusText}`);
    }
    
    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error(`RSS feed error: ${data.message || 'Unknown error'}`);
    }
    
    // Process each item from the feed
    const blogs = await Promise.all(data.items.map(async (item: any) => {
      // Extract the content from the HTML
      const content = item.content;
      
      console.log("Medium RSS item:", {
        title: item.title,
        thumbnail: item.thumbnail,
      });
      
      // Extract the story preview image
      let featuredImage = '';
      
      // First priority: use the thumbnail from the RSS feed
      if (item.thumbnail && item.thumbnail !== '') {
        featuredImage = item.thumbnail;
        console.log("Using RSS thumbnail:", featuredImage);
      }
      
      // Second priority: extract "data-image-id" images which are usually high quality Medium preview images
      if (!featuredImage || featuredImage === '') {
        // Look for the main story image with a pattern like:
        // <img src="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*SOME_ID.jpeg" />
        const storyImageRegex = /<img[^>]*src="(https:\/\/miro\.medium\.com\/v2\/resize:fit:1400\/[^"]+)"[^>]*>/i;
        const storyMatch = storyImageRegex.exec(content);
        
        if (storyMatch && storyMatch[1]) {
          featuredImage = storyMatch[1];
          console.log("Extracted story preview image:", featuredImage);
        }
      }
      
      // Third priority: extract any image from the content
      if (!featuredImage || featuredImage === '') {
        const imgRegex = /<img[^>]+src="([^">]+)"/;
        const match = imgRegex.exec(content);
        if (match && match[1]) {
          featuredImage = match[1];
          console.log("Extracted general image from content:", featuredImage);
        }
      }
      
      // Fourth priority: try to use the enclosure if available
      if ((!featuredImage || featuredImage === '') && item.enclosure && item.enclosure.link) {
        featuredImage = item.enclosure.link;
        console.log("Using enclosure image:", featuredImage);
      }
      
      // Ensure the image URL uses https
      if (featuredImage && featuredImage.startsWith('http:')) {
        featuredImage = featuredImage.replace('http:', 'https:');
      }
      
      console.log("Final featured image for", item.title, ":", featuredImage);
      
      // Format date
      const datePublished = new Date(item.pubDate).toISOString();
      
      // Check if blog with this title or link already exists
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
      
      // Create blog object
      const blogData = {
        title: item.title,
        slug: item.title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-'),
        content: content,
        excerpt: item.description,
        featuredImage: featuredImage,
        datePublished: datePublished,
        originalLink: item.link,
        categories: item.categories || [],
        importedFromMedium: true,
        author: item.author || 'Medium',
        body: content,
      };
      
      // Add to Firestore
      const docRef = await addDoc(collection(db, "blog"), blogData);
      
      return {
        id: docRef.id,
        ...blogData
      };
    }));
    
    // Filter out skipped blogs
    const importedBlogs = blogs.filter((blog: any) => !blog.skipped);
    
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
export const fetchSkills = async () => {
  try {
    const docRef = doc(db, "about", "skills");
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      return docSnap.data().items || [];
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching skills:", error);
    return [];
  }
};

export const updateSkills = async (skills: any[]) => {
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
    } else {
      return [];
    }
  } catch (error) {
    console.error("Error fetching timeline:", error);
    return [];
  }
};

export const updateTimeline = async (timeline: any[]) => {
  try {
    await setDoc(doc(db, "about", "timeline"), { items: timeline });
    return true;
  } catch (error) {
    console.error("Error updating timeline:", error);
    throw error;
  }
};

// Default data to initialize Firebase with if none exists
const defaultSkills = [
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'Next.js', level: 85, category: 'frontend' },
  { name: 'TypeScript', level: 80, category: 'language' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Firebase', level: 80, category: 'backend' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend' },
];

const defaultTimelineData = [
  {
    title: "Product Designer",
    company: "Lowe's",
    period: "2024-Present",
    description: "Leading design initiatives for digital products, collaborating with cross-functional teams to create intuitive user experiences.",
    icon: "briefcase"
  },
  {
    title: "Senior UX Designer",
    company: "Design Agency",
    period: "2017-2020",
    description: "Created user-centered designs for various clients across retail, finance, and healthcare sectors.",
    icon: "briefcase"
  },
];

// Initialize About page data in Firebase
export const initializeAboutData = async () => {
  try {
    // Check if skills data exists
    const skillsRef = doc(db, "about", "skills");
    const skillsSnap = await getDoc(skillsRef);
    
    // Check if timeline data exists
    const timelineRef = doc(db, "about", "timeline");
    const timelineSnap = await getDoc(timelineRef);
    
    // Initialize skills if not exists
    if (!skillsSnap.exists()) {
      console.log("Initializing skills data in Firebase...");
      await setDoc(skillsRef, { items: defaultSkills });
    }
    
    // Initialize timeline if not exists
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
