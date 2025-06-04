import { useState } from 'react';
import axios from 'axios';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful!');
    } catch (err) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-indigo-300 to-purple-300">
      <form
        onSubmit={handleLogin}
        className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-indigo-700 mb-6">Kitabay Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-400"
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-2.5 cursor-pointer text-gray-500 text-sm"
          >
            {showPassword ? 'Hide' : 'Show'}
          </span>
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white font-semibold py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>

        <p className="mt-4 text-center text-sm">
          Don’t have an account? <a href="/register" className="text-indigo-600 font-semibold">Register</a>
        </p>
      </form>
    </div>
  );
};

export default Login;
