// src/components/Login.js
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router-dom";
import AuthLayout from "../components/AuthLayout";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { username, password } = formData;
    const result = await login(username, password);

    if (!result.success) {
      setError(result.error);
    }

    setLoading(false);
  };

  return (
    <AuthLayout>
    <Card>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Sign in</h3>
            <div className="text-sm text-gray-400">New here? <Link to="/register" className="text-red-500">Create account</Link></div>
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}

          <Input label="Username" name="username" value={formData.username} onChange={handleChange} placeholder="your username" />

          <div>
            <div className="flex items-center justify-between mb-2">
              <div className="text-sm text-gray-300">Password</div>
              <button type="button" onClick={() => setShowPassword((s) => !s)} className="text-sm text-gray-400">
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            <input
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              className="w-full px-4 py-3 rounded-2xl bg-black/60 border border-transparent focus:outline-none focus:ring-2 focus:ring-red-500 placeholder:text-gray-400 text-white"
            />
          </div>

          <div className="flex items-center justify-between text-sm text-gray-400">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-red-500" /> Remember me
            </label>
            <button type="button" className="text-red-400">Forgot password?</button>
          </div>

          <PrimaryButton loading={loading}>
            Sign in
          </PrimaryButton>

          <div className="text-center text-sm text-gray-400">or continue with</div>

          <div className="grid grid-cols-2 gap-3">
            <button type="button" className="py-2 rounded-2xl border border-white/8">Google</button>
            <button type="button" className="py-2 rounded-2xl border border-white/8">Apple</button>
          </div>
        </form>
      </Card>
      </AuthLayout>
  );
};

export default Login;
