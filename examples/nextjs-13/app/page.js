import Image from 'next/image'
import styles from './page.module.css'
import Link from "next/link";

export default function Home() {
  return (
    <nav>
      <ul>
        <li><Link href="/MuxUploader" className="uploader">&lt;MuxUploader&gt;</Link></li>
      </ul>
    </nav>
  )
}
