import { Data } from "./data";
import { convertHighUtilityArrayToStringArray, convertStringArrayToHighUtilityArray, HighUtilityWord } from "./highUtilityWord";
import { fetchStudentById } from "./sanityFetcher";
import { mutate } from "./sanityMutator";

export type StudentProps = {
    name: string,
    id: string,
    readingLevel: number,
    masteredWords: string[],
    troubleWords: string[]
};

export class Student {

    public name: string;
    public id: string;
    private readingLevel: number;

    public masteredWords: HighUtilityWord[];
    public troubleWords: HighUtilityWord[];

    static wordListLength: number = 10;

    public constructor(props: StudentProps) {

        this.name = props.name;
        this.id = props.id;
        this.readingLevel = props.readingLevel;
        this.masteredWords = convertStringArrayToHighUtilityArray(props.masteredWords, this); 
        this.troubleWords = convertStringArrayToHighUtilityArray(props.troubleWords, this); 

    }

    public async createWithId(id: string): Promise<Student> {

        return await fetchStudentById(id);

    }

    public refreshWordList(): void {

        this.masteredWords = [];
        this.troubleWords = convertStringArrayToHighUtilityArray(Data.generateNewStudentWordList(this.readingLevel), this);
        this.updateServerWordLists();

    }

    private updateServerWordLists(): void {

        mutate({
            mutations: [
                {
                patch: {
                    id: this.id,
                    set: {
                        masteredWords: convertHighUtilityArrayToStringArray(this.masteredWords),
                        troubleWords: convertHighUtilityArrayToStringArray(this.troubleWords)
                    }
                }
                },
            ],
        });

    }

}