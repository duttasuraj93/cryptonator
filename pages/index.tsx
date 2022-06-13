import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <div>
      <h1>Home Page</h1>
      <Link href="/cryptocurrencies" ><button>Go to Cryptocurrencies</button></Link>
    </div>
  )
}

export default Home
