import React, { createContext, useState, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
export const NoteContext = createContext();

export const NoteProvider = props => {
    const [ textInput, setTextInput ] = useState('');
    const [ notes, setNotes ] = useState([]);
    const [ categoryList, setCategoryList ] = useState([]);
    const [ open, setOpen ] = useState(false);
    const [noteId, setNoteId] = useState([0]);
    const [header, setHeader] = useState([]);
    const history = useHistory();

    const title = useRef();
    const category = useRef();

    function Note(obj){
        this.id = uuidv4();
        this.date = new Date().toDateString();
        this.title = obj.title;
        this.note = obj.note;
        this.categories = obj.categories;
    }

    const deleteNote = (num) => {
        let notesArr = notes;
        notesArr.splice(num,1);
        setNotes([...notesArr]);
        localStorage.setItem('Notes', JSON.stringify(notes))
    }

    const editNote = (obj) => {
        // TODO: change the update method, that's not viable.
        let arr = noteId;
        arr.unshift(obj.id)
        arr.pop();
        setNoteId([...arr]);
        console.log(noteId.join(''));
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

    function Note(obj){
        this.id = uuidv4();
        this.date = new Date().toDateString();
        this.title = obj.title;
        this.note = obj.note;
        this.categories = obj.categories;
        this.status = 'new'
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        let notesArr = notes;
        const noteTitle = title.current.value;
        const note = textInput;
        const tags = [...categoryList]

        // check if note will be edited or it's a new note 
        if(noteId.join('') !== 0){
            console.log(noteId)
            let editedNote = {id: noteId.join(''), title: title.current.value, note: textInput, categories: tags}
            notesArr.map(item => item.id === noteId.join('') ? item.note = editedNote.note : item )

        } else if(noteId.join('') === 0 && note){
            const newNote = new Note({title: noteTitle, note:note, categories:tags});
            notesArr.unshift(newNote);
        }
        setNotes([...notesArr]);
        localStorage.setItem('Notes', JSON.stringify(notes))    
        title.current.value='';
        category.current.value='';
        setTextInput('');
        setCategoryList([]);
        setHeader([]);
    }
    
    const handleChange = (e,editor) => {
        const data = editor.getData();
        setTextInput(data)
    }
    
    const value={
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
        Note, 
        deleteNote, 
        editNote, 
        open, 
        setOpen, 
        handleSubmit, 
        addCategory, 
        handleChange, 
        noteId, 
        setNoteId 
    }

    useEffect(() => {
        let savedItems = JSON.parse(localStorage.getItem('Notes'))
        setNotes([...savedItems])
    },[])
    return (
        <NoteContext.Provider value={value}>
            { props.children }
        </NoteContext.Provider>
    )
}