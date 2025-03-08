import { useState, useEffect, createContext, useContext } from 'react';
import { auth } from '@/components/firebase/app';
import { signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const authData = useProvideAuth();
  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);

function useProvideAuth() {
  const [user, setUser] = useState(null);

  const loginWithEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
      .then(result => setUser(result.user))
      .catch(err => {
        console.error('Login error:', err);
        throw err;
      });
  };

  const registerWithEmail = (email, password) => {
    return createUserWithEmailAndPassword(auth, email, password)
      .then(result => setUser(result.user))
      .catch(err => {
        console.error('Registration error:', err);
        throw err;
      });
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then(result => setUser(result.user))
      .catch(err => console.error('Login error:', err));
  };

  const logout = () => {
    signOut(auth)
      .then(() => setUser(null))
      .catch(err => console.error('Logout error:', err));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  return { user, loginWithEmail, registerWithEmail, loginWithGoogle, logout };
}
