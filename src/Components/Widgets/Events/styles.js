import { makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles({
    paper:{
        padding:'0 15px',
        backgroundColor:'#161616',
        position:'relative',
        minHeight:'500px'
    },
    title:{
        margin:'20px 0px 30px 0px'
    },
    button:{
        marginLeft:'10px',
        marginBottom:'10px'
    },
    container:{
        overflowX:'hidden',
        overflowY:'scroll',
        scrollbarWidth:'none',
        height:'400px',
    },
    subtitle:{
        height:'400px',
        margin:'auto'
    },
    linkButton:{
        position:'absolute',
        left:'82.75%',
        top:20,
    }
})

export const drawerStyles = makeStyles({
    button:{
        width:'100px',
        margin:'10px auto'
    },
    paper:{
        height:'100vh',
        backgroundColor:'#161616',
        margin:'auto',
    },
    date:{
        width:'100%',
    },
    summary:{
        width:'100%'
    }
})

export const cardStyles = makeStyles({
    card:{
        minHeight:'100px',
        padding:'10px',
        backgroundColor:'#242424',
        transition:'.1s ease-in-out',
        '&:hover':{
            transform:'translateY(-5px)'
        },
    },
    locationIcon:{
        transform:'scale(0.8)',
        verticalAlign:'bottom'
    },
    divider:{
        display:'none'
    },
    container:{
        margin:'auto'
    }
})
