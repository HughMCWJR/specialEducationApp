import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Data } from "../../backend/data";
import { Student } from "../../backend/student";
import { StudentSelect } from "../userScreen/StudentSelect";
import { WordListTable } from "./WordListTable";

export const WordListScreen = () => {
    const [student, setStudent] = React.useState<Student>();

    let params = useParams();
    let navigate = useNavigate();

    React.useEffect(() => {
        const student = Data.getStudentByName(params.studentName);
        setStudent(student);
    }, [])
    
    return (
        <div className="Screen">
            <WordListTable student={Data.getStudentByName(params.studentName)} />
            <button onClick={() => student.refreshWordList()}>Refresh Words</button>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}
