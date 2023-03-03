import Head from "next/head";

import type {
  HomeAssistantEntities,
  HomeAssistantMetadata,
} from "@/types/homeassistant";
import { getEntities, getMetadata } from "@/lib/supabase";
import styles from "@/styles/Home.module.css";

export default function Home({
  entities,
  metadata,
}: {
  entities: Array<HomeAssistantEntities>;
  metadata: HomeAssistantMetadata;
}): JSX.Element {
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
            {entities.map(([entity_id, states]) => (
              <div key={entity_id}>
                <h3>{states[0].attributes?.friendly_name || entity_id}</h3>
                <p>
                  {`${states[0].state}${
                    states[0].attributes?.unit_of_measurement || ""
                  }`}
                  <br />({states.length} records)
                </p>
              </div>
            ))}
          </>
        ) : (
          <p>Loading...</p>
        )}
      </main>
    </>
  );
}

export async function getServerSideProps() {
  return {
    props: {
      entities: await getEntities(),
      metadata: await getMetadata(),
    },
  };
}
