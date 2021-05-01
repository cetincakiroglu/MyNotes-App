import React, { useContext } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'
import Nav from './Components/Nav/Nav'
import Home from './Components/Home/Home'
import Info from './Components/Info/Info'
import Notes from './Components/Notes/Notes'
import Tasks from './Components/Tasks/Tasks'
import NewNote from './Components/Notes/NewNote'
import Signup from './Components/Auth/Signup'
import Login from './Components/Auth/Login'
import ResetPassword from './Components/Auth/ResetPassword'
import PrivateRoute from './Components/Auth/PrivateRoute';
import { AuthContext } from './Components/Context/AuthContext';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background:{
      paper:'#111',
    },
    primary:{
      light:'#95ff01',
      dark:'#4a8000',
      main:'#76cb01',
    },
    secondary:{
      main:'#e22415',
      light:'#ff564b',
      dark:'#800801',
    },
    text:{
      primary:'#efefef9d',
      disabled:'#eeeeee4d'
    },
    divider: 'rgba(238, 238, 238, 0.1)'
  },
  typography:{
    fontFamily:"'Montserrat', sans-serif",
    h1:{
      fontFamily:"'Montserrat', sans-serif",
      fontSize:'48px',
    },
    h2:{
      fontFamily:"'Montserrat', sans-serif",
      fontSize:'32px',
      fontWeight:'300',
    },
    h3:{
      fontFamily:"'Montserrat', sans-serif",
      fontSize:'28px',
      fontWeight:'300',
    },
    h4:{
      fontFamily:"'Montserrat', sans-serif",
      fontSize:'24px',
      fontWeight:'300',
    },
    body1:{
      fontFamily:"'Open Sans', sans-serif",
      fontSize:'18px',
      fontWeight:'300',
      color:'rgba(238, 238, 238, 0.3)'
    },
    body2:{
      fontFamily:"'Open Sans', sans-serif",
      fontSize:'18px',
      fontWeight:'300',
    },
    caption:{
      fontFamily:"'Open Sans', sans-serif",
      fontSize:'11px',
      fontWeight:'300',
    },
    button:{
      fontFamily:"'Open Sans', sans-serif",
      fontSize:'14px'
    }
  },
  shape:{
    borderRadius:'5px'
  }
})

const useStyles = makeStyles({
  container:{
    display:'flex'
  }
})

function App() {
  const { currentUser } = useContext(AuthContext);
 
  const classes = useStyles();
  return (
    <>
      <BrowserRouter>
          <ThemeProvider theme={theme}>
            <div className={classes.container}>
                  { currentUser ? <Nav /> : <></>}
                <Switch>
                  <Route path ='/Info' component={Info}/>
                  <Route path ='/Signup' component={Signup}/>
                  <Route path ='/Login' component={Login}/>
                  <Route path ='/Forgot-Password' component ={ResetPassword}/>
                  <PrivateRoute exact path ='/' component={Home}/>
                  <PrivateRoute exact path ='/Notes' component ={Notes}/>
                  <PrivateRoute exact path ='/Tasks' component ={Tasks}/>
                  <PrivateRoute exact path ='/New' component ={NewNote}/>
                  <PrivateRoute path ='/New/:id' component ={NewNote}/>
                </Switch>
            </div>
          </ThemeProvider>
      </BrowserRouter>
   </>
  );
}

export default App;
