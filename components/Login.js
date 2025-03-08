import React, { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';

const Login = () => {
  const [isNewUser, setIsNewUser] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { loginWithEmail, registerWithEmail } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (isNewUser) {
      try {
        await registerWithEmail(email, password);
      } catch (err) {
        setError(err.message);
      }
    } else {
      try {
        await loginWithEmail(email, password);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-2xl font-bold mb-4">
          {isNewUser ? 'Sign Up' : 'Login'}
        </h2>
        <div className="mb-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <div className="mb-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-2 rounded-lg bg-gray-700 text-white"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
        >
          {isNewUser ? 'Sign Up' : 'Login'}
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        <div className="mt-4">
          {isNewUser ? (
            <p>
              Already have an account?{' '}
              <button
                type="button"
                onClick={() => setIsNewUser(false)}
                className="text-blue-400 underline"
              >
                Login
              </button>
            </p>
          ) : (
            <p>
              New here?{' '}
              <button
                type="button"
                onClick={() => setIsNewUser(true)}
                className="text-blue-400 underline"
              >
                Sign Up
              </button>{' '}
              for exclusive access!
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;