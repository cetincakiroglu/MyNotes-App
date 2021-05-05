import React, { useState, createContext, useEffect, useRef } from 'react'
import { auth, googleProvider,db } from './../Auth/firebase'
import { makeStyles } from '@material-ui/styles'
import background from '../Auth/background.jpg'

const useStyles = makeStyles({
    paper:{
        height:'100vh',
        width:'100vw',
        borderRadius:'0',
    },
    formWrapper:{
        height:'100vh',
        display:'flex',
        alignContent:'center'
    },
    bgWrapper:{
        minHeight:'100vh',
        backgroundImage:`url(${background})`,
        backgroundRepeat:'no-repeat',
        backgroundSize:'cover',
        filter:'grayscale(1) blur(3px)'
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
    }
})


export const AuthContext = createContext();
export const AuthProvider = props => {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState();
    const [userID,setUserID] = useState('');
    //TODO: Get user data and set the state
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState({});
     
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
        const id = JSON.parse(sessionStorage.getItem('UID'))
        // get userid
        if(id){
            db.collection('Users')
              .doc(id)
              .get()
              .then(doc => {
                let userInfoObj = userInfo;
                userInfoObj.name = doc.data().name;
                userInfoObj.email = doc.data().email;
                setUserInfo({...userInfoObj})
                }).catch(err => console.log(err))//TODO: update error handling
        }
        
    },[])
    
    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })

        return unsubscribe;
    },[])


    const value = { userInfo, setUserInfo ,db,saveUserDB, signup, login, logout, signInWithGoogle, resetPassword, currentUser, password, email, passwordConfirm, name, surname, classes, error, setError, userID, setUserID }
    return(
        <AuthContext.Provider value={value}>
            {!loading && props.children}
        </AuthContext.Provider>
    )
}