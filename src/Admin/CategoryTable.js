import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import Loader from './Img/page-loader.gif'; // Import the loader GIF
import Alert from './Alert'; // Import the Alert component
import AddCategory from './AddCategory'; // Import the AddCategory component

const CategoryTable = ({ markedAll, sortOrder }) => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');
    const [alert, setAlert] = useState({ type: '', message: '', hidden: true }); // Alert state
    const [editingCategory, setEditingCategory] = useState(null); // State for the category being edited
    const API_HOST = process.env.REACT_APP_API_HOST;

    function insertIntoUrl(url) {
        const insertString = "api/v1/free/";
        const insertPosition = url.indexOf("api/v1/free") + insertString.length;
        const updatedUrl = url.slice(0, insertPosition) + insertString + url.slice(insertPosition);
        return updatedUrl;
    }
    

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await axios.get(`${API_HOST}api/courses/category/`);
                console.log('Fetched categories:', response.data); // Debugging: Log fetched data

                // Sort categories based on creation time (newest first)
                const sortedCategories = response.data.sort((a, b) => {
                    // Ensure creation date fields exist and are valid
                    const createdDateA = new Date(a.createdDate).getTime();
                    const createdDateB = new Date(b.createdDate).getTime();
                    
                    // Sort in descending order based on createdDate
                    return createdDateB - createdDateA;
                });

                console.log('Sorted categories:', sortedCategories); // Debugging: Log sorted data
                setCategories(sortedCategories);
            } catch (error) {
                console.error('Error fetching categories:', error);
                showAlert('error', 'Failed to load categories. Please try again later.');
            } finally {
                setLoading(false); // Stop loading when the data is fetched
            }
        };

        fetchCategories();
    }, []);

    const showAlert = (type, message) => {
        setAlert({ type, message, hidden: false });
        
        setTimeout(() => {
            setAlert({ ...alert, hidden: true });
            
            // Refresh the page if the alert is of type 'success'
            if (type === 'success') {
                window.location.reload(); // Refresh the page
            }
        }, 3000); // Auto-hide after 3 seconds
    };

    const handleDeleteCategory = async (id) => {
        if (window.confirm('Are you sure you want to remove this category?')) {
            try {
                const token = localStorage.getItem('authToken'); // Replace 'authToken' with your actual token key name
                await axios.delete(`${API_HOST}api/courses/category/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                showAlert('success', 'Category removed successfully.');
    
                // Remove the deleted category from the state without refreshing the page
                setCategories(categories.filter(category => category.id !== id));
            } catch (error) {
                console.error('Error deleting category:', error);
                showAlert('error', 'Failed to delete the category. Please try again later.');
            }
        }
    };
    

    const openModal = (image) => {
        setSelectedImage(image);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setSelectedImage('');
    };

    const handleEditClick = (category) => {
        console.log('Editing category:', category); // Debugging: Log the category being edited
        setEditingCategory(category);
    };

    const handleCloseEdit = () => {
        console.log('Closing edit modal'); // Debugging: Log when the edit modal is closed
        setEditingCategory(null);
    };

    if (loading) {
        return (
            <div className="loader-container">
                <span>Loading data...</span>
                <img src={Loader} alt="Loading" />
            </div>
        );
    }


    console.log("categories")
    console.log(categories.courses)
    console.log("categories")
    return (
        <div className="Sec-table">
            <Alert 
                type={alert.type} 
                message={alert.message} 
                onClose={() => setAlert({ ...alert, hidden: true })} 
                hidden={alert.hidden} 
            />
            <table>
                <thead>
                    <tr>
                        <th>S/N</th>
                        <th>Category Name</th>
                        <th>Image</th> {/* Column for category image */}
                        <th>Number of Courses</th>
                        <th>Total Enrolled Users</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.length === 0 ? (
                        <tr>
                            <td colSpan="6">No categories available.</td>
                        </tr>
                    ) : (
                        categories.map((category, index) => {
                            const totalEnrolledUsers = category.courses.reduce((total, course) => total + course.number_of_students, 0);

                            return (
                                <tr key={category.id} style={{ backgroundColor: markedAll ? '#F0F5FF' : 'transparent' }}>
                                    <td>{index + 1}</td>
                                    <td>{category.title}</td>
                                    <td>
                                        <img
                                            src={insertIntoUrl(category.image)}
                                            alt={`${category.title} banner`}
                                            style={{
                                                width: '50px',
                                                height: '50px',
                                                objectFit: 'cover',
                                                objectPosition: 'center',
                                                borderRadius: '5px',
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => openModal(category.image)}
                                        />
                                    </td>
                                    <td>{category.courses.length}</td>
                                    <td>{totalEnrolledUsers}</td>
                                    <td>
                                        <div className="action-btns">
                                            <button
                                                onClick={() => handleEditClick(category)}
                                                style={{ background: '#6FD96F', color: '#fff' }} // Add color here
                                                className="edit-courses-Btn"
                                            >
                                                <i className="icon-user"></i> Edit
                                            </button>
                                            <button onClick={() => handleDeleteCategory(category.id)}>
                                                 Remove
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })
                    )}
                </tbody>
            </table>

            {/* Modal for viewing the larger image */}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Category Image Modal"
                className="Modal"
                overlayClassName="Overlay"
            >
                <div className="modal-content">
                    <img
                        src={selectedImage}
                        alt="Category"
                        style={{
                            width: '50vw',
                            height: 'auto',
                            cursor: 'zoom-out'
                        }}
                        onClick={closeModal}
                    />
                    <button onClick={closeModal} className="modal-close-btn">Close</button>
                </div>
            </Modal>

            {/* Add/Edit Category Modal */}
            {editingCategory && (
                <AddCategory
                    category={editingCategory}
                    onClose={handleCloseEdit}
                />
            )}
        </div>
    );
};

export default CategoryTable;
