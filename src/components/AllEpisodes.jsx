// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect, useContext } from 'react'
import DataContext from '../context/DataContext';
import SettingsContext from '../context/SettingsContext';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom'
import { animeApi } from '../api/api'
import Loader from './Loader';
import Error from './Error';
import { ArrowsUpDownIcon, ListBulletIcon, Squares2X2Icon } from '@heroicons/react/24/outline';
import ToTop from './ToTop';

const AllEpisodes = () => {
    const {ogTitle, ogDesc, ogImg, setOgTitle, setOgDesc, setOgImg} = useContext(DataContext);
    // eslint-disable-next-line no-unused-vars
    const {animeProvider} = useContext(SettingsContext)

    const {animeId} = useParams();
    const [animeInfo, setAnimeInfo] = useState([]);
    const [episodeList, setEpisodeList] = useState([]);
    const [episodeSort, setEpisodeSort] = useState('Newest First');
    const [isLoading, setIsLoading] = useState(false);
    const [fetchError, setFetchError] = useState(null);
    const [view, setView] = useState('List');

    useEffect(() => {
        setOgTitle(`Karasu - ${animeInfo.title?.romaji}`);
        setOgDesc(`Stream all ${animeInfo.title?.romaji} episodes for free.`);
        setOgImg(animeInfo?.image);
    }, [animeInfo])

    useEffect(() => {
        setIsLoading(true);
        setFetchError(null);

        const fetchEpisodeList = async () => {
            try {
                const {data} = await animeApi.get(`info/${animeId}`, {
                    params:{
                        provider: 'animeProvider',
                }});
                console.log(data);
                setAnimeInfo(data);
            } catch(err) {
                if (err.response) {
                    console.log(err.response);
                    setFetchError(err.response.data.message)
                } else {
                    console.log(err.message);
                    setFetchError(err.message);
                }
            } finally {
                setIsLoading(false);
            }
        }

        fetchEpisodeList();
    }, [])

    useEffect(() => {
        if (animeInfo.episodes) {
            if (episodeSort === 'Newest First') {
                const newFirst = [...animeInfo.episodes];
                newFirst.reverse();
                setEpisodeList(newFirst);
            } else if (episodeSort === 'Oldest First') {
                const oldFirst = animeInfo.episodes;
                setEpisodeList(oldFirst);
            }
        }
    }, [animeInfo, episodeSort])

  return (
    <main className='dark:text-white pb-10 lg:pt-32'>

        {/* Dynamically change the og meta tags */}
        <Helmet prioritizeSeoTags>
            <title>{ogTitle}</title>
            <meta property='og:title' content={ogTitle} data-rh='true' />
            <meta property='og:description' content={ogDesc} data-rh='true' />
            <meta property='og:image' content={ogImg} data-rh='true' />
        </Helmet>

        <section className='flex flex-col p-5 gap-4 sm:px-7 md:px-10 lg:px-16 lg:flex-row lg:justify-between xl:px-28'>
            <h2 className='font-montserrat sm:text-lg'><Link to={`/anime/${animeInfo.id}`} className='underline sm:font-bold sm:no-underline sm:hover:underline'>{animeInfo.title?.romaji}</Link> All Episodes</h2>

            <div className='flex items-center self-end gap-4'>
                <button type='button' className='flex gap-2 items-center p-1 rounded-md hover:bg-[whitesmoke] dark:hover:bg-[#333] transition-all' onClick={() => setEpisodeSort(prev => prev === 'Newest First' ? 'Oldest First' : 'Newest First')}>
                    <p className='text-sm'>{episodeSort}</p>
                    <ArrowsUpDownIcon className='h-6 w-6' />
                </button>

                <button type='button' className='self-end flex gap-2 items-center p-1 rounded-md hover:bg-[whitesmoke] dark:hover:bg-[#333] transition-all' onClick={() => setView(prev => prev === 'List' ? 'Grid' : 'List')}>
                    <p className='text-sm'>{view}</p>
                    {view === 'List' ? <ListBulletIcon className='h-6 w-6' /> : <Squares2X2Icon className='h-6 w-6' />}
                </button>
            </div>
        </section>

        {isLoading && !fetchError && <Loader />}

        {fetchError && !isLoading && <Error fetchError={fetchError} />}

        {!fetchError && !isLoading && (
            <section className={view === 'List' ? 'flex flex-col lg:grid lg:grid-cols-2 lg:gap-x-4 lg:px-16 xl:px-28' : 'grid grid-cols-3 gap-3 px-5 sm:px-7 sm:gap-5 md:px-10 lg:px-16 lg:grid-cols-4 xl:px-28'}>
                {episodeList?.length ? (
                    episodeList.map(episode => (
                        <Link to={`/episode/${animeInfo.id}/${episode.number}`} key={episode.id} className={view === 'List' ? 'grid grid-cols-4 gap-x-2 py-4 px-5 border-b last:border-0 dark:border-b-gray-700 hover:bg-[whitesmoke] dark:hover:bg-[#333] transition-all sm:px-7 md:px-10 lg:px-4' : 'flex flex-col gap-2 hover:bg-[whitesmoke] dark:hover:bg-[#333] transition-all'}>
                            <img src={episode.image} alt={`Ep. ${episode.number}`} className={view === 'List' ? 'col-span-1 my-auto' : ''} />
                            <div className='col-span-3 flex flex-col py-2'>
                                <p className={view === 'List' ? 'line-clamp-1 text-ellipsis sm:text-lg' : 'line-clamp-2 text-ellipsis text-sm sm:text-base lg:px-2 lg:font-medium'}>{episode.number}. {episode.title}</p>
                                <p className={view === 'List' ? 'text-gray-400 text-sm sm:text-base' : 'text-gray-400 text-xs sm:text-sm lg:px-2'}>{episode.airDate?.slice(0, episode.airDate.indexOf('T'))}</p>
                            </div>
                        </Link>
                    ))
                ) : (
                    <p className='text-center col-span-full'>No episodes have been released yet.</p>
                )}
            </section>
        )}

        <ToTop />
    </main>
  )
}

export default AllEpisodes