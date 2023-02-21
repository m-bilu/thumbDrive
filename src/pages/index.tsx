import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'  
import { useState, useEffect } from 'react' // Hooks
import styles from '@/styles/evernote.module.scss'
import NoteOperations from '@/pages/components/NoteOperations'
import NoteDetails from '@/pages/components/NoteDetails'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  // State required to store id of currently displayed item
  const [ID, setID] = useState(null);

  const getSingleNote = (id: any) => {
    setID(id)
  }

  return (
    <> 
      <Head>
        <title>Thumb Drive</title>
        <meta name="description" content="Many Many Notes." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>  
        <div className={styles.container}>
          <div className={styles.left}> <NoteOperations getSingleNote={getSingleNote}/> </div>
          <div className={styles.right}> <NoteDetails ID={ID}/> </div>
        </div>
      </main>
    </>
  )
}
