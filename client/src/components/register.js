import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';



const Register = () => {
   const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form);

      navigate('/login');
    } catch (err) {
      alert('Registration failed!');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-green-200 to-blue-300">
      <form
        onSubmit={handleRegister}
        className="bg-white shadow-lg rounded-xl p-10 w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center text-green-700 mb-6">Register on Kitabay</h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400"
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
          className="w-full bg-green-600 text-white font-semibold py-2 rounded-lg hover:bg-green-700 transition"
        >
          Register
        </button>

        <p className="mt-4 text-center text-sm">
          Already have an account? <a href="/login" className="text-green-600 font-semibold">Login</a>
        </p>
      </form>
    </div>
  );
};

export default Register;
