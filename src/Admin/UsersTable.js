import React, { useState, useEffect } from 'react';

import Loader from './Img/page-loader.gif'; // Import the loader GIF

const UsersTable = ({ markedAll, sortOrder }) => {
    const API_HOST = process.env.REACT_APP_API_HOST;
    const [users, setUsers] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pageSize] = useState(10);

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const response = await fetch(`${API_HOST}api/register/users/?page=${page}&pageSize=${pageSize}`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();

                const transformedData = data.map((user, index) => ({
                    id: index + 1 + (page - 1) * pageSize,
                    email: user.email,
                    firstName: user.full_name.split(' ')[0] || '',
                    lastName: user.full_name.split(' ')[1] || '',
                    enrolledCourses: 0,
                    dateRegistered: new Date(user.date_joined),
                }));

                setUsers(transformedData);
            } catch (error) {
                console.error('Failed to fetch users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [page]);

    const handleDeleteUser = (id) => {
        if (window.confirm('Are you sure you want to remove this user?')) {
            setUsers(users.filter(user => user.id !== id));
        }
    };

    const handleNextPage = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1);
        }
    };

  
    if (loading) {
        return (
            <div className="loader-container">
                <span>Loading data...</span>
                <img src={Loader} alt="Loading" />
            </div>
        );
    }

    return (
        <div className="Sec-table">
            <table>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Email</th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Enrolled Courses</th>
                        <th>Date of Registration</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id} style={{ backgroundColor: markedAll ? '#F0F5FF' : 'transparent' }}>
                            <td>{index + 1 + (page - 1) * pageSize}</td>
                            <td>{user.email}</td>
                            <td>{user.firstName}</td>
                            <td>{user.lastName}</td>
                            <td>{user.enrolledCourses}</td>
                            <td>{user.dateRegistered.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</td>
                            <td>
                                <div className="action-btns">
                                    <button onClick={() => handleDeleteUser(user.id)}>
                                        Remove
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/* <div className="pagination">
                <button onClick={handlePrevPage} disabled={page === 1}>Previous</button>
                <button onClick={handleNextPage}>Next</button>
            </div> */}
        </div>
    );
};

export default UsersTable;
