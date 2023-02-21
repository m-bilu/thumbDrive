import { app, database } from '../../firebaseConfig'
import styles from '@/styles/evernote.module.scss'
import { dbInstance} from './NoteOperations';

import dynamic from 'next/dynamic'
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
// WHY DOES REACTQUILL USE THE WIERDEST IMPORT?

import { useState, useEffect } from 'react' // Hooks
import 'react-quill/dist/quill.snow.css';
import {doc, getDoc, getDocs, updateDoc, collection, deleteDoc } from 'firebase/firestore'

export default function noteDetails({ID} : any) {

    const [singleNote, setSingleNote] = useState({})
    const [isEdit, setIsEdit] = useState(false)
    const [noteTitle, setNoteTitle] = useState('')
    const [noteDesc, setNoteDesc] = useState('')


    const getSingleNote = async () => {
        if (ID) {
            const singleNote = doc(database, 'notes', ID)
            const data = await getDoc(singleNote)
            setSingleNote({ ...data.data(), id: data.id })
            
        }
    }

    useEffect(() => { // Everytime ID changes, we insert ID as dependency injection
                      //    and return getSingleNote() to log data of requested note
        getSingleNote()
    }, [ID])

    const getNotes = async () => { // creates array of {}, returns first one,
                                   // sets as default.
        getDocs(dbInstance)
        .then((data) => {
            setSingleNote(data.docs.map((item) => {
                return { ...item.data(), id: item.id }
            })[0]);
        })
    }

    useEffect(() => {

        getNotes()
    }, [])

    const getEditData = () => { // Hiding, Showing edit forms
        setIsEdit(true);
        setNoteTitle(singleNote.noteTitle)
       setNoteDesc(singleNote.noteDesc)
    }

    const editNote = (id: any) => {
        const collectionByID = doc(database, 'notes', id)

        updateDoc(collectionByID, {
            noteTitle: noteTitle,
            noteDesc: noteDesc,
        })

        .then(() => {
            window.location.reload()
        })
    }

    const deleteNote = (id: any) => {
        const collectionByID = doc(database, 'notes', id)

        deleteDoc(collectionByID)

        .then(() => {
            window.location.reload()
        })
    }

    return (

    <>
    
    <div>
        <button 
        className={styles.editBtn}
        onClick={getEditData}>
            Edit
        </button>

        <button 
        className={styles.deleteBtn}
        onClick={() => deleteNote(singleNote.id)}>Delete</button>

    </div>

        {isEdit ? (
                <div className={styles.inputContainer}>
                    <input 
                    className={styles.input}
                    placeholder='Enter Title Here...' 
                    onChange={(e) => setNoteTitle(e.target.value)}
                    value={noteTitle}
                    />
                    <div className={styles.ReactQuill}>
                        <ReactQuill
                        onChange={setNoteDesc}
                        value={noteDesc} 
                        />
                    </div>
                    <button
                    className={styles.saveBtn}
                    onClick={() => editNote(singleNote.id)}>
                        Update Note
                    </button>
                </div>
            ) : (
                <></>
            )}

    
    <h2>{singleNote.noteTitle}</h2> 
    <div dangerouslySetInnerHTML={{ __html: singleNote.noteDesc}}></div>  
    
    
    
    </>) // WTF IS THAT TAG AAA
}