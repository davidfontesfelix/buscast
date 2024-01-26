import React, { createContext, useState } from 'react'

type Episode = {
  id: number
  title: string
  link: string
  date: string
  temp: string
}

type MyContextAPIRequestProps = {
  episodesData: Episode[]
  setEpisodesData: React.Dispatch<React.SetStateAction<Episode[]>>
}

const MyContextAPIRequest = createContext<MyContextAPIRequestProps | any>(
  undefined,
)

type MyContextProviderProps = {
  children: React.ReactNode
}

const MyContextAPIRequestProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [episodesData, setEpisodesData] = useState<Episode[]>([])

  return (
    <MyContextAPIRequest.Provider value={{ episodesData, setEpisodesData }}>
      {children}
    </MyContextAPIRequest.Provider>
  )
}

export { MyContextAPIRequest, MyContextAPIRequestProvider }
