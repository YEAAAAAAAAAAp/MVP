import React from 'react'

const CollectorPage: React.FC = () => {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-blue-600 mb-8 text-center text-4xl font-bold">
        콜렉터 페이지
      </h1>
      
      <section className="bg-gray-50 p-8 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold mb-6">콜렉터를 위한 기능</h2>
        <ul className="list-none grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 m-0 p-0">
          <li className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-amber-500 mb-3 text-xl font-semibold">
              AI 기반 작품 탐색
            </h3>
            <p className="text-gray-700">
              AI가 추천하는 맞춤형 작품과 아티스트의 스토리를 탐색할 수 있습니다.
            </p>
          </li>
          <li className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-amber-500 mb-3 text-xl font-semibold">
              진품 보장 거래
            </h3>
            <p className="text-gray-700">
              진품 인증과 가격 정보를 제공하여 안심하고 거래할 수 있습니다.
            </p>
          </li>
          <li className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-amber-500 mb-3 text-xl font-semibold">
              아티스트 직접 소통
            </h3>
            <p className="text-gray-700">
              내부 채팅 기능으로 아티스트와 직접 소통하며 맞춤형 견적을 받을 수 있습니다.
            </p>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default CollectorPage