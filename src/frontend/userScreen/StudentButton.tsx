import * as React from "react";
import { mutate } from "../../backend/sanityMutator";
import { Student } from "../../backend/student";
import { useNavigate } from "react-router-dom";

type StudentButtonProps = {
    student: Student
};

export const StudentButton = ({student}: StudentButtonProps) => {

    function deleteThisStudent() {

        mutate({
            mutations: [
                {
                delete: {
                    id: student.id,
                },
                },
            ],
        }).then(() => window.location.reload());

    }

    const navigate = useNavigate();

    return (
    <div>
        <button onClick={() => {navigate(student.name)}}>{student.name}</button>
        <button onClick={deleteThisStudent}>Delete</button>
    </div>
    );
}