import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'  
import styles from '@/styles/evernote.module.scss'
import NoteOperations from '@/pages/components/NoteOperations'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <> 
      <Head>
        <title>Thumb Drive</title>
        <meta name="description" content="Many Many Notes." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main className={styles.main}>  
        <div className={styles.container}>
          <div className={styles.left}> <NoteOperations /> </div>
          <div className={styles.right}>Right</div>
        </div>
      </main>
    </>
  )
}
