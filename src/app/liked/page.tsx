import { getLikedSongs } from "@/actions/actions"
import Header from "@/components/Header"
import Image from "next/image"
import LikedContent from "./components/LikedContent"


export const revalidate = 0
const LikedPage = async () => {
    const songs = await getLikedSongs()
  return (
    <div  className="bg-neutral-900 rounded-lg h-full w-full overflow-hidden overflow-y-auto"
    >
        <Header>
            <div className="mt-20">
                <div className="flex flex-col md:flex-row items-center gap-x-5">
                    <div className="relative rounded-lg h-10 w-10 lg:h-24 lg:w-24">
                        <Image fill src={"/images/liked.png"} alt="playlist" className="object-cover rounded-lg"/>
                    </div>
                    <div className="flex flex-col gap-y-2 mt-4 md:mt-0">
                        <p className="hidden md:block font-semibold text-sm">
                            Playlist
                        </p>
                        <h1 className="text-white text-xl sm:text-2xl lg:text-4xl font-bold">Liked Songs</h1>
                    </div>
                </div>
            </div>
        </Header> 
        <LikedContent songs={songs}/>
    </div>
  )
}

export default LikedPage