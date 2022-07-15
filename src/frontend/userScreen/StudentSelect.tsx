import * as React from "react";
import { Data } from "../../backend/data";
import { fetchAllStudents } from "../../backend/sanityFetcher";
import { Student } from "../../backend/student";
import { StudentButton } from "./StudentButton";

export const StudentSelect = () => {
    const [students, setStudents] = React.useState<Student[]>([]);

    React.useEffect(() => {
        Data.fetchStudents().then(() => setStudents(Data.students));
    }, [])

    const createStudentButton = (student: Student) => {
        return <StudentButton key={student.id} student={student} />
    }

    return (
        <div>
            {students.map(createStudentButton)} 
        </div>
    )
}
