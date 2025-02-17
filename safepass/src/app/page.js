'use client'
import React from 'react'
import { motion } from "framer-motion";
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const Page = () => {
  const route=useRouter();

  const dashboadclick=()=>{
    route.push("/dashboard");
  }
  return (<>
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-purple-900 text-white">
    {/* Hero Section */}
    <div className="container mx-auto px-6 py-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="text-5xl font-bold mb-6"
      >
        Advanced Password Management
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="text-xl mb-12"
      >
        100% Secure. Easy to Use. Built for Everyone.
      </motion.p>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="flex justify-center space-x-4"
      >
        <Button className="bg-blue-500 hover:bg-blue-600 px-8 py-4" onClick={dashboadclick}> 
          Try it
        </Button>
        <Button variant="outline" className="px-8 py-4 text-black">
          Learn More
        </Button>
      </motion.div>
    </div>

    {/* Features Section */}
    <div className="bg-white text-gray-900 py-20 mx-5">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-12">Why Choose SafePass?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4">Military-Grade Security</h3>
            <p>Your passwords are encrypted with AES-256 encryption.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4">Cross-Platform Sync</h3>
            <p>Access your passwords on any device, anywhere.</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="p-6 bg-gray-100 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold mb-4">Easy to Use</h3>
            <p>Intuitive interface designed for everyone.</p>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
  </>
  )
}

export default Page