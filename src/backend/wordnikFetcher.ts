import fetch from "node-fetch";

async function fetchFromWordnikWithQuery(word: string, query: string): Promise<any> {

    // Compose the URL for your project's endpoint and add the query
    let URL = `https://api.wordnik.com/v4/word.json/${word}/${query}&api_key=${process.env.REACT_APP_WORDNIK_KEY}`;

    // fetch the content
    return await fetch(URL)
    .then((res) => res.json())
    .catch((err) => console.error(err));

}

export async function fetchWordExamples(word: string, numberOfExamples: number): Promise<string[]> {

    const exampleTexts: string[] = [];

    const { examples } = await fetchFromWordnikWithQuery(word, `examples?limit=${numberOfExamples}`);
    if (examples === undefined)
        return;

    for (const example of examples)
        exampleTexts.push(example.text);

    return exampleTexts;

}