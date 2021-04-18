import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'
import Nav from './Nav/Nav'

import links from './Data/links'

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    background:{
      paper:'#242424',
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
      primary:'#eee',
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
      fontSize:'36px',
      fontWeight:'500',
    },
    h3:{
      fontFamily:"'Montserrat', sans-serif",
      fontSize:'32px',
      fontWeight:'500',
    },
    h4:{
      fontFamily:"'Montserrat', sans-serif",
      fontSize:'28px',
      fontWeight:'500',
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
  const routeMaps = links.map((item, index) => (
    <Route 
      key = {index}
      exact = {item.isExact}
      path = {item.link}
      component = {item.component}
    />
  ))
  const classes = useStyles();
  return (
    <>
    <ThemeProvider theme={theme}>
    <div className={classes.container}>
      <BrowserRouter>
      <Nav />
      {routeMaps}
      </BrowserRouter>
    </div>
    </ThemeProvider>
    </>
  );
}

export default App;
