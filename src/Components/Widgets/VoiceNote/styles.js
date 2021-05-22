import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
    buttonDisabled:{
        display:'none',
    },
    buttonActive:{
        display:'block',
        margin:'25px auto',
    },
    paper:{
        height:'420px',
        backgroundColor:'#161616',
        padding:'0 20px'
        
    },
    card:{
        height:'60%',
        margin:'22px auto',
        backgroundColor:'#242424'
    },
    title:{
        paddingTop:'15px'
    }
})