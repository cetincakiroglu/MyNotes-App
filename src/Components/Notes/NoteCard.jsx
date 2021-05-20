import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Typography, Divider, CardContent, Paper, Grid, Menu, MenuItem } from '@material-ui/core'
import { NoteContext } from './../Context/NoteContext';
import { CardContext } from './../Context/CardContext'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

function NoteCard({ item, index }) {

    const { setTextInput, setHeader, editNote, deleteNote } = useContext(NoteContext);
    const { classes } = useContext(CardContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();

    const handleChange = (e, item) => {
        const editedNote = {...item}
        editedNote.note = e.target.textContent;
        // notesRef.doc(item.id)
        //    .update(editedNote)
        //    .catch(err => console.log(err))
    }

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const openInLarge = (item) => {
        history.push(`/New/${item.id}`)
        setTextInput(item.note)
        setHeader(item.title)
        handleClose();
    }

    return (
        <>
            <Paper elevation={5}>
                <Card className={classes.cardWrapper}>
                    <MoreHorizIcon onClick={handleClick} className={classes.menuBtn}/>
                        <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            keepMounted
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            >
                            <MenuItem onClick={() => {editNote(item); handleClose()}}>Edit</MenuItem>
                            <MenuItem onClick={() => openInLarge(item)}>Open in Editor</MenuItem>
                            <MenuItem onClick={() => {deleteNote(item); handleClose()}}>Delete</MenuItem>
                            </Menu>
                    <div className={classes.cardHeader}>
                        <Typography variant='h4' className={classes.header}>
                            {item.title ? item.title : 'Untitled Note'}
                        </Typography>
                        <Typography variant='body1' className={classes.subHeader}>
                            {item.date}
                        </Typography>
                    </div>
                    <CardContent className={classes.cardBody}>
                        <Divider />
                        <div contentEditable='true' dangerouslySetInnerHTML={{__html: item.note}} className={classes.cardText} onMouseLeave={(e) => handleChange(e, item)}>
                        </div>
                            <Divider />
                        <Typography variant='body1'>
                            Categories: {item.categories && item.categories.map(item => (`#${item}`))}
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </>
    )
}

export default NoteCard
