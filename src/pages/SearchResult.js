import React, { useState, useEffect, lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation, Link } from 'react-router-dom'; // Import Link for navigation
import AngleLeft from '../assets/Img/angle-right.svg';
import FilterIcon from '../assets/Img/filter-icon.svg';
import CourserIcon1 from '../assets/Img/student.png';
import CourserIcon2 from '../assets/Img/write.png';
import ArrowDownIcon1 from '../assets/Img/arrow-down1.svg';
import ArrowUpIcon1 from '../assets/Img/arrow-up1.svg';
import AbtImg3 from '../assets/Img/AbtImg3.png';
import CcIcon1 from '../assets/Img/Cc-icon1.svg';
import CcIcon2 from '../assets/Img/Cc-icon2.svg';
import CcIcon3 from '../assets/Img/Cc-icon3.svg';
import CcIcon4 from '../assets/Img/Cc-icon4.svg';

// Import NavbarWrapper using lazy loading
const NavbarWrapper = lazy(() => import('./NavbarWrapper'));

const SearchResult = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchQuery = queryParams.get('q') || ''; // Fallback to empty string if no query
    const API_HOST = process.env.REACT_APP_API_HOST;
    const [courseStatus, setCourseStatus] = useState('all-courses');
    const [methodOfLearning, setMethodOfLearning] = useState('all-courses');
    const [fees, setFees] = useState('all-courses');
    const [date, setDate] = useState('all-courses');
    const [expandedCards, setExpandedCards] = useState({});
    const [showPaymentDropdown, setShowPaymentDropdown] = useState(false);
    const [courses, setCourses] = useState([]);
    const [categoryImage, setCategoryImage] = useState('');
    const [categoryName, setCategoryName] = useState(''); // Add state for categoryName
    const [mainCategoryName, setMainCategoryName] = useState(''); // Add state for mainCategoryName

    const handleCheckboxChange = (group, value) => {
        if (group === 'courseStatus') {
            setCourseStatus(value);
        } else if (group === 'methodOfLearning') {
            setMethodOfLearning(value);
        } else if (group === 'fees') {
            setFees(value);
        } else if (group === 'date') {
            setDate(value);
        }
    };

    useEffect(() => {
        if (searchQuery) {
            fetch(`${API_HOST}api/courses/search/?q=${searchQuery}`)
                .then(response => response.json())
                .then(data => {
                    console.log('Fetched data:', data); // Log the fetched data
                    if (data && Array.isArray(data.courses)) {
                        setCourses(data.courses);
                        setCategoryImage(data.image || ''); // Use an empty string if no image is provided
                        setCategoryName(data.categoryName || ''); // Set category name if available
                        setMainCategoryName(data.mainCategoryName || ''); // Set main category name if available
                    } else {
                        console.error('Expected data to have a "courses" key with an array value, but got:', data);
                    }
                })
                .catch(error => console.error('Error fetching courses:', error));
        }
    }, [searchQuery]);

    const handleEnrollClick = () => {
        setShowPaymentDropdown(true);
    };

    const handleCloseDropdown = () => {
        setShowPaymentDropdown(false);
    };

    const toggleCard = (cardId) => {
        setExpandedCards(prevState => ({
            ...prevState,
            [cardId]: !prevState[cardId]
        }));
    };

    return (
        <div className='courses-page'>
            <Helmet>
                <title>Search Results | A.R.T.S Training Services</title>
                <meta name="description" content="Search results for courses on A.R.T.S Training Services" />
                <meta name="keywords" content="A.R.T.S, training services, search results, courses" />
            </Helmet>

            <div className='navigateTo-Top'>
                <div className='site-container'>
                    <ul>
                        <li><Link to='/courses'>Courses</Link></li>
                        <li><img src={AngleLeft} alt="Angle Left" /></li>
                        <li>{searchQuery}</li>
                    </ul>
                </div>
            </div>

            <section className='All_Courses_Sec'>
                <div className='site-container'>
                    <div className='All_Course_Main'>
                        <div className='filter_Sec'>
                            <div className='filter-box'>
                                <h3>Filter <img src={FilterIcon} alt="Filter Icon" /></h3>
                                {/* Filter options here */}
                                <ul>
                                    <p>Course status</p>
                                    <li>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                className='custom-checkbox' 
                                                checked={courseStatus === 'all-courses'} 
                                                onChange={() => handleCheckboxChange('courseStatus', 'all-courses')}
                                            />
                                            All courses
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                className='custom-checkbox' 
                                                checked={courseStatus === 'qualifications'} 
                                                onChange={() => handleCheckboxChange('courseStatus', 'qualifications')}
                                            />
                                            Qualifications
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                className='custom-checkbox' 
                                                checked={courseStatus === 'mandatory-courses'} 
                                                onChange={() => handleCheckboxChange('courseStatus', 'mandatory-courses')}
                                            />
                                            Mandatory Courses
                                        </label>
                                    </li>
                                </ul>

                                <ul>
                                    <p>Method of learning</p>
                                    <li>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                className='custom-checkbox' 
                                                checked={methodOfLearning === 'all-courses'} 
                                                onChange={() => handleCheckboxChange('methodOfLearning', 'all-courses')}
                                            />
                                            All courses
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                className='custom-checkbox' 
                                                checked={methodOfLearning === 'online-courses'} 
                                                onChange={() => handleCheckboxChange('methodOfLearning', 'online-courses')}
                                            />
                                            Online courses
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                className='custom-checkbox' 
                                                checked={methodOfLearning === 'on-demand-courses'} 
                                                onChange={() => handleCheckboxChange('methodOfLearning', 'on-demand-courses')}
                                            />
                                            On Demand courses
                                        </label>
                                    </li>
                                </ul>

                                <ul>
                                    <p>Fees</p>
                                    <li>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                className='custom-checkbox' 
                                                checked={fees === 'all-courses'} 
                                                onChange={() => handleCheckboxChange('fees', 'all-courses')}
                                            />
                                            All courses
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                className='custom-checkbox' 
                                                checked={fees === 'free-courses'} 
                                                onChange={() => handleCheckboxChange('fees', 'free-courses')}
                                            />
                                            Free courses
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                className='custom-checkbox' 
                                                checked={fees === 'paid-courses'} 
                                                onChange={() => handleCheckboxChange('fees', 'paid-courses')}
                                            />
                                            Paid courses
                                        </label>
                                    </li>
                                </ul>

                                <ul>
                                    <p>Date</p>
                                    <li>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                className='custom-checkbox' 
                                                checked={date === 'all-courses'} 
                                                onChange={() => handleCheckboxChange('date', 'all-courses')}
                                            />
                                            All courses
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                className='custom-checkbox' 
                                                checked={date === 'most-recent-courses'} 
                                                onChange={() => handleCheckboxChange('date', 'most-recent-courses')}
                                            />
                                            Most Recent courses
                                        </label>
                                    </li>
                                    <li>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                className='custom-checkbox' 
                                                checked={date === 'old-courses'} 
                                                onChange={() => handleCheckboxChange('date', 'old-courses')}
                                            />
                                            Old courses
                                        </label>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className='Courses_Groups'>
                            <div className='Topp_Seck'>
                                <div className='Topp_Seck_Img'>
                                    {/* <img src={categoryImage} alt="Course" /> */}
                                </div>
                                <div className='Topp_Seck_Txt'>
                                    <div>
                                        <h3 className='mid-text'>Search results for: {searchQuery}</h3>
                                        {/* <span><img src={CourserIcon1} alt="Course Icon" />{mainCategoryName}</span> */}
                                        <span><img src={CourserIcon2} alt="Course Icon" />{courses.length} Results</span>
                                    </div>
                                </div>
                            </div>

                            {Array.isArray(courses) && courses.length > 0 ? (
                                courses.map((course, index) => (
                                    <div key={course.id} className={`CCc_Card ${expandedCards[`card${index}`] ? 'show_more_Dlt' : ''}`}>
                                        <div className='CCc_Card_1'>
                                            <div className='CCc_Card_1_Top'>
                                                <h3>{course.title}</h3>
                                            </div>
                                            <div className='CCc_Card_1_Mid'>
                                                <h4>About this qualification</h4>
                                                <p>{course.details}</p>
                                                <div className='Career-Divv'>
                                                    <h4>Career opportunities</h4>
                                                    <p>{course.careerOpportunities}</p>
                                                </div>
                                            </div>
                                            <div className='CCc_Card_1_Foot'>
                                                <button className='view-more-btn' onClick={() => toggleCard(`card${index}`)}>
                                                    {expandedCards[`card${index}`] ? 'View less' : 'View more'} <img src={expandedCards[`card${index}`] ? ArrowUpIcon1 : ArrowDownIcon1} alt="Arrow" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className='CCc_Card_2'>
                                            <ul>
                                                <li><img src={CcIcon1} alt="Icon" /><span>{course.lessons} HOURS LESSONS</span></li>
                                                <li><img src={CcIcon2} alt="Icon" /><span>{course.duration}</span></li>
                                                <li><h3>{course.price}</h3></li>
                                                <li><img src={CcIcon3} alt="Icon" /> <span>{course.methodOfLearning}</span></li>
                                                <li><button className='enroll_btn' onClick={handleEnrollClick}><img src={CcIcon4} alt="Icon" /> Enroll Now</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p>No courses available</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Conditional rendering of the dropdown */}
            {showPaymentDropdown && (
                <div className='payment-dropdown'>
                    <button onClick={handleCloseDropdown}>Close</button>
                    <p>Payment options here</p>
                </div>
            )}

            <Suspense fallback={<div>Loading...</div>}>
                <NavbarWrapper />
            </Suspense>
        </div>
    );
};

export default SearchResult;
