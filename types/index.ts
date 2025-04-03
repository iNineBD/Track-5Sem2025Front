export interface Project {
  id: number;
  name: string;
  description: string;
  created_date: string;
  modified_date: string;
  logo_big_url: string;
  logo_small_url: string;
}

export interface CardTag {
  tag_name: string;
  qtd: number;
}

export interface CardStatus {
  status: string;
  qtd: number;
}

export interface CardUser {
  name_user: string;
  qtd: number;
}