import React from "react";
import { motion } from "framer-motion";

const About = () => {
  return (
    <motion.div
      className="h-screen w-screen flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto p-4">
        <h1 className="text-3xl text-center mb-4">About Us</h1>
        <p className="text-center">Welcome to the about page of our application.</p>
      </div>
    </motion.div>
  );
};

export default About;