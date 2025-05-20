import { addDoc, collection } from "firebase/firestore";
import { db } from "../src/lib/firebase/firebase";

const sampleProjects = [
  {
    title: "E-Commerce Platform",
    description: "A full-featured online store with product management, authentication, and Stripe payment processing.",
    technologies: ["Next.js", "React", "Stripe", "Firebase"],
    images: [
      "https://placehold.co/600x400?text=E-Commerce+Platform"
    ],
    order: 1,
    links: {
      github: "https://github.com/your-repo/ecommerce",
      live: "https://ecommerce.example.com"
    }
  },
  {
    title: "Social Media Dashboard",
    description: "Analytics and management platform for multiple social media accounts with real-time data visualization.",
    technologies: ["React", "D3.js", "Node.js", "MongoDB"],
    images: [
      "https://placehold.co/600x400?text=Social+Media+Dashboard"
    ],
    order: 2,
    links: {
      github: "https://github.com/your-repo/social-dashboard",
      live: "https://social.example.com"
    }
  }
];

export async function addSampleProjects() {
  for (const project of sampleProjects) {
    await addDoc(collection(db, "projects"), project);
    console.log(`Added project: ${project.title}`);
  }
}

// To run with ts-node or node --loader ts-node/esm scripts/addSampleProjects.ts
if (require.main === module) {
  addSampleProjects().then(() => {
    console.log("All sample projects added!");
    process.exit(0);
  });
} 