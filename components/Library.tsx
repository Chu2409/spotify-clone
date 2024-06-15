'use client'

import { useAuthModal, useUploadModal, useUser } from '@/hooks'
import { Song } from '@/types'
import { AiOutlinePlus } from 'react-icons/ai'
import { TbPlaylist } from 'react-icons/tb'
import MediaItem from './MediaItem'

interface LibraryProps {
  songs: Song[]
}

const Library: React.FC<LibraryProps> = ({ songs }) => {
  const authModal = useAuthModal()
  const uploadModal = useUploadModal()

  const { user } = useUser()

  const onClick = () => {
    if (!user) return authModal.onOpen()

    return uploadModal.onOpen()
  }

  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between px-5 pt-4'>
        <div className='inline-flex items-center gap-x-2'>
          <TbPlaylist className='text-neutral-400' size={26} />

          <p className='text-neutral-400 font-medium'>Your Library</p>
        </div>

        <AiOutlinePlus
          className='text-neutral-400 cursor-pointer hover:text-white transition'
          onClick={onClick}
          size={20}
        />
      </div>

      <div className='flex flex-col gap-y-2 mt-4 px-3'>
        {songs.map((song) => (
          <MediaItem key={song.id} data={song} onClick={() => {}} />
        ))}
      </div>
    </div>
  )
}

export default Library
