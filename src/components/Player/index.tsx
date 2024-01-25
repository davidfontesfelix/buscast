import { MyContextAutoPlay } from '@/contexts/autoPlayContext'
import axios from 'axios'
import Image from 'next/image'
import { useContext, useEffect, useRef, useState } from 'react'

interface playerProps {
  idAudio: number
  setIdAudio: any
  playOrPause: string
  setPlayOrPause: any
}

type episode = {
  id: string
  title: string
  link: string
  date: string
}

export default function Player(props: playerProps) {
  const [episodeAudio, setEpisodeAudio] = useState<episode | any>({})
  const [durationEp, setDurationEp] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(true)

  const audioRef = useRef<HTMLAudioElement>(null)
  const audio = audioRef.current

  const { autoPlay, setAutoPlay } = useContext(MyContextAutoPlay)
  useEffect(() => {
    axios
      .get(`https://api-buscast.vercel.app/episode/${props.idAudio}`)
      .then((response) => setEpisodeAudio(response.data))
    console.log(props.idAudio)
  }, [props.idAudio])

  useEffect(() => {
    audio?.play()
    setTimeout(() => {
      setAutoPlay(false)
      audio?.play()
    }, 200)
  }, [audio, autoPlay, setAutoPlay])

  useEffect(() => {
    if (props.idAudio > 0) {
      setButtonDisabled(false)
    }
  }, [props])

  const HandleClickPlayAudio = () => {
    if (props.playOrPause === 'play') {
      audio?.play()
      props.setPlayOrPause('pause')
    } else if (props.playOrPause === 'pause') {
      audio?.pause()
      props.setPlayOrPause('play')
    }
  }

  const HandleClickBack5seconds = () => {
    if (audio != null) {
      audio.currentTime -= 5
    }
  }

  const HandleClickSkip10seconds = () => {
    if (audio != null) {
      audio.currentTime += 10
    }
  }
  const HandleClickNextEpisode = () => {
    props.setIdAudio(props.idAudio + 1)
    console.log(props.idAudio)
    setTimeout(() => {
      props.setPlayOrPause('pause')
      audio?.play()
    }, 200)
  }
  const HandleClickPreviousEpisode = () => {
    if (props.idAudio === 1) {
      audio?.play()
    } else {
      props.setIdAudio(props.idAudio - 1)
    }
    setTimeout(() => {
      props.setPlayOrPause('pause')
      audio?.play()
    }, 200)
  }
  const tempUpdate = () => {
    if (audio != null) {
      setDurationEp(Math.floor((audio.currentTime / audio.duration) * 100))

      if (audio.currentTime === audio.duration) {
        props.setPlayOrPause('play')
      }
    }
  }
  return (
    <section className="w-full h-full pb-10 flex justify-center items-center dark:bg-Dark dark:border-none">
      <div className="flex flex-col items-center">
        <div className="bg-Blue rounded w-[332px] h-[332px] relative">
          <h1 className=" text-white text-7xl absolute bottom-8 left-7 font-bold">
            Episódio Piloto
          </h1>
        </div>
        <div className="mt-4 flex gap-5">
          <button onClick={() => HandleClickPreviousEpisode()}>
            <Image
              width={36}
              height={36}
              alt=""
              src={'/assets/icons/skip_previous.svg'}
            />
          </button>
          <button onClick={() => HandleClickBack5seconds()}>
            <Image
              width={36}
              height={36}
              alt=""
              src={'/assets/icons/forward_5.svg'}
            />
          </button>
          {props.playOrPause === 'play' ? (
            <button
              disabled={buttonDisabled}
              onClick={() => HandleClickPlayAudio()}
              className={`bg-BlueLight p-3 rounded-full ${
                props.idAudio === 0 && 'grayscale'
              }`}
            >
              <Image
                width={36}
                height={36}
                alt=""
                src={'/assets/icons/play_arrow.svg'}
              />
            </button>
          ) : (
            <button
              disabled={buttonDisabled}
              onClick={() => HandleClickPlayAudio()}
              className="bg-BlueLight rounded-full "
            >
              <Image
                width={60}
                height={60}
                alt=""
                src={'/assets/icons/pause.svg'}
              />
            </button>
          )}

          <button onClick={() => HandleClickSkip10seconds()}>
            <Image
              width={36}
              height={36}
              alt=""
              src={'/assets/icons/forward_10.svg'}
            />
          </button>
          <button onClick={() => HandleClickNextEpisode()}>
            <Image
              width={36}
              height={36}
              alt=""
              src={'/assets/icons/skip_next.svg'}
            />
          </button>
        </div>
        <div className="mt-5">
          <div className="w-[332px] h-[10px] bg-[#B3B3B3] rounded-[100px]">
            <div
              className={`h-full bg-BlueLight rounded-[100px] transition-all`}
              style={{ width: `${durationEp}%` }}
            ></div>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={episodeAudio.link}
        onTimeUpdate={tempUpdate}
      ></audio>
    </section>
  )
}
