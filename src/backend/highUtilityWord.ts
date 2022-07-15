import { Student } from "./student";

export function convertStringArrayToHighUtilityArray(words: string[], student: Student): HighUtilityWord[] {
    const array: HighUtilityWord[] = [];
    words.forEach((word) => array.push(new HighUtilityWord(word, student)));
    return array;
}

export function convertHighUtilityArrayToStringArray(highUtilityWords: HighUtilityWord[]): string[] {
    const array: string[] = [];
    highUtilityWords.forEach((word) => array.push(word.word));
    return array;
}

export class HighUtilityWord {

    public word: string;
    private student: Student;

    public constructor(word: string, student: Student) {
        this.word = word;
        this.student = student;
    }

}