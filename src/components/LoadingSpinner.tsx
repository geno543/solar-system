import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center">
      <motion.div
        className="relative w-16 h-16"
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full border-4 border-blue-500/20" />
        
        {/* Spinning ring */}
        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500" />
        
        {/* Inner pulsing dot */}
        <motion.div
          className="absolute inset-[25%] rounded-full bg-blue-500"
          animate={{ scale: [0.8, 1.2, 0.8] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  )
}

export default LoadingSpinner;
