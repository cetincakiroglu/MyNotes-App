import React, { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Card, Typography, Divider, CardContent, Paper, Menu, MenuItem } from '@material-ui/core'
import { NoteContext } from './../Context/NoteContext';
import { CardContext } from './../Context/CardContext'// styles
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import alertify from 'alertifyjs'

function NoteCard(props) {
    const { item } = props;
    const { notesRef, setTextInput, setHeader, editNote, deleteNote } = useContext(NoteContext);
    const { classes } = useContext(CardContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const history = useHistory();
    
    const saveEdit = (e, item) => {
        const editedNote = {...item}
        const prevNote = item.note;
        const newNote = e.target.innerHTML;

        if(newNote !== prevNote) {
            editedNote.note = newNote;
            notesRef.doc(item.id)
               .update(editedNote)
               .catch(err => alertify.error(`Failed to save edit. Error: ${err}`))
        }
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
                    <CardContent>
                        <Divider />
                        <div contentEditable='true' dangerouslySetInnerHTML={{__html: item.note}} className={classes.cardText} onBlur={(e) => saveEdit(e, item)}>
                        </div>
                        <Divider />
                        <div className={classes.cardFooter} >
                            <Typography variant='body1'>
                                Categories: {item.categories && item.categories.map(item => (`#${item}`))}
                            </Typography>
                        </div>
                    </CardContent>
                </Card>
            </Paper>
        </>
    )
}

export default NoteCard
