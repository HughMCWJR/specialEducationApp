import * as React from "react";
import { useParams } from "react-router-dom";
import { Data } from "../../backend/data";
import { HighUtilityWord } from "../../backend/highUtilityWord";
import { useNavigate } from "react-router-dom";
import { fetchWordExamples } from "../../backend/wordnikFetcher";
import { getGradeLevelOfSentence } from "../../backend/kincaidGradeLevel";
import { Student } from "../../backend/student";

export const LessonScreen = () => {
    const [student, setStudent] = React.useState<Student>();
    const [words, setWords] = React.useState<HighUtilityWord[]>([]);
    const [currentWordIndex, setCurrentWordIndex] = React.useState<number>(0);
    const [currentExample, SetCurrentExample] = React.useState<string>("");

    let params = useParams();
    const navigate = useNavigate();

    // Due to difficulties getting easy examples, we're acting like student has grade level greater than they have.
    const readingLevelFudgeFactor = 3;

    React.useEffect(() => {

        async function setExample() {

            if (currentWordIndex - 1 === words.length) {
                navigate(-1);
                return;
            }

            if (currentWordIndex === 0)
                return;

            const currentWord = words[currentWordIndex - 1];

            let example = undefined;

            while (typeof example !== "string") {

                const possibleExamples = await fetchWordExamples(currentWord, examplesPerFetch)

                for (let possibleExample of possibleExamples) {

                    const readingGradeLevel = getGradeLevelOfSentence(possibleExample);

                    if (readingGradeLevel <= student.readingLevel + readingLevelFudgeFactor) {

                        example = possibleExample;
                        break;

                    }

                }

            }

            SetCurrentExample(example);

        }

        setExample();

        return;
    }, [currentWordIndex, navigate, student, words]);

    React.useEffect(() => {

        const localStudent = Data.getStudentByName(params.studentName);
        setStudent(localStudent);

        const words = localStudent.troubleWords;
        
        // Shuffle words
        for (let i = 0; i < words.length; i++) {

            const randomIndex = Math.round(Math.random() * words.length);

            const savedWord = words[i];
            words[i] = words[randomIndex];
            words[randomIndex] = savedWord;

        }

        setWords(words);

        setCurrentWordIndex(currentWordIndex + 1);

        // eslint-disable-next-line
    }, []);

    const examplesPerFetch = 10;
    
    return (
        <div className="Screen">
            <h1>{words !== undefined ? (words[currentWordIndex - 1] !== undefined ? words[currentWordIndex - 1].word : "") : ""}</h1>
            <h1>{currentExample}</h1>
            <button onClick={() => setCurrentWordIndex(currentWordIndex + 1)}>Next</button>
        </div>
    )
}
