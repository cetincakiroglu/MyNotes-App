import React, { useState, createContext, useEffect, useRef } from 'react'
import { auth, googleProvider, db } from './../Auth/firebase'
import { makeStyles } from '@material-ui/styles'
import background from '../Auth/background.jpg'

const useStyles = makeStyles({
    paper:{
        minHeight:'100vh',
        width:'100vw',
        borderRadius:'0',
        zIndex:'100 !important',
    },
    formWrapper:{
        zIndex:'100 !important',
        display:'flex',
        alignContent:'center',
    },
    bgWrapper:{
        minHeight:'100vh',
        backgroundImage:`url(${background})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        filter:'grayscale(1) blur(3px)',
    },
    form:{
        flexShrink:'0',
        backgroundColor:'#161616',
        margin:'auto',
        minWidth:'50%',
        padding:'2em'
    },
    formInputGroup:{
        margin:'0 auto'
    },
    link:{
        textDecoration:'none',
        color:'inherit',
        '&:hover':{
            color:'#95ff01'
        }
    },
    button:{
        padding:'0.5em 4em',
        margin:'1em auto'
    },
    googleCard:{
        display:'flex',
        justifyContent:'center',
        maxWidth:'250px',
        margin:'20px auto',
        alignItems:'center',
        filter:'grayscale(1)',
        transition:'.2s ease',
        height:'50px',
        marginTop:'30px',
        '&:hover':{
            filter:'grayscale(0)',
            cursor:'pointer',
            
        }
    }
})

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
        return auth.signInWithPopup(googleProvider)
    }
//TODO: make context for db functions.
    const saveUserDB = (uid, userObj) => {
        db.collection('Users').doc(uid).set(userObj);
    }
   // get user info from db
      
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