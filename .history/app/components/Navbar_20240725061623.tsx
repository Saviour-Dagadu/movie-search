import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
'use client'

const Navbar = () => {

const [input, setInput] = useState('')
const router = useRouter()

const searchMovie = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    router.push(`?movie=${input}`)
    setInput('')
}

  return ( 
  <div className='bg-primary pt-4 md:px-0'>
    <div className="container mx-auto flex justify-betwee items-center"></div>
        <Link href='/'>
            <div className="text-[30px] font-medium">Logo</div>
        </Link>
    </div>
  );
}

export default Navbar;
