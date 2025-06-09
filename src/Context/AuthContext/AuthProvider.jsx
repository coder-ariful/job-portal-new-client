import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../../Firebase/firebase.config';



const AuthProvider = ({ children }) => {

    const [user, setUser]  = useState(null)
    const [loading, setLoading]  = useState(true) // by default, loading is true in this AuthProvider file .
    const googleProvider = new GoogleAuthProvider(); // Initialize Google Auth Provider
    const githubProvider = new GithubAuthProvider();


    useEffect(()=> {
        //  unsubscribe for the history not save the same user state
        //  when the user state changes, it will unsubscribe the previous state and set the new state.
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false); // Set loading to false once the user state is determined
        });
        // Cleanup function to unsubscribe from the auth state listener
        return () => {
            unsubscribe();
        };
    }, [])

    const createUser = (email, password) => {
        setLoading(true); // Set loading to true when starting the user creation process
        return createUserWithEmailAndPassword(auth, email, password)
    }
    const signInUser = (email, password) => {
        setLoading(true); // Set loading to true when starting the sign-in process
        return signInWithEmailAndPassword(auth, email, password)
    }
    const signInWithGoogle = () => {
        setLoading(true); // Set loading to true when starting the Google sign-in process
        // Implement Google sign-in logic here
        return signInWithPopup(auth, googleProvider)
    }
    const signInWithGitHub = () => {
        setLoading(true); // Set loading to true when starting the GitHub sign-in process
        // Implement GitHub sign-in logic here
        return signInWithPopup(auth, githubProvider) // Replace with GitHub provider when implemented
    }
    const signOutUser = ()=> {
        setLoading(true); // Set loading to true when starting the sign-out process
        return signOut(auth)
    }
    const userInfo = {
        user,
        loading,
        createUser,
        signInUser,
        signInWithGoogle,
        signInWithGitHub, 
        signOutUser
    }
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;