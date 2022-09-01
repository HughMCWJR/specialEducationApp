import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Data } from "../../backend/data";
import { Student } from "../../backend/student";
import { WordListTable } from "./WordListTable";

export const WordListScreen = () => {
    const [updaterVal, setUpdaterVal] = React.useState(0);
    const [student, setStudent] = React.useState<Student>();

    let params = useParams();
    let navigate = useNavigate();

    React.useEffect(() => {
        const student = Data.getStudentByName(params.studentName);
        setStudent(student);
    }, [params.studentName])

    function reload() {
        setUpdaterVal(updaterVal + 1);
    }
    
    return (
        <div className="Screen">
            <WordListTable student={Data.getStudentByName(params.studentName)} />
            <button onClick={() => {student.refreshWordList(); reload();}}>Refresh Words</button>
            <button onClick={() => navigate(-1)}>Back</button>
        </div>
    )
}

