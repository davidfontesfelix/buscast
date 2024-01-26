import { MyContextAPIRequest } from '@/contexts/APIRequestContext'
import { MyContextAutoPlay } from '@/contexts/autoPlayContext'
import axios from 'axios'
import Image from 'next/image'
import {
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react'

interface playerProps {
  audioId: number
  setAudioId: Dispatch<SetStateAction<number>>
  playOrPause: string
  setPlayOrPause: Dispatch<SetStateAction<string>>
}

type episode = {
  id?: string
  title?: string
  link?: string
  date?: string
}

export default function Player(props: playerProps) {
  const [audioInformation, setAudioInformation] = useState<episode>({})
  const [episodeDuration, setEpisodeDuration] = useState(0)
  const [buttonDisabled, setButtonDisabled] = useState(true)
  const { episodesData } = useContext(MyContextAPIRequest)

  const audioRef = useRef<HTMLAudioElement>(null)
  const audio = audioRef.current

  const { autoPlay, setAutoPlay } = useContext(MyContextAutoPlay)
  useEffect(() => {
    setAudioInformation(episodesData[props.audioId - 1])
  }, [episodesData, props.audioId])

  useEffect(() => {
    audio?.play()
    setTimeout(() => {
      setAutoPlay(false)
      audio?.play()
    }, 200)
  }, [audio, autoPlay, setAutoPlay])

  useEffect(() => {
    if (props.audioId > 0) {
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
    if (props.audioId === 2) {
      audio?.play()
    } else {
      props.setAudioId(props.audioId + 1)
    }
    setTimeout(() => {
      props.setPlayOrPause('pause')
      audio?.play()
    }, 200)
  }
  const HandleClickPreviousEpisode = () => {
    if (props.audioId === 1) {
      audio?.play()
    } else {
      props.setAudioId(props.audioId - 1)
    }
    setTimeout(() => {
      props.setPlayOrPause('pause')
      audio?.play()
    }, 200)
  }
  const tempUpdate = () => {
    if (audio != null) {
      setEpisodeDuration(Math.floor((audio.currentTime / audio.duration) * 100))

      if (audio.currentTime === audio.duration) {
        props.setPlayOrPause('play')
      }
    }
  }
  return (
    <section className="w-full h-full lg:w-[65vw] pb-10 flex justify-center items-center dark:bg-Dark dark:border-none">
      <div className="flex flex-col items-center">
        <div className="bg-Blue rounded w-[332px] h-[332px] lg:w-[60vw] lg:h-[70vh] relative">
          <h1 className=" text-white text-7xl absolute bottom-8 left-7 font-bold">
            Episódio Piloto
          </h1>
        </div>
        <div className="flex flex-col items-center lg:flex-col-reverse">
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
                  props.audioId === 0 && 'grayscale'
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
            <div className="w-[332px] h-[10px] bg-[#B3B3B3] rounded-[100px] lg:w-[60vw]">
              <div
                className={`h-full bg-BlueLight rounded-[100px] transition-all`}
                style={{ width: `${episodeDuration}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <audio
        ref={audioRef}
        src={audioInformation?.link}
        onTimeUpdate={tempUpdate}
      ></audio>
    </section>
  )
}
