import React from 'react'
import { Footer, Header } from '../../components'

function Landing() {
  return (
    <div className='h-screen overflow-y-auto bg-white text-slate-900 dark:bg-[#121212] dark:text-white'>
      <Header />
      <section className='relative mx-auto max-w-3xl px-4 py-20 flex justify-center items-center'>
        <h1>Landing</h1>
      </section>
      <Footer />
    </div>
  )
}

export default Landing