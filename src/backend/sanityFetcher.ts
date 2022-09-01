import fetch from "node-fetch";
import { Student } from "./student";

export async function fetchFromSanityWithQuery(query: string): Promise<any> {

    // Compose the URL for your project's endpoint and add the query
    let URL = `https://${process.env.REACT_APP_SANITY_PROJECT_ID}.api.sanity.io/v2021-10-21/data/query/${process.env.REACT_APP_SANITY_DATASET}?query=${query}`;

    // fetch the content
    return await fetch(URL)
    .then((res) => res.json())
    .catch((err) => console.error(err));

}

export async function fetchAllStudents(): Promise<Student[]> {

    const studentIds = await fetchStudentIds();

    const students: Student[] = [];
    for (const id of studentIds) {

        const student = await fetchStudentById(id);
        if (student)
            students.push(student);

    }

    return students;

}

async function fetchStudentIds(): Promise<string[]> {

    const studentIds: string[] = [];

    const query = encodeURIComponent(`*[_type == "student"]`);

    const { result } = await fetchFromSanityWithQuery(query);
    if (result === undefined)
        return;

    for (const student of result) {

        const id = student._id;
        if (typeof id === "string")
            studentIds.push(id);

    }    

    return studentIds;    

}

export async function fetchStudentById(id: string): Promise<Student | undefined> {

    const query = encodeURIComponent(`*[_type == "student" && _id == "${id}"]`);

    const { result } = await fetchFromSanityWithQuery(query);
    if (result === undefined)
        return;

    const student = result[0];
    if (student === undefined)
        return;

    const studentName = student.name;
    if (typeof studentName !== "string")
        return;
    const studentReadingLevel = student.readingLevel;
    if (typeof studentReadingLevel !== "number")
        return;
    const studentMasteredWords: string[] = student.masteredWords;
    const studentTroubleWords: string[] = student.troubleWords;

    return new Student({
        name: studentName,
        id,
        readingLevel: studentReadingLevel,
        masteredWords: studentMasteredWords,
        troubleWords: studentTroubleWords
    });

}