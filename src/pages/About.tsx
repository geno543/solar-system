import { motion } from 'framer-motion'

const About = () => {
  return (
    <div className="max-w-4xl mx-auto py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-black/30 backdrop-blur-lg rounded-xl p-8"
      >
        <h2 className="text-4xl font-bold mb-6">About Solar Explorer</h2>
        
        <div className="space-y-6 text-gray-300">
          <p>
            Welcome to Solar Explorer, your gateway to understanding our cosmic neighborhood.
            Our mission is to make space exploration accessible and engaging for everyone,
            from curious beginners to astronomy enthusiasts.
          </p>
          
          <p>
            Through interactive visualizations and detailed information about each planet,
            we aim to inspire wonder and curiosity about the vast universe we live in.
          </p>
          
          <div className="mt-8">
            <h3 className="text-2xl font-bold mb-4">Features</h3>
            <ul className="list-disc list-inside space-y-2">
              <li>Interactive 3D planet visualizations</li>
              <li>Detailed information about each celestial body</li>
              <li>Regular updates with the latest space discoveries</li>
              <li>Educational resources for students and teachers</li>
            </ul>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default About
