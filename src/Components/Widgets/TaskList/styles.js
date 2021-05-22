import { makeStyles } from '@material-ui/core/styles';

export const cardStyles = makeStyles({
    cardHeader:{
        display:'flex',
        flexWrap:'nowrap',
        flexDirection:'column',
        padding:'2px',
    },
    header:{
        padding:'5px 10px ',
        textOverflow:'ellipsis',
        whiteSpace:'nowrap',
        overflow:'hidden'
    },
    subheader:{
        alignSelf:'flex-end',
        paddingRight:'10px'
    },
    taskCard:{
        margin:'15px auto',
        backgroundColor:'#242424',
        minWidth:'300px',
        height:'300px',
        transition:'.1s ease-in-out',
        '&:hover':{
            transform: 'translateY(-5px)',
            cursor:'pointer'
        }
    },
    cardContent:{
        height:'80%',
        margin:'0',
        padding:'0'
    },
    categories:{
        alignSelf:'bottom'
    },
    textContent:{
        fontSize:'15px',
        padding:'0',
        margin:'0'
    },
    list:{
        margin:'0',
        padding:'0',
        height:'100%',
        overflowY:'scroll',
        overflowX:'hidden',
        scrollbarWidth:'none'
    },
    listItem:{
       margin:'0',
       padding:'0',
    },
    checkBox:{
        transform:'scale(0.8)'
    },
    divider:{
        maxWidth:'95%',
        margin:'0 auto'
    }
})

export const widgetStyles = makeStyles({
    wrapper:{
        minHeight:'25em',
    },
    title:{
        margin:'20px 0px'
    },
    button:{
        marginLeft:'10px'
    },
    subtitle:{
        height:'325px',
        margin:'0 20%'
    },
    linkButton:{
        position:'absolute',
        left:'93%',
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
