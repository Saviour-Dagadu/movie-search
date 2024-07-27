'use client';

import React, { useEffect, useState } from 'react';
import Loading from '../Loading';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';

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
        videos: { results: [{ type: string; key: string }] };
    }

    const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isImgLoading, setIsImgLoading] = useState(false);
    const [movie, setMovie] = useState<IMovie | null>(null);

    useEffect(() => {
        setIsLoading(true);
        setIsImgLoading(true);

        let searchMovie = searchParams.get("movie");

        if (searchMovie === null) {
            searchMovie = "Avengers"; // Correct the default movie name
        }

        axios.get(`https://api.themoviedb.org/3/search/movie`, {
            params: {
                api_key: process.env.NEXT_PUBLIC_API_KEY,
                query: searchMovie
            }
        })
        .then((res) => {
            const movieId = res?.data?.results[0]?.id;
            if (movieId) {
                return axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_API_KEY,
                        append_to_response: 'videos'
                    }
                });
            } else {
                throw new Error("Movie not found");
            }
        })
        .then((res) => {
            setMovie(res.data);
            setIsLoading(false);
            setIsImgLoading(false);
            console.log(res.data);
        })
        .catch((err) => {
            console.error(err);
            setIsLoading(false);
            setIsImgLoading(false);
        });

    }, [searchParams]);

    return ( 
        <div className='bg-secondary relative px-4 md:px-0'>
            {isLoading && <Loading />}

            <div className='container mx-auto min-h-[calc(100vh-77px)] flex items-center relative'>
                <div className='flex flex-col lg:flex-row gap-10 lg:mx-10 py-20'>
                    <div className='mx-auto flex-none relative'>
                        {movie && (
                            <Image 
                                src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                                width={700}
                                height={700}
                                className="w-[300px] object-cover"
                                alt="movie poster"
                                onLoadingComplete={() => setIsImgLoading(false)}
                                priority
                            />
                        )}
                        {isImgLoading && <Loading />}
                    </div>
                    <div className='space-y-6'>
                        <div className='uppercase -translate-y-3 text-[26px] md:text-[34px] font-medium pr-4 text-white'>
                            {movie?.title}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
