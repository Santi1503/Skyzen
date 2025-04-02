import { motion } from "framer-motion";

const LoadingScreen = () => {
  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="flex items-center justify-center mb-6"
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="relative">
          <motion.div
            className="w-24 h-24 rounded-full bg-yellow-400"
            animate={{
              boxShadow: [
                "0 0 0px 0px rgba(252, 211, 77, 0.7)",
                "0 0 20px 10px rgba(252, 211, 77, 0.7)",
              ],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          />

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          >
            {[...Array(8)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-6 h-1 bg-blue-500 rounded-full origin-left"
                style={{
                  left: "50%",
                  transformOrigin: "0% 50%",
                  transform: `rotate(${i * 45}deg) translateX(30px)`,
                }}
                initial={{ opacity: 0.3, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  repeat: Infinity,
                  repeatType: "reverse",
                  delay: i * 0.1,
                }}
              />
            ))}
          </motion.div>
        </div>
      </motion.div>

      <motion.h1
        className="text-2xl font-bold text-blue-900 mb-2"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        Tempester
      </motion.h1>

      <motion.p
        className="text-blue-700"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        Loading your forecast experience...
      </motion.p>
    </motion.div>
  );
};

export default LoadingScreen;
