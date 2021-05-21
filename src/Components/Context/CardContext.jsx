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
            padding:'5px 20px 5px 20px',
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
            padding:'5px',
            margin:'5px 0px',
            lineHeight:'1.4rem',
            height:'330px',
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
        },
        listItem:{
            display:'flex',
            justifyContent:'space-between',
            padding:'0',
            margin:'0'
        },
        list:{
            height:'340px',
            overflowY:'scroll',
            overflowX:'hidden',
            scrollbarWidth:'none',
            padding:'0 !important',
        },
        btnDisabled:{
            display:'none'
        },
        menuBtn:{
            float:'right',
            clear:'left',
            '&:hover':{
               cursor:'pointer' 
            }
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