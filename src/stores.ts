import { writable } from 'svelte/store';

import type { HomeAssistantEntities, HomeAssistantMetadata } from './types/homeassistant';

export const homeassistant_metadata = writable<HomeAssistantMetadata>();
export const homeassistant_entities = writable<Array<HomeAssistantEntities>>();
