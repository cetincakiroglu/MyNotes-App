import React, { useContext, useState } from 'react'
import { Card, Typography, Divider, CardContent, Paper } from '@material-ui/core'
import { NoteContext } from './../Context/NoteContext';
import { CardContext } from './../Context/CardContext'
import DeleteBtn from './Buttons/DeleteBtn'
import EditBtn from './Buttons/EditBtn'
import OpenBtn from './Buttons/OpenBtn'

function NoteCard({ item, index }) {
    const { notes, setNotes} = useContext(NoteContext);
    const { classes } = useContext(CardContext)
    const [showBtn, setShowBtn] = useState(false);
    
    const handleChange = (e) => {
        let editedNote = e.target.textContent;
        let notesArr = notes;
        console.log(editedNote)
        const noteObj = item;
        noteObj.note = editedNote;
        
        notesArr.map(item => item.id === noteObj.id ? item.note = noteObj.note : item);
        setNotes([...notesArr])
        localStorage.setItem('Notes', JSON.stringify(notes))
    }

    return (
        <> 
            <Paper elevation={5} onMouseEnter={() => setShowBtn(true)} onMouseLeave={() => setShowBtn(false)}>
                <Card className={classes.cardWrapper}>
                    <div className={classes.deleteBtnContainer}>
                        <DeleteBtn showBtn={showBtn} index={index} />
                    </div>
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
                        <div contentEditable='true' dangerouslySetInnerHTML={{__html: item.note}} className={classes.cardText} onMouseLeave={(e) => handleChange(e)}>
                        </div>
                            <Divider />
                        <Typography variant='body1'>
                            Categories: {item.categories.map(item => (`#${item}`))}
                        </Typography>
                    </CardContent>
                    <div className={classes.btnContainer}>
                            <EditBtn showBtn={showBtn} item={item} index={index}/>
                            <OpenBtn showBtn={showBtn} item={item}/>
                    </div>
                </Card>
            </Paper>
        </>
    )
}

export default NoteCard
