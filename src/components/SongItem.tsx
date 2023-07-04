"use client"

import { useLoadImage } from "@/hooks/useLoadImage"
import { Song } from "@/types/types"
import Image from "next/image"
import PlayButton from "./PlayButton"

type SongItemProps = {
    song: Song,
    onClick: (id: string) => void
}
const SongItem = ({song, onClick}: SongItemProps) => {
    const imagePath = useLoadImage(song)
  return (
    <div onClick={() => onClick(song.id)} className="relative group items-center justify-center
    flex flex-col  rounded-md overflow-hidden gap-x-4 bg-neutral-400/5
    cursor-pointer hover:bg-neutral-400/10 transition p-3">
        <div className="relative aspect-square w-full h-full rounded-md overflow-hidden
        ">
            <Image src={imagePath || '/images/liked.png'} alt="song-image" className="object-cover"
            fill/>
        </div>
        <div className="flex flex-col items-start w-full pt-4 gap-y-1">
            <p className="font-semibold truncate w-full">
                {song.title}
            </p>
            <p className="text-neutral-400 text-sm pb-4 w-full truncate">
                By {song.author}
            </p> 
        </div>
        <div className="absolute bottom-24 right-5">
            <PlayButton/>
        </div>
    </div>
  )
}

export default SongItem