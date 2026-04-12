import React from 'react'
import Hero2 from '../components/Hero2'
import Nav from '../components/nav'
import PreviousPosts from '../components/posts'
import Claims from '../components/Claims'
import Footer from '../components/Footer'

export default function DonorPage() {
  return (
    <div className="relative">
      <div className="fixed inset-x-0 top-0 bg-white/50 backdrop-blur-sm z-50 shadow-sm">
        <Nav />
      </div>
      <div className="pt-24 flex flex-col gap-20 md:gap-[55px]">
        <Hero2 />
        <PreviousPosts />
        <Claims />
      </div>
        <Footer />
    </div>
  )
}
