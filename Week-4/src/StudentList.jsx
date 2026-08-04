function StudentList() {

    const students = [
        {
            id: 1,
            name: "Mustafa",
            semester: "Final Year",
            passed: true
        },
        {
            id: 2,
            name: "Ali",
            semester: "6th Semester",
            passed: false
        },
        {
            id: 3,
            name: "Ahmed",
            semester: "5th Semester",
            passed: true
        }
    ];

    return (

        <div className="p-6">

            <h1 className="text-2xl font-bold mb-4">
                Student List
            </h1>

            <div className="grid grid-cols-3 gap-4">

                {students.map((student) => (

                    <div
                        key={student.id}
                        className="border rounded p-4"
                    >

                        <h2 className="text-xl font-semibold">
                            {student.name}
                        </h2>

                        <p>{student.semester}</p>

                        {student.passed && (
                            <p className="text-green-600">
                                Passed
                            </p>
                        )}

                        <p className="mt-2">
                            {student.passed ? "Congratulations" : "Try Again"}
                        </p>

                    </div>

                ))}

            </div>

        </div>

    );

}

export default StudentList;