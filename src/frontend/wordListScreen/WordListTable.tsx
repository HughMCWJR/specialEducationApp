import * as React from "react";
import { Student } from "../../backend/student";

type WordListTableProps = {
    student: Student
};

export const WordListTable = ({student}: WordListTableProps) => {

    const createTableRows = (): JSX.Element[] => {

        const tableRows: JSX.Element[] = [];

        for (let i = 0; i < Student.wordListLength; i++) {

            tableRows.push(
                <tr key={i}>
                    <td>{student.troubleWords.length > i ? student.troubleWords[i].word : ""}</td>
                    <td>{student.masteredWords.length > i ? student.masteredWords[i].word : ""}</td>
                </tr>
            )

        }

        return tableRows;
    }

    return (
    <table>
        <caption>Word Lists</caption>
        <thead>
            <tr>
                <th>Trouble Words</th>
                <th>Mastered Words</th>
            </tr>
        </thead>
        <tbody>
            {student !== undefined ? createTableRows() : <></>}
        </tbody>
    </table>
    );
}