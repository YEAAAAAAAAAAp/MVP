import React from 'react'

const ArtistPage: React.FC = () => {
  return (
    <div className="py-8 px-4 max-w-7xl mx-auto">
      <h1 className="text-blue-600 mb-8 text-center text-4xl font-bold">
        아티스트 대시보드
      </h1>
      
      <section className="bg-gray-50 p-8 rounded-xl mb-8">
        <h2 className="text-2xl font-semibold mb-6">아티스트를 위한 기능</h2>
        <ul className="list-none grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 m-0 p-0">
          <li className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-blue-600 mb-3 text-xl font-semibold">
              포트폴리오 최적화
            </h3>
            <p className="text-gray-700">
              포트폴리오를 쉽게 제작하고 스토리를 효과적으로 전달할 수 있습니다.
            </p>
          </li>
          <li className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-blue-600 mb-3 text-xl font-semibold">
              거래 관리
            </h3>
            <p className="text-gray-700">
              작품 판매부터 배송까지, 모든 거래 과정을 체계적으로 관리하고 분석할 수 있습니다.
            </p>
          </li>
          <li className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-blue-600 mb-3 text-xl font-semibold">
              고객 관계 관리
            </h3>
            <p className="text-gray-700">
              콜렉터와의 소통을 통해 지속적인 관계를 구축할 수 있습니다.
            </p>
          </li>
        </ul>
      </section>
    </div>
  )
}

export default ArtistPage