import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { Home } from "lucide-react";
import { useWatchlist } from "../hooks/useWatchlist";
import { useState } from "react";
import { motion, AnimatePresence } from 'framer-motion';
import Aurora from '../components/Aurora';

const Profile = () => {
  const { user, logout } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState('info');
  const { watchlist = [], loading,  removeFromWatchlist } = useWatchlist();

   const toggleEdit = () => {
    setActiveTab('info');
    setEditMode(!editMode);
  };

  const safeWatchlist = Array.isArray(watchlist) ? watchlist : [];

  if (loading) return <div className="text-center">Loading your watchlist...</div>;

  if (!user) return (
    <div className="text-center">
      <h3 className="text-xl font-semibold">Not signed in</h3>
      <p className="text-gray-400 mt-2">Please <Link to="/login" className="text-red-400">sign in</Link> to view your profile.</p>
    </div>
    );

  return (
    <div className="min-h-screen font-sans p-6">
      <Link to={`/`} style={{ textDecoration: "none"}}><Home className="bg-amber-50"/></Link>
      <br />
      {/* Header with Avatar, Name, Email, Edit Button */}
      <header className="flex flex-col sm:flex-row items-center justify-between mb-4 pb-4 border-b border-gray-800">
        <div className="flex items-center">
          <div className="relative">
            {editMode ? (
              <input
                type="file" accept="image/*"
              
                className="file:bg-red-600 file:text-white file:rounded-full file:py-2 file:px-3 hover:file:bg-red-700"
              />
            ) : (
              <img
                src={`http://127.0.0.1:8000${user.avatar}`}
                alt="Avatar"
                className="w-20 h-20 rounded-full object-cover"
              />
            )}
          </div>
          <div className="ml-4">
            {editMode ? (
              <input
                type="text"
                value={user.username}
                onChange={e => setUserInfo({ ...user, username: e.target.value })}
                className="bg-gray-800 text-white px-3 py-1 rounded shadow-inner"
              />
            ) : (
              <h2 className="text-2xl font-bold">{user.username}</h2>
            )}
            <p className="text-gray-400">{user.email}</p>
          </div>
        </div>
        <div className="mt-4 sm:mt-0">
          <motion.button
            onClick={toggleEdit}
            whileTap={{ scale: 0.95 }}
            className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded shadow-lg"
          >
            {editMode ? 'Save Profile' : 'Edit Profile'}
          </motion.button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="flex space-x-4 border-b border-gray-800">
        <button
          onClick={() => setActiveTab('info')}
          className={`pb-2 ${activeTab === 'info' ? 'border-b-2 border-red-500 text-white' : 'text-gray-400 hover:text-gray-200'}`}
        >
          Profile Info
        </button>
        <button
          onClick={() => setActiveTab('watchlist')}
          className={`pb-2 ${activeTab === 'watchlist' ? 'border-b-2 border-red-500 text-white' : 'text-gray-400 hover:text-gray-200'}`}
        >
          Watchlist
        </button>
        <button
          onClick={() => setActiveTab('stats')}
          className={`pb-2 ${activeTab === 'stats' ? 'border-b-2 border-red-500 text-white' : 'text-gray-400 hover:text-gray-200'}`}
        >
          Stats
        </button>
      </nav>

      {/* Tab Content */}
      <div className="mt-4">
        <AnimatePresence exitBeforeEnter>
          {/* Profile Info Tab */}
          {activeTab === 'info' && (
            <motion.div
              key="profile-info"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="p-4"
            >
              {editMode && (
                <div>
                  <label className="block text-sm text-gray-400">Bio:</label>
                  <textarea
                    value={user.bio}
                    onChange={e => setUserInfo({ ...user, bio: e.target.value })}
                    className="w-full bg-gray-800 text-white p-2 mt-1 rounded"
                  />
                </div>
              )}
              {!editMode && (
                <p className="text-gray-300">Bio: {user.bio}</p>
              )}
              <br />
              {!editMode && (
                <p className="text-gray-300">Full Name: {user.first_name} {user.last_name}</p>
              )}
              <br />
              {!editMode && (
                <p className="text-gray-300">Phone Number: {user.phone}</p>
              )}
              <br />
              {!editMode && (
                <p className="text-gray-300">Country: {user.country}</p>
              )}
            </motion.div>
          )}

          {/* Watchlist Tab */}
          {activeTab === 'watchlist' && (
            <motion.div
              key="watchlist"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 p-4"
            >
              {watchlist.map(movie => (
                <Link to={`/movies/${movie.id}/`} style={{ textDecoration: "none", color: "inherit" }} key={movie.id}>
                <div key={movie.id} className="relative group rounded-lg overflow-hidden shadow-lg">
                 <img src={`http://127.0.0.1:8000${movie.poster}`} alt={movie.title} className="w-full h-60 object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-2">
                    <h3 className="text-white font-semibold">{movie.title}</h3>
                    <button
                    onClick={() => removeFromWatchlist(movie.id)}
                    className="mt-2 py-1 px-2 bg-red-600 rounded-md text-sm"
            >
              Remove
            </button>
            </div>
            </div>
            </Link>
              ))}
            </motion.div>
          )}

          {/* Stats Tab */}
          {activeTab === 'stats' && (
            <motion.div
              key="stats"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
            >
              <div className="bg-gray-950 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-medium text-white">Total Watched</h3>
                <p className="mt-2 text-4xl font-bold text-red-500"></p>
              </div>
              <div className="bg-gray-950 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-medium text-white">Favorites</h3>
                <p className="mt-2 text-4xl font-bold text-red-500"></p>
              </div>
              <div className="bg-gray-950 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-medium text-white">Avg. Rating</h3>
                <p className="mt-2 text-4xl font-bold text-red-500"></p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        <div className="flex gap-3">
            <button onClick={logout} className="px-4 py-2 rounded-2xl bg-red-600 hover:opacity-80">Sign out</button>
          </div>
      </div>
    </div>
    );
  };

export default Profile;
