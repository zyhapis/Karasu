// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
// eslint-disable-next-line no-unused-vars
import { anilist, animeApi } from '../api/api'
import Loader from './Loader'
import Error from './Error'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline'

// eslint-disable-next-line react/prop-types
const SearchAnime = ({ query }) => {
    const [page, setPage] = useState(1);
    const [searchResults, setSearchResults] = useState([]);
    const [nextPage, setNextPage] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);

    useEffect(() => {

        setIsLoading(true);
        setFetchError(null);

        const fetchSearchResults = async () => {
            try {
                // new stuff

                const { data } = await animeApi.get(query, {
                    params: {
                    page: page
                    }
                })
                console.log(data)
                setSearchResults(data.results);
                setNextPage(data.hasNextPage);

                /* const data = await anilist.search(query, page)
                console.log(data)
                
                setSearchResults(data.results);
                setNextPage(data.hasNextPage); */
            } catch(err) {
                if (err.response) {
                    console.log(err.response);
                    setFetchError(err.response.data.message);
                } else {
                    console.log(err.message);
                    setFetchError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchSearchResults();
    }, [query, page])

  return (
    <>
        {isLoading && !fetchError && <Loader />}

        {fetchError && !isLoading && <Error fetchError={fetchError} />}

        {!isLoading && !fetchError && !searchResults.length && <Error fetchError={`No results found for ${query}`} />}

        {!isLoading && !fetchError && searchResults.length && (
            <section className='grid grid-cols-3 gap-3 pb-20 relative dark:text-white sm:grid-cols-4 sm:gap-5 lg:grid-cols-6 xl:grid-cols-7'>
                {searchResults.map(result => (
                    <Link to={`/anime/${result.id}`} key={result.id} className='relative h-full hover:scale-105 transition-all'>
                        <img src={result.image} alt='' className='rounded-lg shadow-lg' />
                        <p className='p-1 bg-accent absolute top-2 right-2 text-xs rounded-md dark:text-[#1a1a1a] sm:text-sm'>{result.releaseDate}</p>
                        <p className='mt-1 text-sm line-clamp-2 text-ellipsis sm:text-base lg:text-lg'>{result.title.userPreferred}</p>
                    </Link>
                ))}

                <button disabled={page === 1} onClick={() => setPage(prev => prev - 1)} className='absolute bottom-3 left-0 p-2 rounded-lg bg-accent text-sm disabled:hidden dark:text-[#1a1a1a] sm:text-base'><ChevronLeftIcon className='h-6 w-6 inline' />Previous Page</button>

                <button disabled={!nextPage} onClick={() => setPage(prev => prev + 1)} className='absolute bottom-3 right-0 p-2 rounded-lg bg-accent text-sm disabled:hidden dark:text-[#1a1a1a] sm:text-base'>Next Page<ChevronRightIcon className='h-6 w-6 inline' /></button>
            </section>
        )} 
    </>
  )
}

export default SearchAnime