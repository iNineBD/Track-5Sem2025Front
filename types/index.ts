export interface Project {
  id_project: number;
  name_project: string;
  description: string;
  avatar?: string;
}

export interface ProjectOption {
  id: number | null;
  label: string;
  description: string;
}

export interface CardStatusItem {
  status: string;
  qtd: number;
}

export interface CardTagItem {
  tag_name: string;
  qtd: number;
}

export interface CardUserItem {
  name_user: string;
  qtd: number;
}

export interface ReworksCard {
  card_name: string;
  qtd_rework: number;
}

export interface StartedCards {
  name_project: string;
  qtd_cards_started: number;
}

export interface FinishedCard {
  name_project: string;
  qtd_cards_finished: number;
}

export interface ExecutionCard {
  name_card: string;
  time_execution: string;
}

export interface ProjectStatistics {
  card_status: CardStatusItem[];
  card_tag?: CardTagItem[];
  card_user?: CardUserItem[];
  reworks_cards?: ReworksCard[];
  started_cards?: StartedCards[];
  finished_cards?: FinishedCard[];
  execution_cards?: ExecutionCard[];
}
