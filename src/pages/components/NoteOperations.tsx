// if import is not names, default export from this file will be function below
import styles from '@/styles/evernote.module.scss'
import { useState, useEffect } from 'react' // Hooks
import { app, database } from '../../firebaseConfig'
import { collection, addDoc, getDocs } from 'firebase/firestore'
import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
import 'react-quill/dist/quill.snow.css';
// addDoc adds our data to our collection'
// collection instantiates our collection


export const dbInstance = collection(database, 'notes')  
// databse from firebaseConfig import, name of collection

export default function NoteOperations(props: any) {
    // React Hooks, useState Hook, constructor returns an array of two items
    // 1) State Variable 2) function to update the state variable
    // Can declare multiple state variables
    // https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/
    // useState() takes the initial value of the state variable as an argument.
    const [isInputVisible, setInputVisible] = useState(false);
    const [noteTitle, setNoteTitle] = useState('');
    const [noteDesc, setNoteDesc] = useState('');
    const arr : any[] = [];
    const [notesArray, setNotesArray] = useState(arr);


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
            getNotes()
        })
    }
    const addDesc = (value : string) => {
        setNoteDesc(value)
    }
    const getNotes = () => {

        getDocs(dbInstance)
            .then((data) => {
                
                setNotesArray(data.docs.map((item) => {
                    return { ...item.data(), id: item.id }
                }));
            })

    }

    // useEffect hook runs whenever the page is refreshed. Empty dependency array implies
    //  that every render will cause rerun. Return type is an undo function.
    useEffect(() => {
        getNotes();
    }, [])

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

            <div className={styles.notesList}>
                {notesArray.map((note) => {
                    return (
                        <div key={note.id}
                        className={styles.notesInner}
                        onClick={() => props.getSingleNote(note.id)}>
                            <h4>{note.noteTitle}</h4>
                            
                        </div>
                    )
                })}
            </div>

        </>
    )

    // <div dangerouslySetInnerHTML={{ __html: note.noteDesc }}></div>

    // At this point, we have saved our data. We must send it to a database like Firebase.
}