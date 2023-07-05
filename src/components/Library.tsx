"use client"
import {TbPlaylist} from 'react-icons/tb'
import {AiOutlinePlus} from  'react-icons/ai'
import { useAuthModal } from '@/hooks/useAuthModal'
import { useUser } from '@/hooks/useUser'
import { useUploadModal } from '@/hooks/useUploadModal'
import { Song } from '@/types/types'
import MediaItem from './MediaItem'
import { useOnPlay } from '@/hooks/useOnPlay'
import { useSubscribeModal } from '@/hooks/useSubscribeModal'

type LibraryProps  = {
    userSongs: Song[]
}
const Library = ({userSongs}: LibraryProps) => {
    const subscribeModal =useSubscribeModal()
    const authModal = useAuthModal()
    const uploadModal = useUploadModal()
    const {user, subscription} = useUser()
    const onPlay = useOnPlay(userSongs)
    const onClick = () => {
        if(!user) return authModal.onOpen()
        if(!subscription) return  subscribeModal.onOpen()        
        return uploadModal.onOpen()
    }
  return (
    <div className="flex flex-col">
        <div className="flex items-center justify-between px-5 pt-4">
            <div className="inline-flex items-center gap-x-2">
                <TbPlaylist size={26} className='text-neutral-400'/>
                <p className='text-neutral-400 font-medium text-base'>Your Library</p>
            </div>
            <AiOutlinePlus onClick={onClick} size={20}
            className='text-neutral-400 cursor-pointer hover:text-white transition'/>
        </div>
        <div className='flex flex-col gap-y-2 mt-4 px-3 '>
           {
            userSongs.map(song => (
               <MediaItem
               onClick={(id: string) => onPlay(id)}
               key={song.id}
               song={song}
               />
            ))
           }
        </div>
    </div>
  )
}

export default Library