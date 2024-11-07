export interface TokenInfoAttributesInterface {
  division?: number;
  total_tokens?: number;
  assigned_tokens?: number;
  burning_percentage?: number;
  name: string;
  photo?: string;
  age: number;
  goals?: number;
  assists_goals?: number;
  position?: string;
  games?: number;
  minutes_played?: number;
  cards_yellow?: number;
  cards_red?: number;
  achievements?: Array<{
    league: string;
    country: string;
    season: string;
    place: string;
    porcentage: string;
  }>;
  apiId?: string;
}
