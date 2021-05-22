import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles({
    paper:{
        width:'100%',
        borderRadius:'0',
        overflow:'hidden',
        minHeight:'100vh',
        scrollbarWidth:'none',
    },
    container:{
        marginTop:'40px',
        overflowX:'hidden',
        overflowY:'scroll',
        scrollbarWidth:'none',
        maxHeight:'80vh',
        padding:'30px',
    },
    button:{
        width:'100%',
        height:'100%',
    },
    message:{
        marginLeft:'25px'
    }
})
