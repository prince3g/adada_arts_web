import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import SubAaNav from './SubAaNav';
import AllIcon from './Img/all-arrow.svg';
import EnrolledIcon from './Img/enrolled-icon.svg';
import InstructIcon from './Img/instruct-icon.svg';
import UsersIcon from './Img/users-icon.svg';
import PrintIcon from './Img/print-icon.svg';
import PlusIcon from './Img/plus-icon.svg';
import AddNotice from './Img/add-notice-icon.svg';
import ViewIcon from './Img/view-eye.svg';
import DailyUsage from './DailyUsage';
import CourseTable from './CourseTable';
import DeletAlIcon from './Img/delete-icon.svg';
import MarkAllIcon from './Img/mark-all-icon.svg';
import CourseUpload from './CourseUpload';
import AddInstructor from './AddInstructor';
import AddCategory from './AddCategory';
import ADDNotice from './AddNotice';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

function AdminHome() {
  const [showCourseUpload, setShowCourseUpload] = useState(false);
  const [showAddInstructor, setShowAddInstructor] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [allMarked, setAllMarked] = useState(false);
  const [sortOrder, setSortOrder] = useState('mostRecent'); // Default sorting
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [coursesCount, setCoursesCount] = useState(0); // State to store courses count
  const [categoriesCount, setCategoriesCount] = useState(0); // State to store categories count
  const [instructorsCount, setInstructorsCount] = useState(0); // State to store instructors count
  const [usersCount, setUsersCount] = useState(0); // State to store users count

  useEffect(() => {
    // Fetch the number of courses
    const fetchCoursesCount = async () => {
      try {
        const response = await fetch('https://cmvp.net/api/v1/free/api/courses/courses/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCoursesCount(data.length); // Assuming the API returns an array of courses
      } catch (error) {
        console.error('Failed to fetch courses count:', error);
      }
    };

    fetchCoursesCount();
  }, []);

  useEffect(() => {
    // Fetch the number of categories
    const fetchCategoriesCount = async () => {
      try {
        const response = await fetch('https://cmvp.net/api/v1/free/api/courses/category/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCategoriesCount(data.length); // Assuming the API returns an array of categories
      } catch (error) {
        console.error('Failed to fetch categories count:', error);
      }
    };

    fetchCategoriesCount();
  }, []);

  useEffect(() => {
    // Fetch the number of instructors
    const fetchInstructorsCount = async () => {
      try {
        const response = await fetch('https://cmvp.net/api/v1/free/api/courses/instructors/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setInstructorsCount(data.length); // Assuming the API returns an array of instructors
      } catch (error) {
        console.error('Failed to fetch instructors count:', error);
      }
    };

    fetchInstructorsCount();
  }, []);

  useEffect(() => {
    // Fetch the number of users
    const fetchUsersCount = async () => {
      try {
        const response = await fetch('https://cmvp.net/api/v1/free/api/register/users/');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsersCount(data.length); // Assuming the API returns an array of users
      } catch (error) {
        console.error('Failed to fetch users count:', error);
      }
    };

    fetchUsersCount();
  }, []);

  const handleAddCourseClick = () => setShowCourseUpload(true);
  const handleCloseCourseUpload = () => setShowCourseUpload(false);
  const handleAddInstructorClick = () => setShowAddInstructor(true);
  const handleCloseAddInstructor = () => setShowAddInstructor(false);
  const handleAddCategoryClick = () => setShowAddCategory(true);
  const handleCloseAddCategory = () => setShowAddCategory(false);
  const handleAddNoticeClick = () => setShowAddNotice(true);
  const handleCloseAddNotice = () => setShowAddNotice(false);

  const handleDeleteTable = () => {
    if (window.confirm('Are you sure you want to delete all rows?')) {
      document.querySelector('.Tabel_SecOo_main').innerHTML = '';
    }
  };

  const handleMarkAll = () => {
    const rows = document.querySelectorAll('.Tabel_SecOo_main table tr');
    rows.forEach(row => {
      row.style.backgroundColor = allMarked ? '#FFFFFF' : '#F0F5FF';
    });
    setAllMarked(!allMarked);
  };

  const handleFilterClick = (order) => {
    setSortOrder(order);
  };

  const handleDateChange = (newDate) => {
    setDate(newDate);
    setShowCalendar(false);
  };

  // Format date as Mon Day, Year (e.g., Aug 16, 2024)
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className='Main_AA_Page'>
      <div className='Page_Top'>
        <div className='site-container'>
          <div className='Main_Page_Top'>
            <div className='Left_AA_Pp_Sec'>
              <h2>Welcome back, Admin</h2>
              <p>A.R.T.S Training Services admin page</p>
            </div>
            <div className='Right_AA_Pp_Sec'>
              <SubAaNav />
            </div>
          </div>
        </div>
      </div>

      <div className='site-container'>
        <div className='DD_Ccs'>
          <div className='DD_Ccs_1'>
            <div className='ToT_Tgs'>
              <div className='ToT_Tgs_1'>
                <div className='KK_SF_Sec'>
                  <h4 className='Date_Sply'>
                    Date - {formattedDate}
                    <span className='calendar-icon' onClick={() => setShowCalendar(!showCalendar)}>Calendar</span>
                  </h4>
                  {showCalendar && (
                    <div className='calendar-popup'>
                      <Calendar
                        onChange={handleDateChange}
                        value={date}
                      />
                    </div>
                  )}
                  <h6>Courses</h6>
                  <h2>{coursesCount} <img src={AllIcon} alt="All" /> <span>Uploaded courses</span></h2>
                  <div className='Ool_Btns'>
                    <button onClick={handleAddCourseClick}>Upload a course</button>

                    <NavLink 
                    to="/admin/a-courses" 
                    className={({ isActive }) => isActive ? 'active_Aa_NV_Icn' : ''}
                  >
                   View courses
                  </NavLink>
                  </div>
                </div>
              </div>
              <div className='ToT_Tgs_22'>
                <div className='ToT_Tgs_2'>
                  <div className='KK_SF_Sec'>
                    <span className='Img_Boxx'><img src={EnrolledIcon} alt="Categories" /></span>
                    <h6>Categories 
                      

                      <NavLink to="/admin/a-categories" className='viewMm_A'>
                      <img src={ViewIcon} alt="View" />View
                    </NavLink>
                      
                      </h6>
                    <h2>{categoriesCount} <img src={AllIcon} alt="All" /> <span>Uploaded</span></h2>
                  </div>
                  <div className='KK_SF_Sec'>
                    <span className='Img_Boxx'><img src={InstructIcon} alt="Instructors" /></span>
                    <h6>Instructors 
                    <NavLink to="/admin/a-instructors" className='viewMm_A'>
                      <img src={ViewIcon} alt="View" />View
                    </NavLink>
                      
                      </h6>
                    <h2>{instructorsCount} <img src={AllIcon} alt="All" /> <span>Added</span></h2>
                  </div>
                  <div className='KK_SF_Sec'>
                    <span className='Img_Boxx'><img src={UsersIcon} alt="Users" /></span>
                    <h6>Users 
                    <NavLink to="/admin/a-users" className='viewMm_A'>
                      <img src={ViewIcon} alt="View" />View
                    </NavLink>
                    </h6>
                    <h2>{usersCount} <img src={AllIcon} alt="All" /> <span>Registered</span></h2>
                  </div>
                </div>
                <div className='Akka_Btns'>
                  <button onClick={handleAddCategoryClick}><img src={PlusIcon} alt="Add" />Add course Category</button>
                  <button onClick={handleAddInstructorClick}><img src={PlusIcon} alt="Add" />Add Instructor</button>
                  <button onClick={handleAddNoticeClick}><img src={AddNotice} alt="Add Notice" />Add Notice</button>
                </div>
              </div>
            </div>
            <div className='Tabel_SecOo'>
              <div className='Tabel_SecOo_Top'>
                <h3>Uploaded Courses <img src={AllIcon} alt="All" /> <span>{coursesCount}</span></h3>
                <div className='filter_oo'>
                  <p>Filter:</p>
                  <ul>
                    <li><label><input type="checkbox" checked={sortOrder === 'mostRecent'} onChange={() => handleFilterClick('mostRecent')} className='ChooseInput' /> Most Recent</label></li>
                    <li><label><input type="checkbox" checked={sortOrder === 'old'} onChange={() => handleFilterClick('old')} className='ChooseInput' /> Old</label></li>
                  </ul>
                  <select>
                    <option>Categories</option>
                    <option>Health</option>
                    <option>Sport</option>
                    <option>Security</option>
                  </select>
                </div>
              </div>
              <div className='Tabel_SecOo_main'>
                <CourseTable sortOrder={sortOrder} />
              </div>
            </div>
           
          </div>
          <div className='DD_Ccs_2'>
            <DailyUsage />
          </div>
        </div>
      </div>

      {showCourseUpload && <CourseUpload onClose={handleCloseCourseUpload} />}
      {showAddInstructor && <AddInstructor onClose={handleCloseAddInstructor} />}
      {showAddCategory && <AddCategory onClose={handleCloseAddCategory} />}
      {showAddNotice && <ADDNotice onClose={handleCloseAddNotice} />}
    </div>
  );
}

export default AdminHome;
