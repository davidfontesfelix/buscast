import axios from 'axios'
import {
  useEffect,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from 'react'
import { MyContextAutoPlay } from '@/contexts/autoPlayContext'
import { MyContextAPIRequest } from '@/contexts/APIRequestContext'

type Episode = {
  id: number
  title: string
  link: string
  date: string
  temp: string
}

interface episodeListProps {
  setAudioId: Dispatch<SetStateAction<number>>
  audioId: number
  setLoadingPage: Dispatch<SetStateAction<boolean>>
  playOrPause: string
  setPlayOrPause: Dispatch<SetStateAction<string>>
}

export default function EpisodeList(props: episodeListProps) {
  const { episodesData, setEpisodesData } = useContext(MyContextAPIRequest)

  const { setAutoPlay } = useContext(MyContextAutoPlay)

  useEffect(() => {
    axios
      .get<Episode[]>('https://api-buscast.vercel.app/episodes')
      .then((response) => {
        setEpisodesData(response.data)
      })
    setTimeout(() => {
      props.setLoadingPage(false)
    }, 200)
  }, [props, setEpisodesData])

  const handlerClickEpisode = (episode: Episode) => {
    props.setAudioId(episode.id)
    setAutoPlay(true)
    props.setPlayOrPause('pause')
  }

  return (
    <section className="lg:w-[33vw] dark:bg-Dark">
      <ul>
        {episodesData.map((episode: Episode) => (
          <li
            onClick={() => handlerClickEpisode(episode)}
            key={episode.id}
            className={`flex items-center w-full cursor-pointer border-t-[1px] ${
              props.audioId !== episode.id && 'border-x-[1px]'
            } ${episode.id === 1 && 'rounded-t-xl'}`}
          >
            {props.audioId === episode.id ? (
              <div className="h-[108px] w-full rounded bg-[#04081E] dark:bg-BlueLight my-[10px] mx-[9%] flex items-center">
                <div className="w-20 h-20 bg-Blue relative mx-4 border-[1px] border-white/30">
                  <p className="text-sm text-white font-bold absolute bottom-[10px] left-[10px]">
                    Episódio Piloto
                  </p>
                </div>
                <div className="h-[72px] relative">
                  <p className="text-xs font-medium opacity-60 font-JetBrainsMono text-[#ffffff]">
                    Reproduzindo:
                  </p>
                  <h2 className="text-base font-bold leading-5 text-[#F1F5F9]">
                    {episode.title}
                  </h2>
                  <span className="text-xs font-medium bottom-0 absolute font-JetBrainsMono opacity-60 text-[#ffffff]">
                    {episode.temp}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex w-full gap-4 mx-[9%] my-[14px]">
                <div className="w-20 h-20 bg-Blue  relative">
                  <p className="text-sm text-white font-bold absolute bottom-[10px] left-[10px]">
                    Episódio Piloto
                  </p>
                </div>
                <div className="relative">
                  <p className="text-xs font-medium opacity-60 font-JetBrainsMono dark:text-white">
                    {episode.date}
                  </p>
                  <h2 className="text-base leading-5 font-bold mt-1 dark:text-white">
                    {episode.title}
                  </h2>
                  <span className="text-xs font-medium absolute font-JetBrainsMono bottom-1 opacity-60 dark:text-white">
                    {episode.temp}
                  </span>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </section>
  )
}
