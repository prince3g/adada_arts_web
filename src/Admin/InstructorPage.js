import React, { useState } from 'react';
import SubAaNav from './SubAaNav';
import AllIcon from './Img/all-arrow.svg';
import PrintIcon from './Img/print-icon.svg';
import DailyUsage from './DailyUsage';
import DeletAlIcon from './Img/delete-icon.svg';
import MarkAllIcon from './Img/mark-all-icon.svg';
import CourseUpload from './CourseUpload';
import AddInstructor from './AddInstructor';
import AddCategory from './AddCategory';
import ADDNotice from './AddNotice';
import InstructorsTable from './InstructorsTable';

function InstructorPage() {
  const [showCourseUpload, setShowCourseUpload] = useState(false);
  const [showAddInstructor, setShowAddInstructor] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [allMarked, setAllMarked] = useState(false);
  const [sortOrder, setSortOrder] = useState('mostRecent'); // Default sorting
  const [instructorsCount, setInstructorsCount] = useState(0); // State for instructors count
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());

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
    setAllMarked(!allMarked);
  };

  const handleSortChange = (order) => {
    setSortOrder(order);
  };

  const handleInstructorsCountChange = (count) => {
    setInstructorsCount(count);
  };

  // Define handleFilterClick to update sorting order
  const handleFilterClick = (order) => {
    handleSortChange(order);
  };

  const handleCalendarToggle = () => {
    setShowCalendar(!showCalendar);
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
              <h2>Instructors</h2>
              <p>You have about <b>{instructorsCount}</b> Instructors</p>
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
                <h3>List of Instructors<img src={AllIcon} alt="All" /> <span>{instructorsCount}</span></h3>
                <div className='filter_oo'>
                  <p>Filter:</p>
                  <ul>
                    <li>
                      <label>
                        <input 
                          type="radio" 
                          name="sortOrder" 
                          checked={sortOrder === 'mostRecent'} 
                          onChange={() => handleFilterClick('mostRecent')} 
                          className='ChooseInput' 
                        /> 
                        Most Recent
                      </label>
                    </li>
                    <li>
                      <label>
                        <input 
                          type="radio" 
                          name="sortOrder" 
                          checked={sortOrder === 'old'} 
                          onChange={() => handleFilterClick('old')} 
                          className='ChooseInput' 
                        /> 
                        Old
                      </label>
                    </li>
                  </ul>
                </div>
               
              </div>
              <div className='Tabel_SecOo_main'>
                <InstructorsTable sortOrder={sortOrder} onInstructorsCountChange={handleInstructorsCountChange} />
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

export default InstructorPage;
