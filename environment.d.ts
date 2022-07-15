declare global {
    namespace NodeJS {
      interface ProcessEnv {
        REACT_APP_SANITY_PROJECT_ID: string;
        REACT_APP_SANITY_DATASET: string;
        REACT_APP_SANITY_KEY: string;
        REACT_APP_WORDNIK_KEY: string;
      }
     }
   }

export {}