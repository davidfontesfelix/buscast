import React, { createContext, useState } from 'react'

type MyContextAutoPlayProps = {
  pause: boolean
  setPause: React.Dispatch<React.SetStateAction<boolean>>
}

const MyContextAutoPlay = createContext<MyContextAutoPlayProps | any>(undefined)

type MyContextProviderProps = {
  children: React.ReactNode
}

const MyContextAutoPlayProvider: React.FC<MyContextProviderProps> = ({
  children,
}) => {
  const [autoPlay, setAutoPlay] = useState(false)

  return (
    <MyContextAutoPlay.Provider value={{ autoPlay, setAutoPlay }}>
      {children}
    </MyContextAutoPlay.Provider>
  )
}

export { MyContextAutoPlay, MyContextAutoPlayProvider }
