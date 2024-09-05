import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Loader from './Img/page-loader.gif'; // Import the loader GIF
import CourseUpload from './CourseUpload'; // Import the CourseUpload component

const CourseTable = ({ markedAll, sortOrder }) => {
    const API_HOST = process.env.REACT_APP_API_HOST;
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [editingCourse, setEditingCourse] = useState(null); // State to track the course being edited

    const categoriesCache = useRef(null);
    const instructorsCache = useRef(null);

    function insertIntoUrl(url) {
        const insertString = "api/v1/free/";
        const insertPosition = url.indexOf("api/v1/free") + insertString.length;
        const updatedUrl = url.slice(0, insertPosition) + insertString + url.slice(insertPosition);
        return updatedUrl;
    }

    useEffect(() => {
        const fetchCategories = async () => {
            if (!categoriesCache.current) {
                try {
                    const response = await fetch(`https://cmvp.net/api/v1/free/api/courses/category/`);
                    //const response = await fetch(`${API_HOST}api/courses/category/`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    const categoryMap = data.reduce((acc, category) => {
                        acc[category.id] = category.title;
                        return acc;
                    }, {});
                    categoriesCache.current = categoryMap; // Cache the categories
                } catch (error) {
                    setError(error.message);
                }
            }
            return categoriesCache.current;
        };

        const fetchInstructors = async () => {
            if (!instructorsCache.current) {
                try {
                    const response = await fetch(`https://cmvp.net/api/v1/free/api/courses/instructors/`);
                    //const response = await fetch(`${API_HOST}api/courses/instructors/`);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    const data = await response.json();
                    const instructorMap = data.reduce((acc, instructor) => {
                        acc[instructor.id] = {
                            name: `${instructor.instructor_first_name} ${instructor.instructor_last_name}`,
                            image: instructor.image || 'default-image-url.jpg',
                        };
                        return acc;
                    }, {});
                    instructorsCache.current = instructorMap; // Cache the instructors
                } catch (error) {
                    setError(error.message);
                }
            }
            return instructorsCache.current;
        };

        const fetchCourses = async () => {
            try {
                const [categories, instructors] = await Promise.all([
                    fetchCategories(),
                    fetchInstructors(),
                ]);

                const response = await fetch(`https://cmvp.net/api/v1/free/api/courses/courses/`);
                //const response = await fetch(`${API_HOST}api/courses/courses/`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                const transformedData = data.map(course => ({
                    id: course.id,
                    category: course.category,
                    title: course.title,
                    code: course.course_code,
                    instructor: course.instructor,
                    price: course.amount,
                    lessonDays: `${course.duration}`,
                    enrolledUsers: course.number_of_students,
                    studyType: course.course_type,
                    dateAdded: new Date(),
                }));
                setCourses(transformedData);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    useEffect(() => {
        if (!loading && !error) {
            const sortedCourses = [...courses].sort((a, b) => {
                if (sortOrder === 'mostRecent') {
                    return b.dateAdded - a.dateAdded;
                } else if (sortOrder === 'old') {
                    return a.dateAdded - b.dateAdded;
                }
                return 0;
            });
            setCourses(sortedCourses);
        }
    }, [sortOrder, loading, error]);

    const handleDeleteCourse = async (id) => {
        if (window.confirm('Are you sure you want to remove this course?')) {
            try {
                const token = localStorage.getItem('authToken'); // Replace 'authToken' with your actual token key name
                await axios.delete(`https://cmvp.net/api/v1/free/api/courses/courses/${id}`, {
                //await axios.delete(`${API_HOST}api/courses/courses/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });    
                // Remove the deleted course from the state without refreshing the page
                setCourses(courses.filter(course => course.id !== id));
            } catch (error) {
                console.error('Error deleting course:', error);
            }
        }
    };

    const handleEditCourse = (course) => {
        setEditingCourse(course); // Set the course to be edited
    };

    const handleCancelEdit = () => {
        setEditingCourse(null); // Reset editing state to show the table
    };

    if (loading) {
        return (
            <div className="loader-container">
                <span>Loading data...</span>
                <img src={Loader} alt="Loading" />
            </div>
        );
    }

    // If editingCourse is not null, show the CourseUpload component
    if (editingCourse) {
        return <CourseUpload course={editingCourse} onCancel={handleCancelEdit} />;
    }

    return (
        <div className="Sec-table">
            <table>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Category</th>
                        <th>Course title</th>
                        <th>Course code</th>
                        <th>Instructor</th>
                        <th>Price</th>
                        <th>Lesson days</th>
                        <th>Study type</th>
                        <th>Enrolled</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {courses.map((course, index) => (
                        <tr key={course.id} style={{ backgroundColor: markedAll ? '#F0F5FF' : 'transparent' }}>
                            <td>{index + 1}</td>
                            <td>{course.category.title}</td>
                            <td>{course.title}</td>
                            <td>{course.code}</td>
                            <td>
                                <div className="instruc-dlt-main">
                                    <div className="instruc-profl">
                                        <div className="instruc-profl-grid">
                                            <div className="profl-img">
                                                <div className="profl-img-main">
                                                    <img src={insertIntoUrl(course.instructor.image)} alt="Instructor" />
                                            
                                                </div>
                                            </div>
                                            <div className="profl-dlts">
                                                <p>{course.instructor.first_name}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                            <td>{course.price}</td>
                            <td>{course.lessonDays}</td>
                            <td>{course.studyType}</td>
                            <td>{course.enrolledUsers}</td>
                            <td>
                                <div className="action-btns">
                                    <button
                                        onClick={() => handleEditCourse(course)}
                                        style={{ background: '#6FD96F', color: '#FFFFFF' }}
                                        className="edit-courses-Btn"
                                    >
                                        <i className="icon-user"></i> Edit
                                    </button>
                                    <button onClick={() => handleDeleteCourse(course.id)}>
                                        Remove
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CourseTable;
