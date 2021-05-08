import React, { createContext, useContext, useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { db } from '../Auth/firebase'
import { AuthContext } from '../Context/AuthContext'

export const NoteContext = createContext();

export const NoteProvider = props => {
    const [textInput, setTextInput] = useState('');
    const [notes, setNotes] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [open, setOpen] = useState(false);
    const [noteId, setNoteId] = useState([0]); // used in handleSubmit to determine edit || create new note.
    const [header, setHeader] = useState('');
    const [dbLoading, setDbLoading] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    
    const { currentUser } = useContext(AuthContext);
   

    const title = useRef();
    const category = useRef();
    // db ref
    const notesRef = db.collection('Notes');
    
    // get Notes collection from db
    function getNotes(){
        if(currentUser){
            setDbLoading(true);
            notesRef.where('ownerID', '==', currentUser.uid).onSnapshot(querySnapshot => {
            const items = [];
            querySnapshot.forEach(doc => {
                items.push(doc.data())
                });
                setDbLoading(false);
                setNotes(items);
            })
        }
    }
    
    // delete from db
    function deleteNote(note){
        // console.log(obj);
        notesRef.doc(note.id)
           .delete()
           .catch(err => console.error(err));
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
        e.stopPropagation();

        let categoryItem = category.current.value;
        if(categoryItem !== '' && categoryItem !== ' '){
            categoryItem = categoryItem.replace(/\s+/g, '');

            let categoryArr = categoryList;
            categoryArr.unshift(categoryItem);
            setCategoryList([...categoryArr]);
            category.current.value='';
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
               .catch(err => console.error(err))

        } else if(noteId.join('') === '0'){
            // submit new note
            const newNote = {
                id         : uuidv4(),
                ownerID    : currentUser.uid ? currentUser.uid : 'unknown',
                ownerEmail : currentUser ? currentUser.email : 'unknown',
                date       : new Date().toDateString(),
                title      : noteTitle,
                note       : note,
                categories : tags,
            };
            notesRef.doc(newNote.id)
               .set(newNote)
               .catch(err => console.error(err))
        }
        // reset inputs
        title.current.value='';
        category.current.value='';
        setTextInput('');
        setCategoryList([]);
        setHeader([]);
    }
    
    // instant edit feature
    const handleChange = (e,editor,obj) => {
        const data = editor.getData();
        setTextInput(data)
    }
   
    // listen db
    useEffect(() => {
        getNotes();
        // eslint-disable-next-line
    },[])
    
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
        handleChange, 
        noteId, 
        setNoteId,
        openDrawer 
    }
    
    // listen db
    // useEffect(() => {
    //     getNotes();
    //     // eslint-disable-next-line
    // },[])

    return (
        <NoteContext.Provider value={value}>
            { props.children }
        </NoteContext.Provider>
    )
}