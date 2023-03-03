<script lang="ts">
	import { getEntities, getMetadata } from '../supabase';
	import { homeassistant_entities, homeassistant_metadata } from '../stores';

	getEntities();
	getMetadata();
</script>

<div class="container">
	<h1>Home Assistant</h1>
	{#if $homeassistant_metadata}
		<h2>Metadata</h2>
		<p>
			Provisioned: {$homeassistant_metadata?.provisioned}
			<br />
			Created at: {$homeassistant_metadata?.created_at}
		</p>
	{:else}
		<p>Loading...</p>
	{/if}
	{#if $homeassistant_entities}
		<h2>Entities</h2>
		{#each $homeassistant_entities as [entity_id, states]}
			<div>
				<h3>{states[0].attributes?.friendly_name || entity_id}</h3>
				<p>
					{`${states[0].state}${states[0].attributes?.unit_of_measurement || ''}`}
					<br />({states.length} records)
				</p>
			</div>
		{/each}
	{:else}
		<p>Loading...</p>
	{/if}
</div>

<style lang="css">
	h2 {
		margin: 0.6rem 0;
	}
	h3 {
		margin: 0.6rem 0 0;
	}
	p {
		margin: 0.1rem 0;
	}
	.container {
		display: flex;
		flex-direction: column;
		margin: 0 auto;
		width: calc(100% - 80rem);
	}
</style>
