export interface HomeAssistantDictionary {
  [key: string]: any;
}

export interface HomeAssistantMetadata {
  id: number;
  created_at?: string;
  provisioned?: boolean;
  data?: HomeAssistantDictionary;
}

export interface HomeAssistantEntity {
  id: number;
  created_at?: string;
  entity_id: string;
  state?: string;
  attributes?: HomeAssistantDictionary;
  last_changed?: string;
}
