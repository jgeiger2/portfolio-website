/**
 * Style Patterns
 * 
 * This file defines consistent style patterns to be used across the site.
 * Use these patterns to maintain a cohesive look and feel.
 */

// Background patterns for sections
export const backgroundPatterns = {
  // Main gradient for hero sections
  hero: "bg-gradient-playful from-primary-100 via-background-light to-secondary-100 dark:from-primary-950 dark:via-background-dark dark:to-secondary-950",
  
  // Section backgrounds
  primary: "bg-gradient-to-b from-primary-100 to-background-light dark:from-primary-950 dark:to-background-dark",
  secondary: "bg-gradient-to-b from-background-light to-secondary-50 dark:from-background-dark dark:to-secondary-950/30",
  accent: "bg-gradient-to-b from-background-light to-accent-50 dark:from-background-dark dark:to-accent-950/30",
  tertiary: "bg-gradient-to-b from-background-light to-tertiary-50 dark:from-background-dark dark:to-tertiary-950/30",
  
  // CTA section
  cta: "bg-gradient-playful from-accent-100 via-background-light to-primary-100 dark:from-accent-950 dark:via-background-dark dark:to-primary-950",
  
  // Card backgrounds
  card: "bg-white dark:bg-gray-800",
  cardGradient: "bg-gradient-to-r from-background-light to-primary-50 dark:from-background-dark dark:to-primary-950/30",
};

// Button style patterns based on purpose
export const buttonPatterns = {
  // Primary actions (View Projects, Submit, etc.)
  primary: "variant=\"outline\" className=\"shadow-glow-primary\"",
  
  // Secondary actions (Contact, Details, etc.)
  secondary: "variant=\"outline\" className=\"shadow-glow-secondary\"",
  
  // Accent actions (Resume, etc.)
  accent: "variant=\"outline\" className=\"shadow-glow-accent\"",
  
  // Tertiary actions (Blog, etc.)
  tertiary: "variant=\"outline\" className=\"shadow-glow-tertiary\"",
};

// Section spacing pattern
export const sectionSpacing = "py-20";

// Card hover effects
export const cardHoverEffects = "hover:shadow-lg transition-all duration-300 hover:-translate-y-1";

// Text gradient styles
export const textGradients = {
  primary: "gradient-text",
  accent: "gradient-text-accent",
  tertiary: "gradient-text-tertiary",
}; 