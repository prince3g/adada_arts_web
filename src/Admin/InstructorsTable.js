import React, { useState, useEffect } from 'react';
import PlaceholderImage from './Img/staffs/placeholder.png'; // Placeholder image for instructors with no image
import Alert from './Alert'; // Import the Alert component
import Loader from './Img/page-loader.gif'; // Import the loader GIF
import AddInstructor from './AddInstructor'; // Import the AddInstructor component

const InstructorsTable = ({ markedAll, sortOrder, onInstructorsCountChange }) => {
    const [instructors, setInstructors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [alert, setAlert] = useState(null); // State for alert
    const [editingInstructor, setEditingInstructor] = useState(null); // State for currently editing instructor
    const token = localStorage.getItem("authToken");
    const API_HOST = process.env.REACT_APP_API_HOST;

    function insertIntoUrl(url) {
        const insertString = "api/v1/free/";
        const insertPosition = url.indexOf("api/v1/free") + insertString.length;
        const updatedUrl = url.slice(0, insertPosition) + insertString + url.slice(insertPosition);
        return updatedUrl;
    }
     
    
    // Fetch instructors data
    const fetchInstructors = () => {
        fetch(`${API_HOST}api/courses/instructors/`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                const formattedData = data.map((item) => ({
                    sn: item.id, // Use id as the serial number (S/N)
                    instructor: {
                        id: item.id,
                        firstName: item.first_name,
                        lastName: item.last_name,
                        firstName: item.first_name,
                        lastName: item.last_name,
                        email: item.email,
                        image: item.image ? item.image : PlaceholderImage, // Use placeholder if image is null or invalid
                    },
                    instructorId: item.instructor_id, // Instructor ID
                    coursesAssigned: item.courses_assigned || 0, // Fallback to 0 if null
                    numberOfStudents: item.number_of_students || 0, // Fallback to 0 if null
                }));
                // Update instructors state after formatting
                setInstructors(formattedData);
                // Update the number of instructors
                onInstructorsCountChange(formattedData.length);
            })
            .catch(error => {
                console.error(`Failed to fetch instructors: ${error.message}`);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    // Fetch instructors on component mount
    useEffect(() => {
        fetchInstructors();
    }, [onInstructorsCountChange]);

    // Sort instructors based on sortOrder
    const sortedInstructors = React.useMemo(() => {
        return [...instructors].sort((a, b) => {
            if (sortOrder === 'mostRecent') {
                return b.sn - a.sn; // Most recent first
            } else if (sortOrder === 'old') {
                return a.sn - b.sn; // Oldest first
            }
            return 0; // No sorting by default
        });
    }, [instructors, sortOrder]);

    // Automatically hide the alert after 5 seconds
    useEffect(() => {
        if (alert) {
            const timer = setTimeout(() => {
                setAlert(null);
            }, 5000); // 5000ms = 5 seconds

            return () => clearTimeout(timer); // Clean up timeout on component unmount or when alert changes
        }
    }, [alert]);

    // Handle delete instructor
    const handleDeleteInstructor = (sn, name) => {
        if (window.confirm(`Are you sure you want to remove ${name}?`)) {
            const deleteUrl = `${API_HOST}api/courses/instructors/${sn}/`;

            fetch(deleteUrl, {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
            .then(response => {
                if (response.ok) {
                    setAlert({ type: 'success', message: 'Instructor is removed successfully!' });
                    setTimeout(() => {
                        window.location.reload();
                    }, 2000); // 2000ms = 2 seconds
                } else {
                    return response.text().then(text => {
                        throw new Error(`HTTP error! status: ${response.status}. Message: ${text}`);
                    });
                }
            })
            .catch(error => {
                setAlert({ type: 'error', message: `Failed to delete instructor. Please check if they exist.` });
            });
        }
    };

    // Handle edit instructor
    const handleEditInstructor = (instructor) => {
        setEditingInstructor(instructor); // Set the instructor to be edited
    };

    // Handle alert close
    const handleAlertClose = () => {
        setAlert(null);
    };

    // Handle image error
    const handleImageError = (event) => {
        event.target.src = PlaceholderImage; // Set to placeholder image on error
    };

    if (loading) {
        return (
            <div className="loader-container">
                <span>Loading data...</span> <img src={Loader} alt="Loading" />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="Sec-table">
            {alert && <Alert type={alert.type} message={alert.message} onClose={handleAlertClose} />}
            {editingInstructor && (
                <AddInstructor 
                    instructor={editingInstructor} 
                    onClose={() => setEditingInstructor(null)}
                    onUpdate={(updatedInstructor) => {
                        setInstructors(prevInstructors => {
                            const updatedInstructors = prevInstructors.map((instructor) =>
                                instructor.sn === updatedInstructor.sn ? updatedInstructor : instructor
                            );
                            return updatedInstructors;
                        });
                        setEditingInstructor(null);
                    }}
                />
            )}
            <table>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Instructor ID</th>
                        <th>Profile Image</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Courses Assigned</th>
                        <th>Number of Students</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedInstructors.length === 0 ? (
                        <tr>
                            <td colSpan="9" style={{ textAlign: 'center', padding: '20px' }}>No data available</td>
                        </tr>
                    ) : (
                        sortedInstructors.map((instructor, index) => (
                            <tr key={instructor.sn} style={{ backgroundColor: markedAll ? '#F0F5FF' : 'transparent' }}>
                                <td>{index + 1}</td>
                                 <td>{instructor.instructorId}</td>
                                <td>
                                    <img 
                                        src={insertIntoUrl(instructor.instructor.image)}
                                        alt="Instructor" 
                                        onError={handleImageError} 
                                        style={{ 
                                            width: '40px', 
                                            height: '40px', 
                                            borderRadius: '50%', 
                                            objectFit: 'cover', 
                                            objectPosition: 'center' 
                                        }} 
                                    />
                                </td>
                                <td>{instructor.instructor.firstName}   </td>
                                <td>{instructor.instructor.lastName}</td>
                                <td>{instructor.instructor.email}</td>
                                <td>{instructor.coursesAssigned}</td>
                                <td>{instructor.numberOfStudents}</td>
                                <td>
                                    <div className="action-btns">
                                        <button 
                                            onClick={() => handleEditInstructor(instructor)}
                                            style={{ background: '#6FD96F', color: '#fff' }} // Updated button color
                                        >
                                            <i className="icon-user"></i> Edit
                                        </button>
                                        <button onClick={() => handleDeleteInstructor(instructor.instructor.id, `${instructor.instructor.firstName} ${instructor.instructor.lastName}`)}>
                                            Remove
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default InstructorsTable;
