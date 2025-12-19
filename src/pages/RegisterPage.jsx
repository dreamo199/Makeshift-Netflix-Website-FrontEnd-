import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import AuthLayout from "../components/AuthLayout";
import Card from "../components/Card";
import Input from "../components/Input";
import PrimaryButton from "../components/PrimaryButton";
import { Link } from "react-router-dom";

const RegisterPage = () => {
  const { register } = useContext(AuthContext) || {};
  const navigate = useNavigate();

  const fallbackRegister = async (u, p, e) => {
    console.log("fallback register", u, p, e);
    navigate("/login");
    return { success: true };
  };

  const handler = register || fallbackRegister;

  const [form, setForm] = useState({ username: "", email: "", password: "", password2: "", first_name: "", last_name: "", phone: "" , country: ""});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const onChange = (e) => setForm((s) => ({ ...s, [e.target.name]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setError(null);
    if (form.password !== form.password2) return setError("Passwords do not match");
    setLoading(true);
    const res = await handler(form.username, form.password, form.email, form.first_name, form.last_name, form.phone, form.country);
    setLoading(false);
    if (!res?.success) setError(res?.error || "Registration failed");
  };

  return (
    <AuthLayout>
      <Card>
        <form onSubmit={submit} className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Create account</h3>
            <div className="text-sm text-gray-400">Already a member? <Link to="/login" className="text-red-500">Sign in</Link></div>
          </div>

          {error && <div className="text-sm text-red-400">{error}</div>}
          <Input label="First Name" name="first_name" value={form.first_name} onChange={onChange} placeholder="Eg. John" />
          <Input label="Last Name" name="last_name" value={form.last_name} onChange={onChange} placeholder="Eg. Doe" />
          <Input label="Phone" name="phone" value={form.phone} onChange={onChange} placeholder="Eg. 12345678901" />
          <Input label="Country" name="country" value={form.country} onChange={onChange} placeholder="Eg. Nigeria" />
          <Input label="Email address" name="email" value={form.email} onChange={onChange} type="email" placeholder="Eg. you@example.com" />
          <Input label="Username" name="username" value={form.username} onChange={onChange} placeholder="Eg. DreamyBull" />
          <Input label="Password" name="password" value={form.password} onChange={onChange} type="password" placeholder="Choose a password" />
          <Input label="Confirm password" name="password2" value={form.password2} onChange={onChange} type="password" placeholder="Repeat password" />

          <PrimaryButton loading={loading}>Create account</PrimaryButton>

          <div className="text-center text-sm text-gray-400">By creating an account you agree to our <a className="text-red-400">Terms</a>.</div>
        </form>
      </Card>
    </AuthLayout>
  );
};

export default RegisterPage;
