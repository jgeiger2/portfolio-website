"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Container, 
  Section, 
  Card, 
  CardHeader, 
  CardTitle, 
  CardContent,
  Button
} from '@/components/ui';
import ProfileImage from '@/components/ProfileImage';
import { backgroundPatterns, cardHoverEffects } from '@/lib/stylePatterns';
import { fetchSkills, fetchTimeline } from "@/lib/firebase/firebaseUtils";

export default function AboutPage() {
  // State for skills and timeline data
  const [skills, setSkills] = useState<any[]>([]);
  const [timelineData, setTimelineData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // State for active skill category filter
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Load data on mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch data from Firebase
        const skillsData = await fetchSkills();
        const timelineData = await fetchTimeline();
        
        // If no data, use defaults
        setSkills(skillsData.length > 0 ? skillsData : defaultSkills);
        setTimelineData(timelineData.length > 0 ? timelineData : defaultTimelineData);
      } catch (error) {
        console.error("Error loading data:", error);
        // Use defaults on error
        setSkills(defaultSkills);
        setTimelineData(defaultTimelineData);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);
  
  // Filter skills based on active category
  const filteredSkills = activeCategory === 'all' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <>
      <Section className="py-20 bg-gradient-playful from-primary-100 via-background-light to-secondary-100 dark:from-primary-950 dark:via-background-dark dark:to-secondary-950 text-white overflow-hidden relative">
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-20">
          <motion.div 
            className="absolute top-20 left-10 w-32 h-32 rounded-full bg-accent-500 blur-3xl"
            animate={{ 
              y: [0, -15, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{ 
              duration: 6,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute bottom-20 right-10 w-32 h-32 rounded-full bg-secondary-500 blur-3xl"
            animate={{ 
              y: [0, -15, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 7, 
              delay: 1, 
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 w-40 h-40 rounded-full bg-primary-500 blur-3xl -translate-x-1/2 -translate-y-1/2"
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.6, 0.8, 0.6]
            }}
            transition={{ 
              duration: 8,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          />
        </div>
        
        <Container>
          <div className="flex flex-col lg:flex-row items-start gap-10 max-w-6xl mx-auto relative z-10">
            {/* Left column with profile image and about text */}
            <motion.div 
              className="w-full lg:w-2/5 flex flex-col items-center lg:items-start"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Profile image with animation */}
              <div className="relative shrink-0 mb-8">
                <motion.div 
                  className="absolute -inset-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full blur-sm"
                  animate={{ 
                    scale: [1, 1.05, 1],
                    opacity: [0.8, 1, 0.8]
                  }}
                  transition={{ 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                />
                <motion.div 
                  className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-xl"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <ProfileImage />
                </motion.div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">About Me</h1>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  <p>
                    Hello! I'm James, a passionate full-stack developer with over 5 years of experience building modern web applications. 
                    I specialize in React, Next.js, and Firebase, focusing on creating intuitive and performant user experiences.
                  </p>
                  <p>
                    My journey in web development began when I built my first website during college. Since then, 
                    I've worked with various companies and clients to deliver solutions that combine technical excellence with user-centric design.
                  </p>
                  <p>
                    When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, 
                    or sharing my knowledge through blog posts and community events.
                  </p>
                </div>
              </motion.div>
            </motion.div>
            
            {/* Right column with career timeline */}
            <motion.div 
              className="w-full lg:w-3/5 mt-10 lg:mt-0"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-2xl font-bold mb-6 text-cyan-400 text-center lg:text-left">Career Timeline</h2>
              
              <div className="relative min-h-[600px]">
                {/* Vertical line */}
                <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-blue-400 via-purple-400 to-cyan-400 rounded-full"></div>
                
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {isLoading ? (
                    <div className="flex justify-center items-center h-60">
                      <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    timelineData.map((item, index) => (
                      <motion.div 
                        key={index} 
                        className="relative pl-8 mb-12"
                        variants={itemVariants}
                      >
                        {/* Timeline dot */}
                        <div className="absolute left-0 transform -translate-x-1/2 w-10 h-10 rounded-full bg-[#001a3a] border-3 border-blue-400 z-10 flex items-center justify-center shadow-lg">
                          <motion.div 
                            className="w-6 h-6 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center"
                            whileHover={{ scale: 1.2, rotate: 360 }}
                            transition={{ duration: 0.6 }}
                          >
                            {item.icon === 'briefcase' ? (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                            ) : (
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                              </svg>
                            )}
                          </motion.div>
                        </div>
                        
                        <Card className={`border border-blue-500/30 bg-[#0a2245] text-white shadow-md ${cardHoverEffects} overflow-hidden`}>
                          <CardHeader className="pb-2 bg-gradient-to-r from-[#0a2245] to-[#001a3a]">
                            <CardTitle>
                              <div className="flex flex-col">
                                <span className="text-lg font-bold text-cyan-400">{item.title}</span>
                                <div className="flex items-center text-xs text-gray-300">
                                  <span className="font-medium">{item.company}</span>
                                  <span className="mx-2">•</span>
                                  <span>{item.period}</span>
                                </div>
                              </div>
                            </CardTitle>
                          </CardHeader>
                          <CardContent className="py-3">
                            <p className="text-gray-300">{item.description}</p>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))
                  )}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </Container>
      </Section>
      
      <Section className="py-20 relative">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">Skills & Expertise</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              I've worked with various technologies across the full stack development spectrum. Here's a breakdown of my technical skills and expertise.
            </p>
          </div>

          {/* Category filter */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            <Button 
              variant={activeCategory === 'all' ? 'primary' : 'outline'}
              onClick={() => setActiveCategory('all')}
              className="min-w-[100px]"
            >
              All
            </Button>
            {Array.from(new Set(skills.map(skill => skill.category))).map(category => (
              <Button 
                key={category as string} 
                variant={activeCategory === category ? 'primary' : 'outline'}
                onClick={() => setActiveCategory(category as string)}
                className="min-w-[100px] capitalize"
              >
                {category as string}
              </Button>
            ))}
          </div>

          {/* Skills grid */}
          {isLoading ? (
            <div className="flex justify-center items-center h-60">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredSkills.map((skill, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <Card className={`h-full ${cardHoverEffects}`}>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-lg flex justify-between items-center">
                        <span>{skill.name}</span>
                        <span className="text-sm font-normal text-primary-500 dark:text-primary-400">{skill.level}%</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2.5 rounded-full" 
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 capitalize">{skill.category}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </Container>
      </Section>
    </>
  );
}

// Default data to use if Firebase data fails to load
const defaultSkills = [
  { name: 'React', level: 90, category: 'frontend' },
  { name: 'Next.js', level: 85, category: 'frontend' },
  { name: 'TypeScript', level: 80, category: 'language' },
  { name: 'Node.js', level: 85, category: 'backend' },
  { name: 'Firebase', level: 80, category: 'backend' },
  { name: 'Tailwind CSS', level: 90, category: 'frontend' },
  { name: 'GraphQL', level: 75, category: 'api' },
  { name: 'MongoDB', level: 70, category: 'database' },
  { name: 'PostgreSQL', level: 65, category: 'database' },
  { name: 'AWS', level: 60, category: 'devops' },
  { name: 'Docker', level: 55, category: 'devops' },
  { name: 'CI/CD', level: 60, category: 'devops' },
  { name: 'UI/UX Design', level: 75, category: 'design' },
  { name: 'Responsive Design', level: 85, category: 'design' },
  { name: 'Accessibility', level: 70, category: 'design' },
  { name: 'Performance Optimization', level: 75, category: 'optimization' },
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
  {
    title: "UX/UI Designer",
    company: "Tech Solutions Inc.",
    period: "2015-2017",
    description: "Designed interfaces for web and mobile applications with a focus on usability and accessibility.",
    icon: "briefcase"
  },
  {
    title: "Master of Education",
    company: "University of South Florida",
    period: "2013-2015",
    description: "Focused on instructional design and technology integration.",
    icon: "graduation-cap"
  }
]; 