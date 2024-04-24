import Link from 'next/link';
import DefaultHeader from '../components/default-header';
import '../styles.css'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "Mux Elements"
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head/ >
      <body>
        <DefaultHeader/>
        {children}
        <br/>
        <Link href="/">← Browse Elements</Link>
      </body>
    </html>
  )
}