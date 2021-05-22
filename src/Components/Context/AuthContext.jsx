import React, { useState, createContext, useEffect, useRef } from 'react'
import { auth, googleProvider, db } from './../Auth/firebase'
import { useStyles } from '../Auth/styles'

export const AuthContext = createContext();
export const AuthProvider = props => {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState();
    const [userInfo, setUserInfo] = useState();
    const [loading, setLoading] = useState(true);
     
    const email = useRef();
    const name = useRef();
    const surname = useRef();
    const password = useRef();
    const passwordConfirm = useRef();

    const signup = (email, password) => {
        // get user info by form
        return auth.createUserWithEmailAndPassword(email,password);
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email,password);
    }

    const logout = () => {
        return auth.signOut();
    }

    const resetPassword = (email) =>{
        return auth.sendPasswordResetEmail(email);
    }

    const signInWithGoogle = () => {
        return auth.signInWithPopup(googleProvider);
    }

    const saveUserDB = (uid, userObj) => {
        db.collection('Users').doc(uid).set(userObj);
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        sessionStorage.removeItem('UID');
        return unsubscribe;
        // eslint-disable-next-line
    },[])

    const value = {
        // googleLogin,
        userInfo,
        setUserInfo,
        db,
        saveUserDB, 
        signup, 
        login, 
        logout, 
        signInWithGoogle, 
        resetPassword, 
        currentUser, 
        password, 
        email, 
        passwordConfirm, 
        name, 
        surname, 
        classes, 
    };

    return(
        <AuthContext.Provider value={value}>
            {!loading && props.children}
        </AuthContext.Provider>
    )
}