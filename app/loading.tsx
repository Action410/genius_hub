import Image from 'next/image'

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <div className="animate-pulse">
        <Image
          src="/assets/genius-data-hub-logo.png"
          alt="Genius Data Hub"
          width={160}
          height={64}
          className="w-40 h-auto object-contain drop-shadow-xl"
        />
      </div>
    </div>
  )
}
