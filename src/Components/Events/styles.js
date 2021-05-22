import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
    paper:{
        width:'100%',
        borderRadius:'0',
        overflow:'hidden',
        height:'100vh',
    },
    container:{
        marginTop:'40px',
        overflowX:'hidden',
        overflowY:'scroll',
        scrollbarWidth:'none',
        height:'85vh',
        padding:'30px',
    },
    sideBar:{
        maxHeight:'500px',
        padding:'20px',
        background:'#161616',
    },
    calendarPaper:{
        background:'#161616',
        padding:'20px'
    },
    message:{
        margin:'100px auto'
    },
    cardContainer:{
        maxHeight:'400px',
        marginTop:'30px',
        overflowX:'hidden',
        overflowY:'scroll',
        scrollbarWidth:'none',
    },
    cardPaper:{
        padding:'20px 10px',
        backgroundColor:'#242424'
    },
    button:{
        width:'100%',
        height:'100%',
    }
})
