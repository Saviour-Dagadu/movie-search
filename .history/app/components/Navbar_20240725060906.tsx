import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
'use client'

const Navbar = () => {

const [input, setInput] = useState('')
const router = useRouter()

const searchMovie = (e) => {
    e.preventDefault()
    router.push(`?movie=${input}`)
    setInput('')
}

  return (
    <div>
      Navbar
    </div>
  );
}

export default Navbar;
