// if import is not names, default export from this file will be function below
import styles from '@/styles/evernote.module.scss'
import { useState } from 'react'

export default function NoteOperations() {
    // React Hooks, useState Hook, constructor returns an array of two items
    // 1) State Variable 2) function to update the state variable
    // Can declare multiple state variables
    // https://blog.logrocket.com/a-guide-to-usestate-in-react-ecb9952e406c/
    // useState() takes the initial value of the state variable as an argument.
    const [isInputVisible, setInputVisible] = useState(false);

    // Function Declaration in Typescript:
    // https://www.typescriptlang.org/docs/handbook/2/functions.html
    const inputToggle = () => {
        setInputVisible(!isInputVisible)
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
                <div className={styles.inputContainer}>
                    <input placeholder='Enter the Title..'/>    
                </div>
            ) : (
                <></>
            )}

        </>
    )
}