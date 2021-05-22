import { makeStyles } from '@material-ui/core/styles'

export const useStyles = makeStyles({
    paper:{
        position:'relative',
        maxWidth:'100%',
        padding:'0 15px',
        backgroundColor:'#161616',
        minHeight:'450px',
    },
    noteCard:{
        backgroundColor:'#242424',
        width:'180px',
        height:'300px',
        margin:'15px auto',
        transition:'.1s ease-in-out',
        '&:hover':{
            cursor:'pointer',
            transform: 'translateY(-5px)',
        }
    },
    cardHeader:{
        display:'flex',
        flexWrap:'nowrap',
        flexDirection:'column',
        padding:'2px',
    },
    cardContent:{
        margin:'5px 0px',
        lineHeight: '1.2rem',
        maxHeight: '100%',
        WebkitBoxOrient: 'vertical',
        display: '-webkit-box',
        textOverflow:'ellipsis',
        overflow:'hidden',
        WebkitLineClamp: '8',
        fontSize:'14px',
    },
    subheader:{
        alignSelf:'flex-end',
        paddingRight:'10px'
    },
    header:{
        padding:'5px 10px ',
        textOverflow:'ellipsis',
        whiteSpace:'nowrap',
        overflow:'hidden'
     },
    title:{
        margin:'20px 0px'
    },
    button:{
        marginLeft:'15px'
    },
    subtitle:{
        height:'325px',
        margin:'auto'
    },
    linkButton:{
        position:'absolute',
        left:'93.5%'
    },
    divider:{
        maxWidth:'95%',
        margin:'0 auto'
    },
    radioGroup:{
        display:'flex',
        flexDirection:'row',
        marginLeft:'auto'
    },
    categories:{
        marginLeft:'auto'
    }
})
