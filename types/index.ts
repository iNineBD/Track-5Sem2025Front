export interface Project {
  id: number;
  name: string;
  description: string;
  created_date: string;
  modified_date: string;
  finish_date: string | null;
  logo_big_url: string;
  logo_small_url: string;
}
