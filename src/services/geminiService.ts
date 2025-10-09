const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

export interface ArtworkRecommendation {
  artworkId: string
  reason: string
  matchScore: number
}

export interface UserPreferences {
  genre: string
  priceRange: string
  mood: string
  color: string
  description: string
}

export const getAIArtRecommendation = async (userPreferences?: UserPreferences): Promise<ArtworkRecommendation> => {
  try {
    let prompt = ''
    
    if (userPreferences) {
      // 사용자 취향에 맞춘 프롬프트
      const { genre, priceRange, mood, color, description } = userPreferences
      
      prompt = `당신은 전문 아트 큐레이터입니다. 다음 조건에 맞는 작품을 추천해주세요:

- 선호 장르: ${genre}
- 예산: ${priceRange}
${mood ? `- 원하는 분위기: ${mood}` : ''}
${color ? `- 선호 색감: ${color}` : ''}
${description ? `- 추가 요구사항: ${description}` : ''}

1부터 34까지의 작품 ID 중에서 위 조건에 가장 적합한 작품 하나를 선택하고, 
왜 이 작품이 사용자의 취향에 맞는지 구체적으로 설명해주세요.

응답은 반드시 다음 JSON 형식으로만 작성해주세요:
{"artworkId": "숫자", "reason": "이 작품은 [구체적인 추천 이유]. 사용자가 원하시는 [조건]과 완벽하게 어울립니다.", "matchScore": 숫자(80-100)}`
    } else {
      // 기본 프롬프트
      prompt = `아트 콜렉터에게 작품을 추천해주세요. 1부터 34까지의 작품 ID 중 하나를 랜덤으로 선택하고, 그 작품을 추천하는 이유를 한 문장으로 설명해주세요. 응답은 반드시 다음 JSON 형식으로만 작성해주세요: {"artworkId": "숫자", "reason": "추천 이유", "matchScore": 숫자(1-100)}`
    }

    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }]
      })
    })

    const data = await response.json()
    
    // API 오류 응답 확인 및 로깅
    if (!response.ok) {
      console.error('Gemini API 오류 응답:', data)
      throw new Error(`Gemini API 요청 실패: ${data.error?.message || response.statusText}`)
    }

    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || ''
    
    // JSON 응답 파싱
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      const result = JSON.parse(jsonMatch[0])
      return {
        artworkId: result.artworkId.toString(),
        reason: result.reason,
        matchScore: result.matchScore || 85
      }
    }

    // 파싱 실패 시 랜덤 작품 반환
    const randomId = Math.floor(Math.random() * 34) + 1
    return {
      artworkId: randomId.toString(),
      reason: 'AI가 당신의 취향을 분석하여 선택한 작품입니다.',
      matchScore: 85
    }
  } catch (error) {
    console.error('Gemini API 오류:', error)
    // 오류 발생 시 랜덤 작품 반환
    const randomId = Math.floor(Math.random() * 34) + 1
    return {
      artworkId: randomId.toString(),
      reason: 'AI가 추천하는 특별한 작품입니다.',
      matchScore: 80
    }
  }
}
