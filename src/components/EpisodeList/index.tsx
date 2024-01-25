import axios from 'axios'
import { useEffect, useState, useContext } from 'react'
import { MyContextAutoPlay } from '@/contexts/autoPlayContext'

type Episode = {
  id: number
  title: string
  link: string
  date: string
  temp: string
}

interface episodeListProps {
  setAudioId: any
  audioId: number
  setLoading: any
  playOrPause: string
  setPlayOrPause: any
}

export default function EpisodeList(props: episodeListProps) {
  const [episodeId, setEpisodeId] = useState<Episode[]>([])

  const { setAutoPlay } = useContext(MyContextAutoPlay)

  useEffect(() => {
    axios
      .get<Episode[]>('https://api-buscast.vercel.app/episodes')
      .then((response) => {
        setEpisodeId(response.data)
      })
    setTimeout(() => {
      props.setLoading(false)
    }, 200)
  }, [props])

  const handlerClickEpisode = (episode: any) => {
    props.setAudioId(episode.id)
    setAutoPlay(true)
    props.setPlayOrPause('pause')
  }

  return (
    <section>
      <ul>
        {episodeId.map((episode) => (
          <li
            onClick={() => handlerClickEpisode(episode)}
            key={episode.id}
            className="flex items-center w-full cursor-pointer border-t-[1px] "
          >
            {props.audioId === episode.id ? (
              <div className="h-[108px] w-full rounded bg-[#04081E] my-[10px] mx-[9%] flex items-center">
                <div className="w-20 h-20 bg-Blue relative mx-4 border-[1px] border-white/30">
                  <p className="text-sm text-white font-bold absolute bottom-[10px] left-[10px]">
                    Episódio Piloto
                  </p>
                </div>
                <div className="h-[72px] relative">
                  <p className="text-xs font-medium opacity-60 text-[#808080]">
                    Reproduzindo:
                  </p>
                  <h2 className="text-base font-bold leading-5 text-[#F1F5F9]">
                    {episode.title}
                  </h2>
                  <span className="text-xs font-medium bottom-0 absolute opacity-60 text-[#808080]">
                    {episode.temp}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex w-full gap-4 mx-[9%] my-[14px]">
                <div className="w-20 h-20 bg-Blue relative">
                  <p className="text-sm text-white font-bold absolute bottom-[10px] left-[10px]">
                    Episódio Piloto
                  </p>
                </div>
                <div className="relative">
                  <p className="text-xs font-medium opacity-60">
                    {episode.date}
                  </p>
                  <h2 className="text-base leading-5 font-bold mt-1">
                    {episode.title}
                  </h2>
                  <span className="text-xs font-medium absolute bottom-1 opacity-60">
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
