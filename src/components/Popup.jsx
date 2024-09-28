import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function Popup({ message, isVisible }) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-5 left-1/2 transform -translate-x-1/2 bg-zinc-800 text-white px-6 py-3 rounded-full shadow-lg z-50"
        >
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default Popup