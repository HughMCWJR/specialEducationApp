import { fetchStudentById } from "./sanityFetcher";

export type WordCategory = {
    name: "mastered" | "trouble",
    words: string[]
};

export type StudentProps = {
    name: string,
    id: string,
    readingLevel: number,
    masteredWords: WordCategory,
    troubleWords: WordCategory
};

export class Student {

    public name: string;
    public id: string;
    private readingLevel: number;

    private masteredWords: WordCategory;
    private troubleWords: WordCategory;

    public constructor(props: StudentProps) {

        this.name = props.name;
        this.id = props.id;
        this.readingLevel = props.readingLevel;
        this.masteredWords = props.masteredWords;
        this.troubleWords = props.troubleWords;

    }

    public async createWithId(id: string): Promise<Student> {

        return await fetchStudentById(id);

    }

}