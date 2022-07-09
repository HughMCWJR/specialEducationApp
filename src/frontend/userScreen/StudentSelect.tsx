import * as React from "react";
import { fetchAllStudents } from "../../backend/sanityFetcher";
import { Student } from "../../backend/student";
import { StudentButton } from "./StudentButton";

export const StudentSelect = () => {
    const [students, setStudents] = React.useState<Student[]>([]);

    React.useEffect(() => {
        fetchAllStudents().then(students => setStudents(students));
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
