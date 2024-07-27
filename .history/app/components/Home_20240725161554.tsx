"use client"
import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import { useSearchParams } from 'next/navigation';


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

    const searchParams = useSearchParams();

    const[isLoading, setIsLoading] = useState(false)
    const[isImgLoading, setIsImgLoading] = useState(false)
    const [movie, setmovie] = useState<IMovie>()

    useEffect(() => {
        setIsLoading(true)
        setIsImgLoading(true)

        let searchMovie = searchParams.get("movie")

        if (searchMovie === null) {
            searchMovie = "Bavengers";
        }

        axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: process.env.NEXT_PUBLIC_API_KEY,
                query: searchMovie
            }
        }). then((res) => {
            console.log(res.data);
        }) ; 

    }, []);

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
