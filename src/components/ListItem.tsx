"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import {FaPlay} from 'react-icons/fa'
type ListItemProps = {
    image: string,
    name: string,
    href: string,
}
const ListItem = ({image, name, href}: ListItemProps) => {
    const router = useRouter()
    const onClick = () => {
        router.push(href)
    }
  return (
    <button onClick={onClick} className="relative group flex items-center rounded-md overflow-hidden gap-x-4
    bg-neutral-100/10 hover:bg-neutral-100/20 transition pr-4">
        <div className="relative min-h-[79px] min-w-[64px]">
            <Image src={image} alt="Liked" className="object-cover" fill />
        </div>
        <p className="font-medium truncate py-5">
            {name}
        </p>
        <div className="absolute transition opacity-0 rounded-full flex justify-center items-center
        bg-green-500 drop-shadow-md p-4 right-5 group-hover:opacity-100 hover:scale-110">
            <FaPlay className="text-black"/>
        </div>
    </button>
  )
}

export default ListItem