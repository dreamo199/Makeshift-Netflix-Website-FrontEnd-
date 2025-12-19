import { motion } from "framer-motion";

const Card = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.45 }}
    className="w-full max-w-md mx-auto p-8 rounded-2xl bg-black/70 backdrop-blur-sm border border-white/6 shadow-2xl"
  >
    {children}
  </motion.div>
);

export default Card;