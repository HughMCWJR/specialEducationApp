import * as React from "react";
//import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import { MainScreen } from "./frontend/mainScreen/MainScreen";
import { UserScreen } from "./frontend/userScreen/UserScreen";
import { StudentScreen } from "./frontend/studentScreen/StudentScreen";
import { AddStudentScreen } from "./frontend/addStudentScreen/AddStudentScreen";
import { WordListScreen } from "./frontend/wordListScreen/WordListScreen";
import { Data } from "./backend/data";
import { LessonScreen } from "./frontend/lessonScreen/LessonScreen";

function App() {

    Data.fetchWordLists();

    return (
        <Router>
            <Routes>
                <Route path='/' element={<MainScreen />} />
                <Route path=":userName" element={<UserScreen/>} />
                <Route path=":userName/:studentName" element={<StudentScreen/>} />
                <Route path=":userName/:studentName/wordList" element={<WordListScreen/>} />
                <Route path=":userName/:studentName/lesson" element={<LessonScreen />} />
                <Route path=":userName/addStudent" element={<AddStudentScreen />} />
            </Routes>
        </Router>
    );
}

export default App;

/*

            <div className="App">
                <header className="App-header">
                    <p>
                        Edit <code>src/App.js</code> and save to reload.
                    </p>
                    <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Learn React
                    </a>
                </header>
            </div>
*/
