import { createClient } from "@supabase/supabase-js";

import type {
  HomeAssistantEntities,
  HomeAssistantEntity,
  HomeAssistantMetadata,
} from "../types/homeassistant";

export const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
);

export async function getMetadata(): Promise<HomeAssistantMetadata> {
  const { data: homeassistant_metadata_response } = await supabase
    .from("homeassistant_metadata")
    .select("*")
    .single();
  return homeassistant_metadata_response as unknown as HomeAssistantMetadata;
}

export async function getEntities(): Promise<Array<HomeAssistantEntities>> {
  const { data: homeassistant_entities_response } = await supabase
    .from("homeassistant_entities")
    .select("*")
    .order("created_at", { ascending: false });
  const homeassistant_entities_per_entity =
    homeassistant_entities_response?.reduce((entities, entity) => {
      if (entities[entity.entity_id]) {
        entities[entity.entity_id].push(entity);
      } else {
        entities[entity.entity_id] = [entity];
      }
      return entities;
    }, {} as Record<string, Array<HomeAssistantEntity>>);

  return homeassistant_entities_per_entity
    ? (Object.entries(homeassistant_entities_per_entity).sort(
        ([oldId], [newId]) => oldId.localeCompare(newId)
      ) as Array<HomeAssistantEntities>)
    : [];
}
