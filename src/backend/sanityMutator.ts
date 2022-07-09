// import fetch from "node-fetch";

type MutationType = {
  mutations: any[];
}

export async function mutate(mutations: MutationType) {
  const result = await fetch(
    `https://${process.env.REACT_APP_SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/data/mutate/${process.env.REACT_APP_SANITY_DATASET}`,
    {
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${process.env.REACT_APP_SANITY_KEY}`,
      },
      body: JSON.stringify(mutations),
      method: "POST",
    }
  );

  const json = await result.json();
  return json;
}

// Example
/*
const mutations = {
  mutations: [
    {
      patch: {
        id: "373a5de5-3d0e-4146-bbaa-1a38a26a447d",
        set: {
          '[_id == "373a5de5-3d0e-4146-bbaa-1a38a26a447d"].alternatives[17].title.nn':
            "Noreg",
        },
      },
    },
  ],
};

mutate(mutations);
*/