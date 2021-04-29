import React, { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { IconButton, Tooltip } from '@material-ui/core'
import LaunchIcon from '@material-ui/icons/Launch';
import { makeStyles } from '@material-ui/styles'
import { NoteContext } from '../../Context/NoteContext'

function OpenBtn({ showBtn, item }) {
    const { setTextInput, title,header, setHeader } = useContext(NoteContext);
    const useStyles = makeStyles({
        openBtn:{
            display: showBtn ? 'block' : 'none',
        }
    })
    const classes = useStyles();
    const history = useHistory();

    const openInLarge = (item) => {
        history.push(`/New/${item.id}`)
        setTextInput(item.note)
        let headerArr = header;
         headerArr.unshift(item.title);
         headerArr.pop();
        setHeader([...headerArr])
        //TODO: that's not viable option.
    }
    return (
        <>
            <Tooltip title='Open in large editor'>
                <IconButton className={classes.openBtn} onClick={() => openInLarge(item)}>
                    <LaunchIcon />
                </IconButton>
            </Tooltip>
        </>
    )
}

export default OpenBtn
