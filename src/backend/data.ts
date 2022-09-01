import { fetchAllStudents, fetchFromSanityWithQuery } from "./sanityFetcher";
import { Student } from "./student";

export class Data {

    static wordListMap = new Map<number, string[]>();
    static students: Student[] = [];

    static async fetchStudents(): Promise<void> {

        Data.students = await fetchAllStudents();

    }

    static getStudentByName(name: string): Student | undefined {

        for (const student of Data.students) {

            if (student.name === name)
                return student

        }

        return undefined;

    }

    static generateNewStudentWordList(readingLevel: number): string[] | undefined {

        // Round reading level so that >0.8 goes up
        const intReadingLevel = Math.floor(readingLevel + 0.2);

        if (intReadingLevel < 1 || intReadingLevel > 8)
            return undefined;

        const wordList = Data.wordListMap.get(intReadingLevel);

        // Chooose starting words
        const words: string[] = [];
        while (words.length < Student.wordListLength - 1) {

            const randomIndex = Math.floor(Math.random() * wordList.length);
            if (words.findIndex((word) => word === wordList[randomIndex]) !== -1)
                continue;

            words.push(wordList[randomIndex]);

        }

        return words;

    }
    
    static async fetchWordLists(): Promise<void> {

        const query = encodeURIComponent(`*[_type == "wordList"]`);

        const { result } = await fetchFromSanityWithQuery(query);
        if (result === undefined)
            return;

        for (const wordList of result) {

            const readingLevel = wordList.readingLevel;
            if (typeof readingLevel !== "number") {
                console.log("Error fetching word list, could not get reading level");
                continue;
            }

            const wordsImported = wordList.words;
            const words: string[] = [];
            for (const word of wordsImported) {

                if (typeof word !== "string") {
                    console.log("Error fetching word list, could not get words");
                    continue;
                }

                words.push(word);

            }

            Data.wordListMap.set(readingLevel, words);

        }     

    }

}