export interface Artwork {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  price?: number;
  isAIMatch?: boolean; // 물음표 액자인지 구분
}

export interface Artist {
  id: string;
  name: string;
  bio: string;
  profileImage: string;
  artworks: Artwork[];
}

export interface User {
  id: string;
  name: string;
  email: string;
  type: 'artist' | 'collector';
  profileImage?: string;
}