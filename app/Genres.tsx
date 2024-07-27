import React from 'react';

interface IGenres {
    index: number;
    name: string;
    lenght: number | undefined;
}

const Genres: React.FC<IGenres> = ({ index, name, lenght}) => {
  return (
    <div className='flex gap-4 text-textColor hover:text-white cursor-pointer'>
        <div>{name}</div>
        <div className='text-textColor'>{index + 1 !== lenght ? "/" : ""}</div>
    </div>
  );
}

export default Genres;
