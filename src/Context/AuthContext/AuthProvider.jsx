import React, { useEffect, useState } from 'react';
import AuthContext from './AuthContext';
import { createUserWithEmailAndPassword, GithubAuthProvider, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import auth from '../../Firebase/firebase.config';
import axios from 'axios';
// import useAxiosSecure from '../../hooks/useAxiosSecure';



const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true) // by default, loading is true in this AuthProvider file .
    const googleProvider = new GoogleAuthProvider(); // Initialize Google Auth Provider
    const githubProvider = new GithubAuthProvider();
    // const axiosInstance = useAxiosSecure()


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
    const signOutUser = () => {
        setLoading(true); // Set loading to true when starting the sign-out process
        return signOut(auth)
    }

    useEffect(() => {
        //  unsubscribe for the history not save the same user state
        //  when the user state changes, it will unsubscribe the previous state and set the new state.
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setUser(currentUser);
            console.log(currentUser);
            if (currentUser?.email) {
                const user = { email: currentUser.email }
                axios.post('http://localhost:3000/jwt', user, { withCredentials: true })
                // axiosInstance.post(`/jwt`, user)
                    .then(res => console.log(res.data))
                setLoading(false);
            }
            else {
                axios.post('http://localhost:3000/logout', {}, { withCredentials: true })
                // axiosInstance.post('/logout')
                    .then(res => console.log(res.data))
                setLoading(false)
            }
        });
        // Cleanup function to unsubscribe from the auth state listener
        return () => {
            unsubscribe();
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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