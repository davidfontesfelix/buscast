'use client'
import EpisodeList from '@/components/EpisodeList'
import Loading from '@/components/LoadingPage'
import Player from '@/components/Player'
import { MyContextAPIRequestProvider } from '@/contexts/APIRequestContext'
import { MyContextAutoPlayProvider } from '@/contexts/autoPlayContext'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [audioId, setAudioId] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [playOrPause, setPlayOrPause] = useState('play')
  return (
    <main className={`${darkMode && 'dark bg-Dark'} h-screen w-screen`}>
      <nav className="flex justify-center relative items-center py-3 dark:bg-Dark">
        <Image
          width={51}
          height={77}
          src={
            darkMode ? '/assets/LogoBuscastDark.svg' : '/assets/LogoBuscast.svg'
          }
          alt=""
        />
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="absolute right-3 p-3 lg:right-10 lg:hover:bg-BlueLight transition-colors rounded-full"
        >
          <Image
            width={36}
            height={36}
            src={
              darkMode
                ? '/assets/icons/lightMode.svg'
                : '/assets/icons/darkMode.svg'
            }
            alt=""
          />
        </button>
      </nav>
      {loading === true && <Loading />}
      <section className="lg:flex">
        <MyContextAPIRequestProvider>
          <MyContextAutoPlayProvider>
            <Player
              audioId={audioId}
              setAudioId={setAudioId}
              playOrPause={playOrPause}
              setPlayOrPause={setPlayOrPause}
            />
            <EpisodeList
              setAudioId={setAudioId}
              audioId={audioId}
              setLoadingPage={setLoading}
              playOrPause={playOrPause}
              setPlayOrPause={setPlayOrPause}
            />
          </MyContextAutoPlayProvider>
        </MyContextAPIRequestProvider>
      </section>
    </main>
  )
}
