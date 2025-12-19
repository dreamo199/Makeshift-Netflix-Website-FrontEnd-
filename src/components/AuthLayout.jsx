import { motion } from "framer-motion";
import { Link } from "react-router-dom";   
import Logo from "./logo";

const AuthLayout = ({ children }) => (
  
  <div className="min-h-screen flex items-center justify-center relative bg-[#111] text-white">
    {/* Background image layer */}
    <div className="absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/60 to-black/90" />
    </div>

    <div className="container px-6 lg:px-20">
      <div className="flex items-start justify-between mb-8">
        <Logo />
        <div className="hidden md:flex gap-4 items-center text-sm">
          <Link to="/login" className="px-4 py-2 rounded-lg border border-white/6">Sign in</Link>
          <Link to="/register" className="px-4 py-2 rounded-lg bg-red-600">Join</Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-top">
        <div className="max-w-xl">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="text-4xl md:text-5xl font-extrabold leading-tight"
          >
            Unlimited movies, TV shows, and more.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="mt-4 text-gray-300"
          >
            Watch anywhere. Cancel anytime. Join today and start building your watchlist.
          </motion.p>
        </div>

        <div>{children}</div>
      </div>
    </div>
  </div>
);

export default AuthLayout; 