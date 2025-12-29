export interface Vote {
  id?: string;
  name: string;
  numbers: number[];
  createdAt: string;
  bolaoId?: string;
}

export interface Bolao {
  id?: string;
  name: string;
  password: string;
  createdAt: string;
  createdBy: string;
  participants?: number;
}

export interface GameConfig {
  size: number;
  quantity: number;
}

export interface NumberFrequency {
  number: number;
  count: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface VotesResponse {
  success: boolean;
  votes: Vote[];
}

export interface VoteResponse {
  success: boolean;
  vote: Vote;
}

export interface BolaoResponse {
  success: boolean;
  bolao: Bolao;
}

export interface BolaosResponse {
  success: boolean;
  bolaos: Bolao[];
}
