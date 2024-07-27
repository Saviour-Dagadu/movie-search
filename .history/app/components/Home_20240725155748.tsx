"use client"
import React, { useState } from 'react';
import Loading from '../Loading';


const Home = () => {

    interface IMovie {
        poster_path: string;
        title: string;
        genres: [
            {
                name: string;
                id: string;
            }
        ];
        original_language: string;
        release_date: string;
        runtime: string;
        vote_average: string;
        overview: string;
        vidoes: { results: [{ type: string; key: string }] };
    }

    const[isLoading, setIsLoading] = useState(false)
    const[isImgLoading, setIsImgLoading] = useState(false)
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
