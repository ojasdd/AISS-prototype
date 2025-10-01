import React, { useEffect, useState } from "react";

const TimetablePage = () => {
  const [timetable, setTimetable] = useState([]);

  useEffect(() => {
    // Fetch the timetable data from the deployed backend
    fetch("https://aiss-prototype-backend.onrender.com/exports/timetable.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch timetable data");
        }
        return response.json();
      })
      .then((data) => setTimetable(data))
      .catch((error) => console.error("Error fetching timetable:", error));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Timetable</h1>
      <table border="1" style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th>Course</th>
            <th>Faculty</th>
            <th>Classroom</th>
            <th>Timeslot</th>
          </tr>
        </thead>
        <tbody>
          {timetable.map((entry, index) => (
            <tr key={index}>
              <td>{entry.course}</td>
              <td>{entry.faculty}</td>
              <td>{entry.classroom}</td>
              <td>{entry.timeslot}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TimetablePage;