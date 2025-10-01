import React, { createContext, useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import * as api from '../api';

const DataContext = createContext();
export const useData = () => useContext(DataContext);

const defaultTimeslots = [
  { id: 'ts1', label: 'Mon 09:00-09:50' },
  { id: 'ts2', label: 'Mon 10:00-10:50' },
  { id: 'ts3', label: 'Tue 09:00-09:50' },
  { id: 'ts4', label: 'Tue 10:00-10:50' },
  { id: 'ts5', label: 'Wed 09:00-09:50' },
];

export function DataProvider({ children }) {
  const [timeslots] = useState(defaultTimeslots);

  const [faculties, setFaculties] = useState([
    { id: 'f1', name: 'Alice', availability: ['ts1', 'ts2'] },
    { id: 'f2', name: 'Bob', availability: ['ts3', 'ts4'] },
  ]);

  const [courses, setCourses] = useState([
  { id: 'c1', name: 'Math', requiredSlots: 2, faculty_id: 'f1' },
  { id: 'c2', name: 'Physics', requiredSlots: 2, faculty_id: 'f2' },
  { id: 'c3', name: 'Chemistry', requiredSlots: 1, faculty_id: 'f1' },
]);

  const [classrooms, setClassrooms] = useState([
    { id: 'r1', name: 'Room A', capacity: 40, type: 'Lecture' },
    { id: 'r2', name: 'Lab 1', capacity: 30, type: 'Lab' },
  ]);

  const addFaculty = (f) => setFaculties((prev) => [...prev, { ...f, id: `f${Date.now()}` }]);
  const addCourse = (c) => setCourses((prev) => [...prev, { ...c, id: `c${Date.now()}` }]);
  const addClassroom = (r) => setClassrooms((prev) => [...prev, { ...r, id: `r${Date.now()}` }]);

  // Create a function that accepts navigate as a parameter
  const sendAllToBackend = async (navigate) => {
    try {
      const dataset = { faculties, courses, classrooms, timeslots };
      const response = await axios.post('http://localhost:8000/upload-dataset', dataset, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log(response.data);
      
      // Redirect to success page on successful upload
      if (navigate) {
        navigate('/success');
      }
    } catch (error) {
      console.error('Error uploading dataset:', error);
      alert('Failed to upload dataset. Please try again.');
    }
  };

  return (
    <DataContext.Provider
      value={{
        faculties,
        courses,
        classrooms,
        timeslots,
        addFaculty,
        addCourse,
        addClassroom,
        sendAllToBackend,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}