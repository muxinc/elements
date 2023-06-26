import Image from 'next/image'
import styles from './page.module.css'
import MuxUploader from '@mux/mux-uploader-react/rsc';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <MuxUploader />
      </div>
    </main>
  )
}
