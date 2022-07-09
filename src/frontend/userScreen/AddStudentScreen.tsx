import * as React from "react";
import { useNavigate } from "react-router-dom";
import { mutate } from "../../backend/sanityMutator";

export const AddStudentScreen = () => {
    const [nameState, setNameState] = React.useState<string | undefined>(undefined);
    const [readingLevelState, setReadingLevelState] = React.useState<number | undefined>(undefined);
    const [addingStudentState, setAddingStudentState] = React.useState<boolean>(false);

    const navigate = useNavigate();

    function addStudent() {

        setAddingStudentState(true);

        if (nameState === undefined || readingLevelState === undefined || Number.isNaN(readingLevelState)) {
            setAddingStudentState(false);
            return;
        }

        // TO DO
        // Add code to generate starting word list

        mutate({
            mutations: [
                {
                create: {
                    _type: "student",
                    name: nameState,
                    readingLevel: readingLevelState,
                }
                },
            ],
        }).then(() => navigate(-1))

    }

    return (
        <div className="Screen">
            <div>
                <p>Name: </p>
                <input onChange={e => setNameState(e.target.value)} />
            </div>
            <div>
                <p>Current Reading Level: </p>
                <input onChange={e => {
                    const number = parseInt(e.target.value);
                    setReadingLevelState(number === NaN ? undefined : number);
                }} />
            </div>
            <button onClick={() => {
                if (!addingStudentState) 
                    addStudent();
            }}>Add</button>
        </div>
    )
}