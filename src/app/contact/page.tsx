'use client';

import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import ReCAPTCHA from 'react-google-recaptcha';
import { 
  Container, 
  Section, 
  Button
} from '@/components/ui';

/**
 * TODO: reCAPTCHA Production Setup
 * 
 * TASK: Replace the test reCAPTCHA key with a production key
 * 1. Register your site at https://www.google.com/recaptcha/admin
 * 2. Choose reCAPTCHA v2 ("I'm not a robot" checkbox)
 * 3. Add your domain(s) and get your site key and secret key
 * 4. Replace the test key ("6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI") with your actual site key
 * 5. Implement server-side verification using the secret key in your form handling API
 */

export default function ContactPage() {
  // Form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [captchaValue, setCaptchaValue] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({
    type: null,
    message: '',
  });
  
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  
  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValue(value);
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!name || !email || !message) {
      setFormStatus({
        type: 'error',
        message: 'Please fill out all fields',
      });
      return;
    }
    
    // Check if captcha is completed
    if (!captchaValue) {
      setFormStatus({
        type: 'error',
        message: 'Please complete the CAPTCHA verification',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      /**
       * TODO: Implement form submission API
       * 
       * TASK: Create a form submission API endpoint that:
       * 1. Receives the form data (name, email, message)
       * 2. Verifies the reCAPTCHA token using the secret key
       * 3. Sends email notification or stores the message in a database
       * 4. Returns success/error status to the client
       */
      
      // For now, we'll just simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form on success
      setName('');
      setEmail('');
      setMessage('');
      setCaptchaValue(null);
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
      
      setFormStatus({
        type: 'success',
        message: 'Message sent successfully! I\'ll get back to you soon.',
      });
    } catch (error) {
      setFormStatus({
        type: 'error',
        message: 'There was an error sending your message. Please try again.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Section className="py-20 bg-gradient-playful from-primary-100 via-background-light to-secondary-100 dark:from-primary-950 dark:via-background-dark dark:to-secondary-950 min-h-screen flex items-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-primary-300/20 to-secondary-300/20 dark:from-primary-700/10 dark:to-secondary-700/10 blur-3xl"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 40 + 10}vw`,
              height: `${Math.random() * 40 + 10}vh`,
            }}
            animate={{
              x: [0, Math.random() * 30 - 15],
              y: [0, Math.random() * 30 - 15],
              scale: [1, Math.random() * 0.2 + 0.9],
            }}
            transition={{
              repeat: Infinity,
              repeatType: "reverse",
              duration: Math.random() * 20 + 10,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <Container className="relative z-10">
        <motion.div 
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center mb-12">
            <motion.div
              className="inline-block mb-4 p-2 px-6 bg-white/10 dark:bg-gray-800/20 backdrop-blur-md rounded-full border border-white/20 dark:border-gray-700/20"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <span className="text-sm font-medium text-primary-600 dark:text-primary-400">Let's Connect</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl md:text-6xl font-bold mb-4 gradient-text"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Get In Touch
            </motion.h1>
            <motion.p 
              className="text-xl max-w-2xl mx-auto text-gray-700 dark:text-gray-300"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Interested in working together? Send me a message or connect on social media.
            </motion.p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Message Me Form */}
            <motion.div 
              className="bg-background-light/20 dark:bg-background-dark/20 backdrop-blur-lg border border-white/20 dark:border-gray-800/30 p-6 rounded-xl shadow-xl relative overflow-hidden group"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary-500/5 to-secondary-500/5 transform transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
              
              <h2 className="text-2xl font-bold mb-6 text-primary-500 relative z-10">Message Me</h2>
              
              {/* Form Status Messages */}
              {formStatus.type && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mb-6 p-4 rounded-lg ${
                    formStatus.type === 'success'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-200'
                  }`}
                >
                  {formStatus.message}
                </motion.div>
              )}
              
              <form className="space-y-6 relative z-10" onSubmit={handleSubmit}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.5 }}
                >
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Name</label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="Your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.6 }}
                >
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Email</label>
                  <input 
                    type="email" 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.7 }}
                >
                  <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300">Message</label>
                  <textarea 
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                    rows={6}
                    placeholder="How can I help you?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </motion.div>
                
                {/* reCAPTCHA */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 }}
                  className="flex justify-center"
                >
                  <div className="overflow-hidden rounded-lg">
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI" // TODO: TASK - Replace this test key with your production reCAPTCHA site key
                      onChange={handleCaptchaChange}
                      theme="light"
                      size="normal"
                    />
                  </div>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.9 }}
                  whileHover={{ scale: isSubmitting ? 1 : 1.03 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.97 }}
                >
                  <Button 
                    type="submit"
                    className={`w-full ${
                      isSubmitting 
                        ? 'bg-gray-400 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-primary-500 to-secondary-500 shadow-lg shadow-primary-500/30 dark:shadow-primary-600/20'
                    } text-white transform transition-all`}
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Sending...
                        </>
                      ) : (
                        <>
                          Send Message
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                          </svg>
                        </>
                      )}
                    </span>
                  </Button>
                </motion.div>
              </form>
            </motion.div>
            
            {/* Connect With Me */}
            <motion.div
              className="bg-background-light/20 dark:bg-background-dark/20 backdrop-blur-lg border border-white/20 dark:border-gray-800/30 p-6 rounded-xl shadow-xl relative overflow-hidden group"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-bl from-secondary-500/5 to-primary-500/5 transform transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
              
              <h2 className="text-2xl font-bold mb-6 text-secondary-500 relative z-10">Connect With Me</h2>
              
              <div className="space-y-8 relative z-10">
                {/* LinkedIn */}
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-white/20 dark:bg-gray-700/50 flex items-center justify-center mr-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-secondary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                      <rect x="2" y="9" width="4" height="12" />
                      <circle cx="4" cy="4" r="2" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">LinkedIn</h4>
                    <a href="https://www.linkedin.com/in/thegeigerux/" target="_blank" rel="noopener noreferrer" className="text-secondary-500 hover:underline hover:text-secondary-600 transition-colors text-sm md:text-base truncate block">thegeigerux</a>
                  </div>
                </motion.div>
                
                {/* GitHub */}
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.7 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-white/20 dark:bg-gray-700/50 flex items-center justify-center mr-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-accent-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">GitHub</h4>
                    <a href="https://github.com/thegeigerux" target="_blank" rel="noopener noreferrer" className="text-accent-500 hover:underline hover:text-accent-600 transition-colors text-sm md:text-base truncate block">thegeigerux</a>
                  </div>
                </motion.div>
                
                {/* Instagram */}
                <motion.div 
                  className="flex items-center"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.8 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="w-12 h-12 flex-shrink-0 rounded-full bg-white/20 dark:bg-gray-700/50 flex items-center justify-center mr-4 shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-tertiary-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M8 12h.01M12 12h.01M16 12h.01M20 12h.01" />
                    </svg>
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300">Instagram</h4>
                    <a href="https://www.instagram.com/thegeigerux/" target="_blank" rel="noopener noreferrer" className="text-tertiary-500 hover:underline hover:text-tertiary-600 transition-colors text-sm md:text-base truncate block">thegeigerux</a>
                  </div>
                </motion.div>
                
                {/* Social Media Icons */}
                <motion.div 
                  className="flex justify-center space-x-4 sm:space-x-6 mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.9 }}
                >
                  <motion.a 
                    href="https://www.linkedin.com/in/thegeigerux/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 dark:bg-gray-700/50 flex items-center justify-center text-secondary-500 hover:bg-secondary-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-[22px] sm:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                      <rect x="2" y="9" width="4" height="12"></rect>
                      <circle cx="4" cy="4" r="2"></circle>
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="https://github.com/thegeigerux" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 dark:bg-gray-700/50 flex items-center justify-center text-accent-500 hover:bg-accent-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-[22px] sm:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77A5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                    </svg>
                  </motion.a>
                  <motion.a 
                    href="https://www.instagram.com/thegeigerux/" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/20 dark:bg-gray-700/50 flex items-center justify-center text-tertiary-500 hover:bg-tertiary-500 hover:text-white transition-all duration-300"
                    whileHover={{ scale: 1.1, rotate: 5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)" }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" className="sm:w-[22px] sm:h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                    </svg>
                  </motion.a>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
} 