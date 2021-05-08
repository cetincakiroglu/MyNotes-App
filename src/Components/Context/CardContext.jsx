import React, { createContext } from 'react'
import { makeStyles } from '@material-ui/styles'

export const CardContext = createContext();
export const CardProvider = props => {

    const useStyles = makeStyles({
        cardHeader:{
            display:'flex',
            flexDirection:'column-reverse',
        },
        subHeader:{
            padding:'0.5em 1.5em 0em 1.5em',
            fontSize:'14px !important'
        },
        header:{
            padding:'1em',
            textOverflow:'ellipsis',
            whiteSpace:'nowrap'
        },
        cardWrapper:{
            backgroundColor:'#161616',
            minWidth:'250px',
            height:'470px',
            margin:'0 auto',
            position:'relative'
        },
        cardBody:{
            lineHeight: '1.5rem',
            WebkitBoxOrient: 'vertical',
            display: '-webkit-box',
            maxHeight:'15em',
          
        },
        cardText:{
            margin:'1em 0',
            lineHeight:'1.4rem',
            height:'200px',
           '&:focus-visible':{
               outline:'none'
           },
           textOverflow: 'ellipsis',
           WebkitLineClamp: '8',
           overflowX:'hidden',
           overflowY:'scroll',
           scrollbarWidth:'none'
        },
        cardFooter:{
            fontSize:'14px !important',
            padding:'0em 1em'
        },
        listItem:{
            display:'flex',
            justifyContent:'space-between',
            padding:'0',
            margin:'0'
        },
        list:{
            height:'17em',
            overflowY:'scroll',
            overflowX:'hidden',
            scrollbarWidth:'none'
        },
        btnDisabled:{
            display:'none'
        },

        deleteBtnContainer:{
            float:'right',
            clear:'left'
        },
        btnContainer:{
            width:'100%',
            margin:'auto',
            display:'flex',
            justifyContent:'center',
            alignContent:'center',
        },
        closeBtn:{
            float:'right',
            clear:'left',
        }
    })

    const classes = useStyles();
    return (
        <CardContext.Provider value={{classes: classes}}>
            { props.children }
        </CardContext.Provider>
    )
}