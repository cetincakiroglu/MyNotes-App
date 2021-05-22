import { makeStyles } from '@material-ui/core/styles'
import background from '../Auth/background.jpg'

export const useStyles = makeStyles({
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
