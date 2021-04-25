import React from 'react'
import { useHistory } from 'react-router-dom'
import { IconButton, Tooltip } from '@material-ui/core'
import LaunchIcon from '@material-ui/icons/Launch';
import { makeStyles } from '@material-ui/styles'

function OpenBtn({ showBtn, item }) {
    const useStyles = makeStyles({
        openBtn:{
            display: showBtn ? 'block' : 'none',
        }
    })
    const classes = useStyles();
    const history = useHistory();

    const navigate = () => {
        history.push(`/New/${item.id}`)
    }
    return (
        <>
            <Tooltip title='Open in large editor'>
                <IconButton className={classes.openBtn} onClick={navigate}>
                    <LaunchIcon />
                </IconButton>
            </Tooltip>
        </>
    )
}

export default OpenBtn
