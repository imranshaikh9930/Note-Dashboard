import React, { useContext, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { AuthContext } from '../Context/AuthContext';
import GoogleLogin from '../components/GoogleLogin';

const AuthForm = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true); // default to login form
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState({});
 const {setUser } = useContext(AuthContext);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const toggleMode = () => {
    setIsLogin((prev) => !prev);
    setFormData({ name: '', email: '', password: '' });
    setError({});
  };

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newError = {};
    const { name, email, password } = formData;

    // Basic validations
    if (!email) newError.email = 'Email is required';
    else if (!validateEmail(email)) newError.email = 'Please enter a valid email';

    if (!password) newError.password = 'Password is required';
    else if (password.length < 6) newError.password = 'Password must be at least 6 characters';

    if (!isLogin && !name) newError.name = 'Name is required';

    if (Object.keys(newError).length > 0) {
      setError(newError);
      return;
    }

    try {
      let resp;
      if (isLogin) {
        resp = await axiosInstance.post('/auth/login', { email, password });
        localStorage.setItem("user", JSON.stringify(resp.data.user));
        setUser(resp.data.user);
        toast.success("Login SuccessFull");
        navigate('/dashboard');
      } else {
        resp = await axiosInstance.post('/auth/register', { name, email, password });
        toast.success('Signup Successful');
        setIsLogin(true); 
        toast.success("SignUp SuccessFull");
      }
      setError({});
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong")
      setError({ api: err.response?.data?.message || 'Something went wrong!' });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

    <motion.div
      className="w-[350px] bg-white shadow-xl rounded-[10px] box-border p-5 mx-auto my-auto h-full"
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-center font-sans font-extrabold text-[28px] my-2 mb-8">Welcome back</p>

      {error.api && <p className="text-red-600 text-xs mb-2">{error.api}</p>}

      <form className="flex flex-col gap-4 mb-4" onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {!isLogin && (
            <motion.div
              key="name"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
            >
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                className="rounded-full border border-gray-300 outline-none px-4 py-3 w-full"
              />
              {error.name && <p className="text-red-600 text-xs text-center">{error.name}</p>}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          key="email"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="rounded-full border border-gray-300 outline-none px-4 py-3 w-full"
          />
          {error.email && <p className="text-red-600 text-xs text-left p-2">{error.email}</p>}
        </motion.div>

        <motion.div
          key="password"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="rounded-full border border-gray-300 outline-none px-4 py-3 w-full"
          />
          {error.password && <p className="text-red-600 text-xs text-left p-2">{error.password}</p>}
        </motion.div>

        {isLogin && (
          <p className="text-right text-[9px] font-bold underline text-gray-500 hover:text-black cursor-pointer font-sans">
            Forgot Password?
          </p>
        )}

        <motion.button
          type="submit"
          className="px-4 py-2 rounded-full bg-teal-600 text-white shadow-md hover:bg-teal-700 active:shadow-none font-sans font-semibold"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isLogin ? 'Log in' : 'Sign up'}
        </motion.button>
      </form>

      <p className="text-[10px] text-gray-500 font-sans">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}
        <span
          className="ml-1 text-[11px] underline underline-offset-2 text-teal-600 font-bold cursor-pointer"
          onClick={toggleMode}
        >
          {isLogin ? 'Sign up' : 'Log in'}
        </span>
      </p>

      {/* Google Login Button */}
      {isLogin && (

      <motion.div
        className="flex flex-col justify-start gap-4 mt-5 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <GoogleLogin />
      </motion.div>
      )}

    </motion.div>
    </div>
  );
};

export default AuthForm;
