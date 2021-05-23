import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../Auth/firebase'
import { AuthContext } from '../Context/AuthContext'
import alertify from 'alertifyjs'
import moment from 'moment'

export const NoteContext = createContext();
export const NoteProvider = props => {
    const [textInput, setTextInput] = useState('');
    const [notes, setNotes] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [open, setOpen] = useState(false);
    const [noteId, setNoteId] = useState([0]); // used in handleSubmit to determine edit || create new note.
    const [header, setHeader] = useState('');
    // eslint-disable-next-line
    const [dbLoading, setDbLoading] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [filterParam, setFilterParam] = useState('');
    const { currentUser } = useContext(AuthContext);
   
    const title = useRef();
    const category = useRef();
    // db ref
    const notesRef = db.collection('Notes');
    
    // get Notes collection from db
    function getNotes() {
        if(currentUser){
            notesRef.where('ownerID', '==', currentUser.uid)
            .orderBy('created')
            // .where('categories', 'array-contains', filterParam)
            .onSnapshot(querySnapshot => {
                const items = [];
                querySnapshot.forEach(doc => {
                    items.push(doc.data())
                })
                setNotes(items)
            })
        }
    }
    
    // delete from db
    function deleteNote(note){
        notesRef.doc(note.id)
           .delete()
           .catch(err => {
            alertify.warning(`Failed to delete note. Error: ${err}`)
           });
        alertify.warning('Note Deleted')

        console.log(notes);
    }

    const editNote = (obj) => {
        // TODO: change the state update method, that's not a viable option.
        let arr = noteId;
        arr.unshift(obj.id)
        arr.pop();
        setNoteId([...arr]);
        setHeader(obj.title)
        let categories = obj.categories ? obj.categories : '';
        setOpen(true);
        setTextInput(obj.note);
        setCategoryList([...categories]);
    }

    const addCategory = (e) => {
        // keyboard support
        if(e.keyCode === 13){
            e.stopPropagation();
            e.preventDefault();
            
            let categoryItem = category.current.value;
            if(categoryItem !== '' && categoryItem !== ' '){
                categoryItem = categoryItem.replace(/\s+/g, '');
                let categoryArr = categoryList;
                categoryArr.unshift(categoryItem);
                setCategoryList([...categoryArr]);
                category.current.value='';
            }
        }
    }

    const openDrawer = () => {
        let arr = noteId;
        arr.unshift(0)
        arr.pop();
        setNoteId([...arr]);
        setOpen(true);
    }

    // add note to db
    const handleSubmit = (e) => {
        e.preventDefault();
        let notesArr = notes;
        const noteTitle = title.current.value;
        const note = textInput;
        const tags = [...categoryList]
        
        // check if note will be edited or it's a new note 
        if(noteId.join('') !== '0'){
            // submit edit
            let editedNote = {id: noteId.join(''), title: title.current.value, note: textInput, categories: tags}
            notesArr.map(item => item.id === noteId.join('') ? item.note = editedNote.note : item )
            notesRef.doc(noteId.join(''))
               .update(editedNote)
               .catch(err => alertify.error(`Failed to update note. Error: ${err}`))
            alertify.success('Note saved')

        } else if(noteId.join('') === '0'){
            // submit new note
            const newNote = {
                created    : new Date(),
                date      : moment().format(),
                id         : uuidv4(),
                ownerID    : currentUser.uid ? currentUser.uid : 'unknown',
                ownerEmail : currentUser ? currentUser.email : 'unknown',
                title      : noteTitle,
                note       : note,
                categories : tags === [] ? [''] : tags,
            };
            // save to db
            notesRef.doc(newNote.id)
               .set(newNote)
               .catch(err => alertify.error(`Failed to save note. Error: ${err}`))
            alertify.success('Note saved')
        }
        // reset inputs
        title.current.value='';
        category.current.value='';
        setTextInput('');
        setCategoryList([]);
        setHeader([]);
    }
   
    // listen db
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    },[filterParam])
    
    const value = {
        mobileOpen,
        setMobileOpen,
        getNotes,
        notesRef,
        header,
        setHeader,
        textInput, 
        setTextInput, 
        notes, 
        setNotes, 
        categoryList, 
        setCategoryList, 
        title, 
        category,
        deleteNote, 
        editNote, 
        open, 
        setOpen, 
        handleSubmit, 
        addCategory, 
        noteId, 
        setNoteId,
        openDrawer,
        filterParam,
        setFilterParam
    }
    
    return (
        <NoteContext.Provider value={value}>
            { props.children }
        </NoteContext.Provider>
    )
}