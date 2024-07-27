"use client"
import React, { useState } from 'react';
import Loading from '../Loading';


const Home = () => {

    const[isLoading, setIsLoading] = useState(false)
    const [movie, setmovie] = useState<IMovie>()

    return ( 
        <div className='bg-secondary relative px-4 md:px-0'>
            {isLoading && <Loading />}

            <div className='container mx-auto min-h-[calc(100vh-77px)] flex item-center relative'>
                <div className='flex-col lg:flex-row flex gap-10 lg:mx-10 py-20'>
                    <div className='mx-auto flex-none relative'>
                        <Image 
                            src={`https://image.tmdb.org/t/p/w500/?$(movie?.poster_path)`} 
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
