import React from 'react'
import { Tooltip, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { FcGoogle } from 'react-icons/fc'
import useWindowDimensions from './../../../Hooks/useWindowDimensions';

function GoogleBtn({ showBtn, syncGoogle, item }) {
    const { width } = useWindowDimensions();
    const useStyles = makeStyles({
        icon:{
            display: showBtn ? 'block' : 'none',
        },
        iconMobile: {
            display: 'block'
        }
    })
    const classes = useStyles();

    return (
        <>
             <Tooltip title='Add to Google Calendar'>
                <IconButton className={width < 500 ? classes.iconMobile : classes.icon} onClick={() => syncGoogle(item)}>
                    <FcGoogle />
                </IconButton>
            </Tooltip>
            
        </>
    )
}

export default GoogleBtn
