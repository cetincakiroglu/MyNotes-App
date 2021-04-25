import React, { createContext, useState, useRef, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
export const NoteContext = createContext();

export const NoteProvider = props => {
    const [ textInput, setTextInput ] = useState('');
    const [ notes, setNotes ] = useState([]);
    const [ categoryList, setCategoryList ] = useState([]);
    const [ open, setOpen ] = useState(false);

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

    const editNote = (obj, index) => {
        // console.log(obj);
        setOpen(true);
        title.value = obj.title ? obj.title : 'Untitled';
        title.current.value = obj.title ? obj.title : 'Untitled Note';
        setTextInput(obj.note);
        setCategoryList([...obj.categories]);
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
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const notesArr = notes;
        const noteTitle = title.current.value;
        const note = textInput;
        const tags = [...categoryList]
        const newNote = new Note({title: noteTitle, note:note, categories:tags});
        if(note){
            notesArr.unshift(newNote);
            setNotes([...notesArr]);

            localStorage.setItem('Notes', JSON.stringify(notes))    
            title.current.value='';
            category.current.value='';
            setTextInput('');
            setCategoryList([]);
        }

        console.log(notes);
    }
    
    const handleChange = (e,editor) => {
        const data = editor.getData();
        setTextInput(data)
        console.log(textInput)
    }
    
    useEffect(() => {
        let savedItems = JSON.parse(localStorage.getItem('Notes'))
        setNotes([...savedItems])
    },[])
    return (
        <NoteContext.Provider value={{textInput: textInput, setTextInput: setTextInput, notes: notes, setNotes: setNotes, categoryList: categoryList, setCategoryList: setCategoryList, title:title, category: category, Note: Note, deleteNote: deleteNote, editNote:editNote, open: open, setOpen: setOpen, handleSubmit: handleSubmit, addCategory: addCategory, handleChange: handleChange}}>
            { props.children }
        </NoteContext.Provider>
    )
}