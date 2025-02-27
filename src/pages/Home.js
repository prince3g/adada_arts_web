import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import {useNavigate, Link } from 'react-router-dom'; // Import Link from react-router-dom
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import heroBanner from '../assets/Img/hero-banner.png';
import EuroIcon from '../assets/Img/euros-icon.svg';
import RecImg from '../assets/Img/rec-img.png';
import CardLoader from './CardLoader';

import CourserIcon1 from '../assets/Img/student.png';
import CourserIcon2 from '../assets/Img/write.png';

import CourseImg1 from '../assets/Img/coursesImg/1.jpeg';
import CourseImg2 from '../assets/Img/coursesImg/2.jpg';
import CourseImg3 from '../assets/Img/coursesImg/3.jpg';
import CourseImg4 from '../assets/Img/coursesImg/4.jpg';


import PartImg1 from '../assets/Img/part-cards/1.png';
import PartImg2 from '../assets/Img/part-cards/2.png';
import PartImg3 from '../assets/Img/part-cards/3.png';
import PartImg4 from '../assets/Img/part-cards/4.png';
import PartImg5 from '../assets/Img/part-cards/5.png';


import AbtImg1 from '../assets/Img/AbtImg1.png';
import AbtImg2 from '../assets/Img/AbtImg2.png';
import AbtImg3 from '../assets/Img/AbtImg3.png';


import CllaImg1 from '../assets/Img/CllaImg/1.png';
import CllaImg2 from '../assets/Img/CllaImg/2.png';
import CllaImg3 from '../assets/Img/CllaImg/3.png';

const Home = () => {

  const [slideCount, setSlideCount] = useState(0);
  const [isPrevVisible, setIsPrevVisible] = useState(false);
  const [isNextVisible, setIsNextVisible] = useState(true);
  const sliderRef = useRef(null);
  const [activeBtn, setActiveBtn] = useState('health');
  const [categories, setCategories] = useState([]);
 const API_HOST = process.env.REACT_APP_API_HOST;
  const [healthCategories, setHealthCategories] = useState([]);
  const [popularCategories, setPopularCategories] = useState([]);
  const [popularCoursesCount, setPopularCoursesCount] = useState(0);
  const [allCategories, setAllCategories] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);

  const [loading, setLoading] = useState(true);


  const [searchTerm, setSearchTerm] = useState('');
  
  

  const navigate = useNavigate(); // Initialize useNavigate

  function insertIntoUrl(url) {
    const insertString = "api/v1/free/";
    const insertPosition = url.indexOf("api/v1/free") + insertString.length;
    const updatedUrl = url.slice(0, insertPosition) + insertString + url.slice(insertPosition);
    return updatedUrl;
}
  useEffect(() => {
    // Update slide count based on the number of children in the slider
    setSlideCount(5); // Example count, update based on your dynamic content
  }, []);
  
  useEffect(() => {
    // Fetch data for Health and Social Care Courses
    const fetchHealthCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_HOST}api/courses/category/`);
        const data = await response.json();
     
        const filteredCategories = data.filter(category => category.mainCategory.name === "Health Care");
        setHealthCategories(filteredCategories);

        // console.log("filteredCategories")
        // console.log(filteredCategories)
        // console.log("filteredCategories")

        setSlideCount(filteredCategories.length); // Update slide count based on filtered categories
  
        // Calculate total courses
        const totalCourses = filteredCategories.reduce((sum, category) => sum + category.courses.length, 0);
        setTotalCourses(totalCourses);
      } catch (error) {
        console.error('Error fetching health categories:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchHealthCategories();
  }, []);
  
  useEffect(() => {
    // Fetch data for Leadership Courses
    const fetchLeadershipCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_HOST}api/courses/category/`);
        const data = await response.json();
        const filteredCategories = data.filter(category => category.mainCategory.id === 2);

        setCategories(filteredCategories);
        setSlideCount(filteredCategories.length); // Update slide count based on filtered categories
  
        // Calculate total courses
        const totalCourses = filteredCategories.reduce((sum, category) => sum + category.courses.length, 0);
        setTotalCourses(totalCourses);
      } catch (error) {
        console.error('Error fetching leadership categories:', error);
      } finally {
        setLoading(false);
      }
    };
  
    // Fetch popular courses separately if needed
    const fetchPopularCategories = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_HOST}api/courses/category/`);
        const data = await response.json();
        setPopularCategories(data);
        setPopularCoursesCount(data.reduce((sum, category) => sum + category.courses.length, 0));
      } catch (error) {
        console.error('Error fetching popular categories:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchLeadershipCategories();
    fetchPopularCategories();
  }, []);
  
  const handleBeforeChange = (current, next) => {
    if (sliderRef.current) {
      const { slideCount, currentSlide } = sliderRef.current.props;
      setIsPrevVisible(currentSlide > 0);
      setIsNextVisible(currentSlide < slideCount - 1);
    }
  };
  
  const handleBtnClick = (btnType) => {
    setActiveBtn(btnType);
  };
  
  const settings = {
    dots: false,
    infinite: slideCount > 1,
    speed: 500,
    draggable: false,
    slidesToShow: 5,
    slidesToScroll: 1,
    beforeChange: handleBeforeChange,
    nextArrow: <NextArrow isVisible={isNextVisible} />,
    prevArrow: <PrevArrow isVisible={isPrevVisible} />,
    responsive: [
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: slideCount >= 4 ? 4 : 1,
          slidesToScroll: 1,
          infinite: slideCount > 1,
          dots: false
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: slideCount >= 3 ? 3 : 1,
          slidesToScroll: 1,
          infinite: slideCount > 1,
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: slideCount >= 2 ? 2 : 1,
          slidesToScroll: 1,
          infinite: slideCount > 1,
          initialSlide: 2
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: slideCount > 1
        }
      }
    ]
  };

  const handleSearch = async () => {
    if (searchTerm) {
      try {
        const response = await fetch(`${API_HOST}api/courses/search/?q=${encodeURIComponent(searchTerm)}`);
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
    <div>
      <Helmet>
        <title>Accredited Recognized Training Solutions | A.R.T.S Training Services</title>
        <meta name="description" content="Accredited Recognized Training Solutions" />
        <meta name="keywords" content="A.R.T.S, training services, accredited health courses" />
      </Helmet>

      <header className='header-sec'>
        <div className='mid-container'>
          <div className='main-header'>
            <div className='header-hero'>
              <div className='hero_Txt'>
                <div>
                  <h3><span className='courses-span'>A.R.T.S Courses</span> <Link to='/arts-training'><span></span> A.R.T.S Training</Link></h3>
                  <h1 className='big-text'>Accredited Recognized Training <span>Solutions</span></h1>
                  <p className='big-p'>We offer bespoke mandatory, induction and accredited training for all care providers and other professionals.</p>
                  
                  <div className='Main_Course_Search'>
                    <input type='text' placeholder='What do you want to learn today?' value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={handleKeyDown}/>
                    <button onClick={handleSearch}>Search courses</button>
                  </div>

                  <div className='hero-foot mobile-hero-foot'>
              <div className='hero_Selt_Btns'>
                <a href='#'>Online courses</a>
                <a href='#'>On Demand courses</a>
                <a href='#' className='free-icon'>
                  <img src={EuroIcon} alt="Euro Icon" />Free courses
                </a>
              </div>

              <div className='rec-Sec'>
                <span>Recognized by:</span>
                <img src={RecImg} alt="Recognition Image" />
              </div>
            </div>

                </div>
              </div>
              <div className='hero_Banner'>
                <img src={heroBanner} alt="Hero Banner" />
              </div>
            </div>

            <div className='hero-foot'>
              <div className='hero_Selt_Btns'>
                <a href='#'>Online courses</a>
                <a href='#'>On Demand courses</a>
                <a href='#' className='free-icon'>
                  <img src={EuroIcon} alt="Euro Icon" />Free courses
                </a>
              </div>

              <div className='rec-Sec'>
                <span>Recognized by:</span>
                <img src={RecImg} alt="Recognition Image" />
              </div>
            </div>
          </div>
        </div>
      </header>

      <section className='Cllao_Sec'>
        <div className='site-container'>
          <ul>
            <li>
              <div><img src={CllaImg1}></img></div>
              <div>
                <p>Accredited courses for you</p>
                <span>All our courses are accreted and have interesting topics </span>
              </div>
            </li>

            <li>
            <div><img src={CllaImg2}></img></div>
              <div>
                <p>24/7 support</p>
                <span>Our support system is dedicated to providing continuous, and efficient assistance to you </span>
              </div>
            </li>

            <li>
            <div><img src={CllaImg3}></img></div>
              <div>
                <p>Amazing learning experience</p>
                <span>Engage your workforce with our mandatory and induction courses.  </span>
              </div>
            </li>
          </ul>
        </div>
      </section>

      <section className='Top-Courses-sec'>
  <div className='site-container'>
    <div className='top-Sec-Intro'>
      <h2 className='mid-text'>Extensive variety of courses</h2>
      <p className='p'>We provide an extensive variety of courses, carefully tailored to meet your individual needs and interests, ensuring you receive the best possible learning experience.</p>
      <ul className='rend-btn'>
        <li
          className={`health-rend-btn ${activeBtn === 'health' ? 'active-rend-btn' : ''}`}
          onClick={() => handleBtnClick('health')}
        >
          Industry Sector
        </li>
        <li
          className={`leadership-rend-btn ${activeBtn === 'leadership' ? 'active-rend-btn' : ''}`}
          onClick={() => handleBtnClick('leadership')}
        >
          Career Related
        </li>
      </ul>
    </div>

    <div className='Hh_courses'>
      <div className={`Hh_Box Health_Hh_Box ${activeBtn === 'health' ? 'active_Hh_Box' : ''}`}>
        <div className='Hh_courses_Header'>
          <h3 className='mid-text'>Industry Sector</h3>
          <p className='p'>{healthCategories.length} Categories, {totalCourses} courses</p>
        </div>
        <div className='Hh_Slider'>
          <div className="slider-container">
            <Slider {...settings} ref={sliderRef}>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div className="slider-box" key={index}>
                    <div className='Hh_courses_Card'>
                      <CardLoader />
                    </div>
                  </div>
                ))
              ) : healthCategories.length > 0 ? healthCategories.map(category => (
                <div className="slider-box" key={category.id}>
                  <div className='Hh_courses_Card'>
                    <Link to={`/courses/${category.id}`} className='course_card'>
                      <div className='course_card_banner'>
                        <img src={insertIntoUrl(category.image)} alt={category.title} />
                      </div>
                      <div className='course_card_dlt'>
                        <h3>{category.title}</h3>
                        <span><img src={CourserIcon1} alt="Icon 1" />Industry Sector</span>
                        <span><img src={CourserIcon2} alt="Icon 2" />
                          {category.courses.length} {category.courses.length === 1 ? 'course' : 'courses'}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )) : (
                <div className="slider-box">
                  <CardLoader />
                </div>
              )}
            </Slider>
          </div>
        </div>
      </div>

      <div className={`Hh_Box Leadersip_Hh_Box ${activeBtn === 'leadership' ? 'active_Hh_Box' : ''}`}>
        <div className='Hh_courses_Header'>
          <h3 className='mid-text'>Career Related</h3>
          <p className='p'>{categories.length} Categories, {totalCourses} courses</p>
        </div>
        <div className='Hh_Slider'>
          <div className="slider-container">
            <Slider {...settings} ref={sliderRef}>
              {loading ? (
                Array.from({ length: 5 }).map((_, index) => (
                  <div className="slider-box" key={index}>
                    <div className='Hh_courses_Card'>
                      <CardLoader />
                    </div>
                  </div>
                ))
              ) : categories.length > 0 ? categories.map(category => (
                <div className="slider-box" key={category.id}>
                  <div className='Hh_courses_Card'>
                    <Link to={`/courses/${category.id}`} className='course_card'>
                      <div className='course_card_banner'>
                        <img src={insertIntoUrl(category.image)} alt={category.title} />
                      </div>
                      <div className='course_card_dlt'>
                        <h3>{category.title}</h3>
                        <span>
                          <img src={CourserIcon1} alt="Icon 1" />
                          {category.mainCategory === 2 ? 'Industry Sector' : 'Career Related'}
                        </span>
                        <span>
                          <img src={CourserIcon2} alt="Icon 2" />
                          {category.courses.length} {category.courses.length === 1 ? 'course' : 'courses'}
                        </span>
                      </div>
                    </Link>
                  </div>
                </div>
              )) : (
                <div className="slider-box">
                  <CardLoader />
                </div>
              )}
            </Slider>
          </div>
        </div>
      </div>
    </div>

    <div className='porpular_Sec'>
      <div className='Hh_courses'>
        <div className='Hh_Box'>
          <div className='Hh_courses_Header'>
            <h3 className='mid-text'>Popular courses</h3>
            <p className='p'>{popularCategories.length} Categories, {popularCoursesCount} courses</p>
          </div>
          <div className='Hh_Slider'>
            <div className="slider-container">
              <Slider {...settings} ref={sliderRef}>
                {loading ? (
                  Array.from({ length: 5 }).map((_, index) => (
                    <div className="slider-box" key={index}>
                      <div className='Hh_courses_Card'>
                        <CardLoader />
                      </div>
                    </div>
                  ))
                ) : popularCategories.length > 0 ? popularCategories.map(category => (
                  <div className="slider-box" key={category.id}>
                    <div className='Hh_courses_Card'>
                      <Link to={`/courses/${category.id}`} className='course_card'>
                        <div className='course_card_banner'>
                          <img src={insertIntoUrl(category.image)} alt={category.title} />
                        </div>
                        <div className='course_card_dlt'>
                          <h3>{category.title}</h3>
                          <span>
                            <img src={CourserIcon1} alt="Icon 1" />
                            {category.mainCategory === 2 ? 'Career Related' : 'Industry Sector'}
                          </span>
                          <span>
                            <img src={CourserIcon2} alt="Icon 2" />
                            {category.courses.length} {category.courses.length === 1 ? 'course' : 'courses'}
                          </span>
                        </div>
                      </Link>
                    </div>
                  </div>
                )) : (
                  <div className="slider-box">
                    <CardLoader />
                  </div>
                )}
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      <section className='Maihs_sec'>
        <div className='mid-container'>        
     
        <div className='Abt_Sec'>
          
        <div className='Abt_Banner'>
              <img src={AbtImg1}></img>
            </div>

            <div className='Abt_Dlt'>
              <div>
                <h2 className='Semi-mid-text'>Amazing learning experience with A.R.T.S</h2>
                <ul>
                  <li>
                    <p>Virtual learning</p>
                    <span className='p'>The UK’s most respected and recognised courses delivered in an interactive, live online classroom.</span>
                  </li>
                  <li>
                    <p>Classroom learning</p>
                    <span className='p'>Attend a training course in a specialist, quiet and focused environment.</span>
                  </li>
                  <li>
                    <p>E-Learning</p>
                    <span className='p'>Pre-recorded assets allow you to study for your qualification in your own time, wherever you are.</span>
                  </li>
                </ul>
              </div>
              
            </div>

          </div>

          </div>
      </section>


      <section className='site-Top-section'>
        <div className='mid-container'>
          
        <div className='Part_Sec'>
            <h3 className='mid-text'>A.R.T.S trusted partners</h3>
            <ul>
              <li><img src={PartImg1}></img> <p>Adada</p></li>
              <li><img src={PartImg2}></img><p>XCTP</p></li>
              <li><img src={PartImg3}></img><p>Proliance LTD</p></li>
              {/* <li><img src={PartImg4}></img><p></p></li> */}
              <li><img src={PartImg5}></img><p>Lacklearn</p></li>
            </ul>
          </div>

        <div className='Abt_Sec'>
            
            <div className='Abt_Dlt'>
              <div>
                <h2 className='Semi-mid-text'>Improving lives through learning</h2>
               <p className='p'>Engage your workforce with our mandatory and induction courses. We provide all the learning your workforce needs to be compliant with CQC and Skills for Care requirements</p>

            <div className='Abt_Btns'>
             <a href='#'>Learn more</a>
             <a href='#' className='train_btn'>A.R.T.S Training</a>
            </div>
              
              </div>
              
            </div>
            <div className='Abt_Banner'>
              <img src={AbtImg2}></img>
            </div>

            </div>


        </div>
        
      </section>



      <section className='Maihs_sec Glans_Bg'>
        <div className='mid-container'>        
     
        <div className='Abt_Sec'>
            
            <div className='Abt_Dlt'>
              <div>
                <h2 className='Semi-mid-text'>Learn. Innovate. Improve</h2>
               <p className='p'>Virtual, classroom and e-learning skills development courses designed to help your people and businesses achieve.</p>

            <div className='Abt_Btns'>
             <a href='#'>Get started</a>
            </div>
              
              </div>
              
            </div>
            <div className='Abt_Banner'>
              <img src={AbtImg3}></img>
            </div>

            </div>

          </div>
      </section>


   


    </div>
  );
}

const NextArrow = ({ className, style, onClick, isVisible }) => (
  <div
    className={`${className} ${!isVisible ? 'hidden' : ''}`}
    style={{ ...style, display: 'block' }}
    onClick={onClick}
  />
);

const PrevArrow = ({ className, style, onClick, isVisible }) => (
  <div
    className={`${className} ${!isVisible ? 'hidden' : ''}`}
    style={{ ...style, display: 'block' }}
    onClick={onClick}
  />
);

export default Home;
