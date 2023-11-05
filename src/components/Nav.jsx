// eslint-disable-next-line no-unused-vars
import React, {useEffect, useRef, useContext} from 'react'
import { Link } from 'react-router-dom'
import DataContext from '../context/DataContext'
// eslint-disable-next-line no-unused-vars
import { MoonIcon, SunIcon, QuestionMarkCircleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline'

// eslint-disable-next-line react/prop-types
const Nav = ({ navStatus, setNavStatus }) => {
  // eslint-disable-next-line no-unused-vars
  const { isDark, setIsDark } = useContext(DataContext)
  // eslint-disable-next-line no-unused-vars
  const toggleRef = useRef()

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark])

  return (
    <section id='nav-container' className='fixed top-0 left-0 w-full z-[5] -translate-x-full transition-all duration-500 lg:hidden' style={navStatus ? {transform: "translateX(0)"} : {}}>
        <article className='bg-white w-[60%] h-full flex flex-col justify-between pt-24 pb-6 dark:bg-background-dark dark:text-white sm:max-w-[350px]'>
            <nav>
                <ul className='text-lg flex flex-col gap-4 px-6 sm:px-8'>

                  <Link to='settings' onClick={() => setNavStatus(prev => !prev)} className='py-1 flex items-center gap-2 sm:text-lg'>
                    <Cog6ToothIcon className='h-6 w-6' />
                    Settings <br />About
                  </Link>
                </ul>
            </nav>

        </article>
    </section>
  )
}

export default Nav