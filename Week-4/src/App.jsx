import { useState } from "react";
import StudentList from "./StudentList";


// React is a JavaScript library used to build user interfaces.


// Function Component

function App() {

    // State stores data that can change.

    const [count, setCount] = useState(0);

    const [name, setName] = useState("Mustafa");


    // Increase Count

    function increase() {
        setCount(count + 1);
    }


    // Change Name

    function changeName() {
        setName("Ali");
    }


    return (

        // JSX must return one parent element.

        <div>

            <h1>React Basics</h1>

            {/* JavaScript is written inside {} */}

            <h2>Hello {name}</h2>

            <p>Count : {count}</p>

            {/* onClick calls a function */}

            <button onClick={increase}>Increase</button>

            <button onClick={changeName}>Change Name</button>

            {/* Reusable Component */}

            <Student
                studentName="Ahmed"
                semester="Final Year"
            />

            <Student
                studentName="Mustafakamal"
                semester="7th Semester"
            />

        </div>

    );

}


// Props receive data from the parent component.

function Student(props) {

    return (
<>
        <div>

            <h3>{props.studentName}</h3>

            <p>{props.semester}</p>

        </div>

        <StudentList/>
        </>

    );

}


export default App;