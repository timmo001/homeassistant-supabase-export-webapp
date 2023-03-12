import Head from "next/head";

import type { GraphValue } from "@/types/graph";
import type {
  HomeAssistantEntities,
  HomeAssistantMetadata,
} from "@/types/homeassistant";
import { getEntities, getMetadata } from "@/lib/supabase";
import Graph from "@/components/Graph";
import styles from "@/styles/Home.module.css";

export default function Home({
  entities,
  graphData,
  metadata,
}: {
  entities: Array<HomeAssistantEntities>;
  graphData: Array<Array<GraphValue>>;
  metadata: HomeAssistantMetadata;
}): JSX.Element {
  console.log({ entities, graphData, metadata });

  return (
    <>
      <Head>
        <title>Home Assistant Supabase Export</title>
        <meta name="description" content="Home Assistant Supabase Export" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <h1>Home Assistant</h1>
        {metadata?.provisioned ? (
          <>
            <h2>Metadata</h2>
            <p>
              Provisioned: {metadata.provisioned}
              <br />
              Created at: {metadata.created_at}
            </p>
          </>
        ) : (
          <p>Loading...</p>
        )}
        {entities ? (
          <>
            <h2>Entities</h2>
            {entities.map(
              ([entity_id, states]: HomeAssistantEntities, key: number) => (
                <div key={key}>
                  <h3>{states[0].attributes?.friendly_name || entity_id}</h3>
                  <p>
                    {`${states[0].state}${
                      states[0].attributes?.unit_of_measurement || ""
                    }`}
                    <br />({states.length} records)
                  </p>
                  {graphData[key].length > 0 && (
                    <Graph values={graphData[key]} />
                  )}
                </div>
              )
            )}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  const entities = await getEntities(),
    graphData = entities.map(([entity_id, states]): Array<GraphValue> => {
      if (!states || Number(states[0].state) < 0) return [];
      return states.map((state) => ({
        date: state.last_changed,
        value: Number(state.state),
      }));
    });

  return {
    props: {
      entities,
      graphData,
      metadata: await getMetadata(),
    },
  };
}
