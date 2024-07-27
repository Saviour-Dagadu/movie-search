"use client";

import React, { Suspense, useEffect, useState } from 'react';
import Loading from '../Loading';
import { useSearchParams } from 'next/navigation';
import axios from 'axios';
import Image from 'next/image';
import Genres from '../Genres';
import { BsPlayFill } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import dynamic from 'next/dynamic';

const ReactPlayer = dynamic(() => import('react-player/lazy'), { ssr: false });

interface IMovie {
    poster_path: string;
    title: string;
    genres: {
        name: string;
        id: string;
    }[];
    original_language: string;
    release_date: string;
    runtime: string;
    vote_average: string;
    overview: string;
    videos: { results: { type: string; key: string }[] };
}

const MovieComponent = () => {
    const searchParams = useSearchParams();

    const [isLoading, setIsLoading] = useState(false);
    const [isImgLoading, setIsImgLoading] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [trailer, setTrailer] = useState("");
    const [movie, setMovie] = useState<IMovie | null>(null);

    useEffect(() => {
        const fetchMovie = async () => {
            setIsLoading(true);
            setIsImgLoading(true);

            let searchMovie = searchParams.get("movie");
            console.log("Search Parameter:", searchMovie);

            if (searchMovie === null) {
                searchMovie = "Avengers"; // Default movie name
            }

            try {
                const searchResponse = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
                    params: {
                        api_key: process.env.NEXT_PUBLIC_API_KEY,
                        query: searchMovie
                    }
                });

                const movieId = searchResponse?.data?.results[0]?.id;
                if (movieId) {
                    const movieResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                        params: {
                            api_key: process.env.NEXT_PUBLIC_API_KEY,
                            append_to_response: 'videos'
                        }
                    });
                    setMovie(movieResponse.data);
                } else {
                    console.error("Movie not found");
                }
            } catch (err) {
                console.error(err);
            } finally {
                setIsLoading(false);
                setIsImgLoading(false);
            }
        };

        fetchMovie();
    }, [searchParams]);

    useEffect(() => {
        if (movie) {
            const trailerIndex = movie.videos.results.findIndex((element) => element.type === "Trailer");
            const trailerURL = `https://www.youtube.com/watch?v=${movie.videos.results[trailerIndex]?.key}`;
            setTrailer(trailerURL);
        }
    }, [movie]);

    return (
        <div>
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
                        <div className='uppercase -translate-y-3 text-[26px] md:text-[34px] font-medium pr-4 text-black'>
                            {movie?.title}
                        </div>

                        <div className='flex gap-4 flex-wrap'>
                            {movie?.genres?.map((genre, index) => (
                                <Genres
                                    key={genre.id}
                                    index={index}
                                    length={movie.genres.length}
                                    name={genre.name}
                                />
                            ))}
                        </div>

                        <div className='flex flex-col md:flex-row gap-2 md:gap-6 text-black'>
                            <div>Language: {movie?.original_language?.toUpperCase()}</div>
                            <div>Release: {movie?.release_date}</div>
                            <div>Runtime: {movie?.runtime} MIN.</div>
                            <div>Rating: {movie?.vote_average}</div>
                        </div>

                        <div className='pt-14 space-y-2 pr-4 text-black'>
                            <div>OVERVIEW:</div>
                            <div className='lg:line-clamp-4'>{movie?.overview}</div>
                        </div>

                        <div className='inline-block pt-6 cursor-pointer' onClick={() => setShowPlayer(true)}>
                            <div className='flex gap-2 items-center bg-black text-white px-4 py-2 mb-7 hover:bg-[#b4b4b4]'>
                                <BsPlayFill size={24} />
                                Watch Trailer
                            </div>
                        </div>
                    </div>
                </div>

                {showPlayer && (
                    <div className='absolute top-0 left-0 w-full h-full bg-black bg-opacity-75 flex justify-center items-center'>
                        <div className='relative w-full max-w-4xl'>
                            <div className='flex items-center justify-between bg-black text-[#f9f9f9] p-3.5'>
                                <span className='font-semibold'>Playing Trailer</span>
                                <div
                                    className='cursor-pointer w-40 h-5 flex justify-center items-center rounded-lg opacity-50 hover:opacity-75 hover:bg-[#0F0F0F]'
                                    onClick={() => setShowPlayer(false)}
                                >
                                    <IoMdClose className='h-5' />
                                </div>
                            </div>
                            <div className='relative pt-[56.25%]'>
                                <ReactPlayer
                                    url={trailer}
                                    width='100%'
                                    height='100%'
                                    style={{ position: 'absolute', top: '0', left: '0' }}
                                    controls={true}
                                    playing={showPlayer}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Home = () => {
    return (
        <Suspense fallback={<Loading />}>
            <MovieComponent />
        </Suspense>
    );
};

export default Home;
