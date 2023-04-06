import Head from 'next/head'
import Sidebar from '../components/Sidebar'
import Feed from '../components/Feed'


export default function Home() {
  return (
    <div className="">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className='bg-black min-h-screen flex max-w-[1500px] mx-auto'>
        <Sidebar/>
        {/* Feed */}
        <Feed/>
        {/* Widgets */}

        {/* Modal */}
      </main>
      </div>
  )
}
