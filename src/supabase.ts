import { SUPABASE_URL, SUPABASE_KEY } from '$env/static/private';
import { createClient } from '@supabase/supabase-js';

import type { HomeAssistantEntity, HomeAssistantMetadata } from './types/homeassistant';
import { homeassistant_entities, homeassistant_metadata } from './stores';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export async function getMetadata(): Promise<void> {
	const { data: homeassistant_metadata_response } = await supabase
		.from('homeassistant_metadata')
		.select('*')
		.single();
	homeassistant_metadata.set(homeassistant_metadata_response as unknown as HomeAssistantMetadata);
}

export async function getEntities(): Promise<void> {
	const { data: homeassistant_entities_response } = await supabase
		.from('homeassistant_entities')
		.select('*')
		.order('created_at', { ascending: false });
	const homeassistant_entities_per_entity = homeassistant_entities_response?.reduce(
		(entities, entity) => {
			if (entities[entity.entity_id]) {
				entities[entity.entity_id].push(entity);
			} else {
				entities[entity.entity_id] = [entity];
			}
			return entities;
		},
		{} as Record<string, Array<HomeAssistantEntity>>
	);

	homeassistant_entities.set(
		homeassistant_entities_per_entity
			? Object.entries(homeassistant_entities_per_entity).sort(([oldId], [newId]) =>
					oldId.localeCompare(newId)
			  )
			: []
	);
}
