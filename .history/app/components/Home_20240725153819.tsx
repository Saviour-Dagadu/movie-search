import React, { useState } from 'react';
import Loading from '../Loading';


const Home = () => {

    const[isLoading, setIsLoading] = useState(false)

    return ( 
        <div className='bg-secondary relative px-4 md:px-0'>
            {isLoading && <Loading />}
        </div>
    );
}

export default Home;
