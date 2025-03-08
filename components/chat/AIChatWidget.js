import { useState } from 'react';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { app } from "../firebase/app"; // Using alias

const auth = getAuth(app);

export function AIChatWidget() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [signedUp, setSignedUp] = useState(false);
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [authData, setAuthData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const handleAuthChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!authData.email || !authData.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, authData.email, authData.password);
      setSignedUp(true);
      setError('');
    } catch (firebaseError) {
      console.error(firebaseError);
      setError(firebaseError.message);
    }
    setLoading(false);
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!authData.email || !authData.password) {
      setError('Please fill in all fields.');
      return;
    }
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, authData.email, authData.password);
      setSignedUp(true);
      setError('');
    } catch (firebaseError) {
      console.error(firebaseError);
      setError(firebaseError.message);
    }
    setLoading(false);
  };

  const sendMessage = async () => {
    if (!userInput.trim()) return;
    const newHistory = [...chatHistory, { sender: 'user', text: userInput }];
    setChatHistory(newHistory);
    setLoading(true);
    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await res.json();
      const aiReply = data.reply;
      setChatHistory([...newHistory, { sender: 'ai', text: aiReply }]);
      setUserInput('');
    } catch (sendError) {
      console.error(sendError);
    }
    setLoading(false);
  };

  // If user is not authenticated, render authentication interface
  if (!signedUp) {
    return (
      <div className="fixed bottom-20 right-4 bg-gray-800 p-4 rounded-lg w-80 z-50 shadow-lg">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-lg font-bold text-white">
            {isSigningIn ? 'Sign In' : 'Sign Up'} for AI Chat
          </h3>
          <button className="text-white" onClick={() => setMinimized(!minimized)}>
            {minimized ? '▲' : '▼'}
          </button>
        </div>
        {!minimized && (
          <form
            onSubmit={isSigningIn ? handleSignIn : handleSignup}
            className="space-y-2"
          >
            <input
              type="email"
              name="email"
              value={authData.email}
              onChange={handleAuthChange}
              placeholder="Email"
              className="w-full p-2 rounded-lg bg-gray-700 text-white"
              required
            />
            <input
              type="password"
              name="password"
              value={authData.password}
              onChange={handleAuthChange}
              placeholder="Password"
              className="w-full p-2 rounded-lg bg-gray-700 text-white"
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full bg-red-500 text-white p-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
              disabled={loading}
            >
              {loading
                ? isSigningIn
                  ? 'Signing in...'
                  : 'Signing up...'
                : isSigningIn
                ? 'Sign In'
                : 'Sign Up'}
            </button>
            <p className="text-gray-400 text-sm text-center">
              {isSigningIn ? "Don't have an account?" : 'Already have an account?'}{' '}
              <button
                type="button"
                className="text-blue-400 hover:underline"
                onClick={() => {
                  setIsSigningIn(!isSigningIn);
                  setError('');
                }}
              >
                {isSigningIn ? 'Sign Up' : 'Sign In'}
              </button>
            </p>
          </form>
        )}
      </div>
    );
  }

  // Render chat interface when authenticated
  return (
    <div
      className={`fixed bottom-20 right-4 bg-gray-800 p-4 rounded-lg w-80 z-50 shadow-lg transition-all duration-300 ${
        minimized ? 'h-12 overflow-hidden' : 'h-auto'
      }`}
    >
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-bold text-white">AI Chat Assistant</h3>
        <button
          className="text-white"
          onClick={() => setMinimized(!minimized)}
          title={minimized ? 'Expand' : 'Minimize'}
        >
          {minimized ? '▲' : '▼'}
        </button>
      </div>
      {!minimized && (
        <>
          <div className="h-40 overflow-y-auto mb-2 border border-gray-700 p-2 rounded-lg">
            {chatHistory.length === 0 ? (
              <p className="text-gray-400 text-sm">
                Say hi to start the conversation...
              </p>
            ) : (
              chatHistory.map((msg, idx) => (
                <div
                  key={idx}
                  className={`text-sm ${
                    msg.sender === 'ai' ? 'text-blue-300' : 'text-gray-300'
                  } mb-1`}
                >
                  <strong>{msg.sender === 'ai' ? 'AI:' : 'You:'}</strong> {msg.text}
                </div>
              ))
            )}
          </div>
          <div className="flex">
            <input
              type="text"
              className="flex-1 p-2 rounded-l-lg bg-gray-700 text-white placeholder-gray-400"
              placeholder="Ask something..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
            />
            <button
              className="bg-red-500 p-2 rounded-r-lg text-white hover:bg-red-600 transition-colors duration-300"
              onClick={sendMessage}
              disabled={loading}
            >
              {loading ? '...' : 'Send'}
            </button>
          </div>
        </>
      )}
    </div>
  );
}