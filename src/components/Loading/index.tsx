import Image from 'next/image'

export default function Loading() {
  return (
    <div className="w-screen h-[calc(100vh-240px)]  bg-white fixed z-10 flex justify-center items-center">
      <Image
        className="animate-pulse transition-transform delay-1000"
        width={260}
        height={74}
        alt="icone da tela de carregamento"
        src={'/assets/Loading.svg'}
      />
    </div>
  )
}
