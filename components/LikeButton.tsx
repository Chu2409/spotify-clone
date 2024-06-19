'use client'

import { useAuthModal, useUser } from '@/hooks'
import { useSessionContext } from '@supabase/auth-helpers-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

interface LikeButtonProps {
  songId: string
}

const LikeButton: React.FC<LikeButtonProps> = ({ songId }) => {
  const router = useRouter()
  const { supabaseClient } = useSessionContext()

  const { onOpen } = useAuthModal()
  const { user } = useUser()

  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    if (!user?.id) return

    const fetchData = async () => {
      const { data, error } = await supabaseClient
        .from('liked_songs')
        .select('*')
        .eq('user_id', user.id)
        .eq('song_id', songId)
        .single()

      if (!error && data) {
        setIsLiked(true)
      }
    }

    fetchData()

    return () => {
      setIsLiked(false)
    }
  }, [songId, supabaseClient, user?.id])

  const Icon = isLiked ? AiFillHeart : AiOutlineHeart

  const handleLike = async () => {
    if (!user) return onOpen()

    if (isLiked) {
      const { error } = await supabaseClient
        .from('liked_songs')
        .delete()
        .eq('user_id', user.id)
        .eq('song_id', songId)

      if (error) {
        toast.error('Failed to unlike song')
      } else {
        setIsLiked(false)
        toast.success('Song unliked')
      }
    } else {
      const { error } = await supabaseClient
        .from('liked_songs')
        .insert([{ user_id: user.id, song_id: songId }])

      if (error) {
        toast.error('Failed to like song')
      } else {
        setIsLiked(true)
        toast.success('Song liked')
      }
    }

    router.refresh()
  }

  return (
    <button className='hover:opacity-75 transition' onClick={handleLike}>
      <Icon color={isLiked ? '#22C55E' : 'white'} />
    </button>
  )
}

export default LikeButton
