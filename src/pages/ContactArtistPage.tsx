import React from 'react'
import { useParams } from 'react-router-dom'

const ContactArtistPage: React.FC = () => {
  const { artist } = useParams<{ artist: string }>()

  return (
    <div className="max-w-[900px] my-10 mx-auto px-5">
      <h1 className="text-3xl mb-5 font-bold">작가에게 문의하기</h1>
      <p className="text-gray-700 mb-3">대상 작가: {artist}</p>
      <p className="text-gray-600">채팅 및 문의 기능은 이후 연결합니다.</p>
    </div>
  )
}

export default ContactArtistPage