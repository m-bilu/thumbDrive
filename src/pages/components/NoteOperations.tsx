// if import is not names, default export from this file will be function below
import styles from '@/styles/evernote.module.scss'
import { useState } from 'react'
import { app, database } from '../../firebaseConfig'
import { collection, addDoc } from 'firebase/firestore'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
// addDoc adds our data to our collection'
// collection instantiates our collection


export default function NoteOperations() {
    // React Hooks, useState Hook, constructor returns an array of two items
    // 1) State Variable 2) function to update the state variable
    // Can declare multiple state variables
    // https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/
    // useState() takes the initial value of the state variable as an argument.
    const [isInputVisible, setInputVisible] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDesc, setNoteDesc] = useState('');

    const dbInstance = collection(database, 'notes')  
    // databse from firebaseConfig import, name of collection

    // Function Declaration in Typescript:
    // https://www.typescriptlang.org/docs/handbook/2/functions.html
    const inputToggle = () => {
        setInputVisible(!isInputVisible)
    }
    const saveNote = () => { // Sends one piece of data to db, note name. (JSON)
        addDoc(dbInstance, {
            noteTitle: noteTitle,
            noteDesc: noteDesc
        }).then(() => {
            setNoteTitle('')
            setNoteDesc('')
        })
    }
    const addDesc = (value : string) => {
        setNoteDesc(value)
    }

    return (

        // Creating button on left side to create new note
        // btnContainer styles container around the button
        // input should only show up if button clicked: Angular uses event handling/services, react uses React States
        <>
            <div className={styles.btnContainer}>
                <button onClick={inputToggle} className={styles.button}>
                    Add Note
                </button>
            </div>

            {isInputVisible ? (
                <div>
                    <div className={styles.inputContainer}>
                        <input 
                        className={styles.input}
                        placeholder='Enter Title..'
                        onChange={(title) => setNoteTitle(title.target.value)}
                        value={noteTitle}/>    
                        
                        <div className={styles.ReactQuill}>
                            <ReactQuill 
                            onChange={addDesc}
                            value={noteDesc}/>
                        </div>

                    </div>
                    <button 
                        className={styles.saveBtn} 
                        onClick={saveNote}>
                        Save Note
                    </button>
                </div>
            ) : (
                <></>
            )}

        </>
    )

    // At this point, we have saved our data. We must send it to a database like Firebase.
}