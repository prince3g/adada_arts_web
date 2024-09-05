import React, { useState, useEffect } from 'react';
import SubAaNav from './SubAaNav';
import AllIcon from './Img/all-arrow.svg';
import PrintIcon from './Img/print-icon.svg';
import DailyUsage from './DailyUsage';
import CourseTable from './CourseTable';
import DeletAlIcon from './Img/delete-icon.svg';
import MarkAllIcon from './Img/mark-all-icon.svg';
import CourseUpload from './CourseUpload';
import AddInstructor from './AddInstructor';
import AddCategory from './AddCategory';
import ADDNotice from './AddNotice';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

function CoursesPage() {
  const API_HOST = process.env.REACT_APP_API_HOST;
  const [showCourseUpload, setShowCourseUpload] = useState(false);
  const [showAddInstructor, setShowAddInstructor] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [allMarked, setAllMarked] = useState(false);
  const [sortOrder, setSortOrder] = useState('mostRecent'); // Default sorting
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [courseCount, setCourseCount] = useState(0); // State to store course count

  // Fetch the number of courses when the component mounts
  useEffect(() => {
    const fetchCourseCount = async () => {
      try {
        const response = await fetch(`${API_HOST}api/courses/courses/`);
        if (!response.ok) {
          throw new Error('Failed to fetch courses');
        }
        const data = await response.json();
        setCourseCount(data.length); // Assuming the API returns an array of courses
      } catch (error) {
        console.error('Error fetching course count:', error);
      }
    };

    fetchCourseCount();
  }, []);

  const handleCloseCourseUpload = () => setShowCourseUpload(false);
  const handleCloseAddInstructor = () => setShowAddInstructor(false);
  const handleCloseAddCategory = () => setShowAddCategory(false);
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

  return (
    <div className='Main_AA_Page'>
      <div className='Page_Top'>
        <div className='site-container'>
          <div className='Main_Page_Top'>
            <div className='Left_AA_Pp_Sec'>
              <h2>Courses</h2>
              <p>You have about <b>{courseCount}</b> uploaded courses</p>
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
            <div className='Tabel_SecOo'>
              <div className='Tabel_SecOo_Top'>
                <h3>Uploaded Courses <img src={AllIcon} alt="All" /> <span>{courseCount}</span></h3>
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

export default CoursesPage;
