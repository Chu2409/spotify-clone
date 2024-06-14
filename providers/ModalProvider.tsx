'use client'

import { AuthModal, UploadModal } from '@/components'
import { useEffect, useState } from 'react'

const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) return null

  return (
    <>
      <AuthModal />
      <UploadModal />
    </>
  )
}

export default ModalProvider
