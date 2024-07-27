import Link from 'next/link';
import { useRouter } from 'next/router'; // Correct import for useRouter
import React, { useState } from 'react';
'use client'

const Navbar = () => {
    const [input, setInput] = useState("");
    const router = useRouter();

    const searchMovie = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.push(`?movie=${input}`);
        setInput("");
    };

    return ( 
        <div className="bg-primary pt-4 px-4 md:px-0">
            <div className="container mx-auto flex justify-between items-center">
                <Link href='/'>
                    <div className="text-[30px] font-medium">Logo</div>
                </Link>
                <form onSubmit={searchMovie}>
                    <input 
                        type="text" 
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        className="border p-2"
                    />
                    <button type="submit" className="p-2 bg-secondary text-white">
                        Search
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Navbar;
