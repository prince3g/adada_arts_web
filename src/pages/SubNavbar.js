import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Import Link for navigation
import SearchIcon from '../assets/Img/search-icon.svg';
import ArrowDownIcon from '../assets/Img/arrow-down.svg';

const SubNavbar = ({ isSubNavVisible }) => {
  const [industryCategories, setIndustryCategories] = useState([]);
  const [careerCategories, setCareerCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://cmvp.net/api/v1/free/api/courses/category/');
        const data = await response.json();

        const industry = data.filter(category => category.mainCategory.name === "Health Care");
        const career = data.filter(category => category.mainCategory.id === 2);

        setIndustryCategories(industry);
        setCareerCategories(career);

      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await fetch(`https://cmvp.net/api/v1/free/api/courses/search/?q=${encodeURIComponent(searchTerm)}`);
        const data = await response.json();
        
        // Navigate to the search results page with searchTerm as query parameter
        navigate(`/search?q=${encodeURIComponent(searchTerm)}`, { state: { searchResults: data } });
      } catch (error) {
        console.error('Error searching courses:', error);
      }
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <nav className={`Sub_Nav ${isSubNavVisible ? '' : 'hide-sub-navbar'}`}>
      <div className='site-container'>
        <div className='Sub_Nav_Content'>
          <div className='SubNav_L'>
            <ul className='SsL_Ull'>
              {industryCategories.length > 0 && (
                <li>
                  <Link to='/industry-sector' className='Ssshs-Icon'>
                    Industry Sector
                    <img src={ArrowDownIcon} alt="Arrow-down Icon" />
                  </Link>
                  <div className='Courses_DropDown'>
                    <ul>
                      {industryCategories.map(category => (
                        <li key={category.id}>
                          <Link to={`/courses?name=${encodeURIComponent(category.title)}&id=${category.id}&Maincategory=Industry Sector`}>
                            {category.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              )}
              {/* {careerCategories.length > 0 && ( */}
                <li>
                  <Link to='/career-related'>
                    Career Related
                    <img src={ArrowDownIcon} alt="Arrow-down Icon" />
                  </Link>
                  <div className='Courses_DropDown'>
                    <ul>
                      {careerCategories.map(category => (
                        <li key={category.id}>
                          <Link to={`/courses?name=${encodeURIComponent(category.title)}&id=${category.id}&Maincategory=Career Related`}>
                            {category.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              {/* )} */}
            </ul>
          </div>
          <div className='SubNav_R'>
            <div className='Search_Sec'>
              <input 
                type='text' 
                placeholder='Search for a course' 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown} // Add the key down handler
              />
              <button onClick={handleSearch}>
                <img src={SearchIcon} alt="Search Icon" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default SubNavbar;
