import './editor.css'
import React,{ useState, useEffect, useContext } from 'react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { CKEditor } from '@ckeditor/ckeditor5-react'
import { config } from './editorConfig'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    editor:{
        
    }
})

function NoteEditor() {
    const classes = useStyles();
    const [text, setText] = useState()
        
    ClassicEditor.defaultConfig = config;

    const handleChange = (e,editor) => {
        const data = editor.getData();
        setText(data)
        console.log(text)
    }

    return (
        <>  
        <form className={classes.editor}>
            <CKEditor
                editor={ClassicEditor}
                data={text}
                className='ck-editor'
                onReady={ editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log( 'Editor is ready to use!', editor );
                } }
                onBlur={ ( event, editor ) => {
                    console.log( 'Blur.', editor );
                } }
                onFocus={ ( event, editor ) => {
                    console.log( 'Focus.', editor );
                } }
                onChange={handleChange}
            >  
            </CKEditor>
        </form>
        </>
    )
}

export default NoteEditor
