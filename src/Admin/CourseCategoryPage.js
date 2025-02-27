import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AllIcon from './Img/all-arrow.svg';
import PrintIcon from './Img/print-icon.svg';
import DailyUsage from './DailyUsage';
import SubAaNav from './SubAaNav';
import CategoryTable from './CategoryTable';
import DeletAlIcon from './Img/delete-icon.svg';
import MarkAllIcon from './Img/mark-all-icon.svg';
import CourseUpload from './CourseUpload'; 
import AddInstructor from './AddInstructor';
import AddCategory from './AddCategory';
import ADDNotice from './AddNotice';
import 'react-calendar/dist/Calendar.css'; // Import the calendar styles

function CourseCategoryPage() {
  const API_HOST = process.env.REACT_APP_API_HOST;
  const [showCategoryUpload, setShowCategoryUpload] = useState(false);
  const [showAddInstructor, setShowAddInstructor] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [showAddNotice, setShowAddNotice] = useState(false);
  const [allMarked, setAllMarked] = useState(false);
  const [sortOrder, setSortOrder] = useState('mostRecent'); // Default sorting
  const [showCalendar, setShowCalendar] = useState(false);
  const [date, setDate] = useState(new Date());
  const [categories, setCategories] = useState([]); // State for categories
  const [loading, setLoading] = useState(true); // Loading state

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_HOST}/api/courses/category/`);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Stop loading when the data is fetched
      }
    };

    fetchCategories();
  }, []);

  const handleCloseCategoryUpload = () => setShowCategoryUpload(false);
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

  // Format date as Mon Day, Year (e.g., Aug 16, 2024)
  const formattedDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className='Main_AA_Page'>
      <div className='Page_Top'>
        <div className='site-container'>
          <div className='Main_Page_Top'>
            <div className='Left_AA_Pp_Sec'>
              <h2>Course Categories</h2>
              <p>You have about <b>{categories.length}</b> uploaded categories</p> {/* Displaying the count */}
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
                <h3>Uploaded Categories <img src={AllIcon} alt="All" /> <span>{categories.length}</span></h3> {/* Displaying the count */}
                <div className='filter_oo'>
                  <p>Filter:</p>
                  <ul>
                    <li>
                      <label>
                        <input 
                          type="checkbox" 
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
                          type="checkbox" 
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
                <CategoryTable categories={categories} sortOrder={sortOrder} />  {/* Passing categories and sortOrder as props */}
              </div>
            </div>
          
          </div>
          <div className='DD_Ccs_2'>
            <DailyUsage />
          </div>
        </div>
      </div>

      {showCategoryUpload && <CourseUpload onClose={handleCloseCategoryUpload} />}
      {showAddInstructor && <AddInstructor onClose={handleCloseAddInstructor} />}
      {showAddCategory && <AddCategory onClose={handleCloseAddCategory} />}
      {showAddNotice && <ADDNotice onClose={handleCloseAddNotice} />}
    </div>
  );
}

export default CourseCategoryPage;
