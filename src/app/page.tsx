'use client'
import EpisodeList from '@/components/EpisodeList'
import Loading from '@/components/Loading'
import Player from '@/components/Player'
import { MyContextAutoPlayProvider } from '@/contexts/autoPlayContext'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [darkMode, setDarkMode] = useState(false)
  const [audioId, setAudioId] = useState<number>(0)
  const [loading, setLoading] = useState(true)
  const [playOrPause, setPlayOrPause] = useState('play')
  return (
    <main className={`${darkMode && 'dark'}`}>
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
          className="absolute right-3 p-3"
        >
          <Image width={36} height={36} src={'/assets/DarkMode.svg'} alt="" />
        </button>
      </nav>
      {loading === true && <Loading />}
      <MyContextAutoPlayProvider>
        <Player
          idAudio={audioId}
          setIdAudio={setAudioId}
          playOrPause={playOrPause}
          setPlayOrPause={setPlayOrPause}
        />
        <EpisodeList
          setAudioId={setAudioId}
          audioId={audioId}
          setLoading={setLoading}
          playOrPause={playOrPause}
          setPlayOrPause={setPlayOrPause}
        />
      </MyContextAutoPlayProvider>
    </main>
  )
}
