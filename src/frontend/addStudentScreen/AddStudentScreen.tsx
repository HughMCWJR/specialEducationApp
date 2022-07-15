import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Data } from "../../backend/data";
import { mutate } from "../../backend/sanityMutator";
import { Student } from "../../backend/student";

export const AddStudentScreen = () => {
    const [name, setName] = React.useState<string | undefined>(undefined);
    const [readingLevel, setReadingLevel] = React.useState<number | undefined>(undefined);
    const [addingStudent, setAddingStudent] = React.useState<boolean>(false);

    const navigate = useNavigate();

    function addStudent() {

        setAddingStudent(true);

        if (name === undefined || readingLevel === undefined || Number.isNaN(readingLevel)) {
            setAddingStudent(false);
            return;
        }

        // Generate starting student trouble word list
        const words = Data.generateNewStudentWordList(readingLevel);

        mutate({
            mutations: [
                {
                create: {
                    _type: "student",
                    name: name,
                    readingLevel: readingLevel,
                    troubleWords: words,
                    masteredWords: []
                }
                },
            ],
        }).then(() => navigate(-1))

    }

    return (
        <div className="Screen">
            <div>
                <p>Name: </p>
                <input onChange={e => setName(e.target.value)} />
            </div>
            <div>
                <p>Current Reading Level: </p>
                <input onChange={e => {
                    const number = parseFloat(e.target.value);
                    setReadingLevel(number === NaN ? undefined : number);
                }} />
            </div>
            <button onClick={() => {
                if (!addingStudent) 
                    addStudent();
            }}>Add</button>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}