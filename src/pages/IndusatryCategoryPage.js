import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CardLoader from './CardLoader';

import CourserIcon1 from '../assets/Img/student.png';
import CourserIcon2 from '../assets/Img/write.png';
import CourseImg2 from '../assets/Img/coursesImg/2.jpg';
import AbtImg4 from '../assets/Img/AbtImg4.png';

const IndustryCategoryPage = () => {
  const API_HOST = process.env.REACT_APP_API_HOST;
  const [slideCount, setSlideCount] = useState(0);
  const [isPrevVisible, setIsPrevVisible] = useState(false);
  const [isNextVisible, setIsNextVisible] = useState(true);
  const sliderRef = useRef(null);
  const [activeBtn, setActiveBtn] = useState('industry');
  const [industryCategories, setIndustryCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [loading, setLoading] = useState(true); // Add loading state


  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const response = await fetch(`${API_HOST}api/courses/category/`);
        const data = await response.json();
        const filteredCategories = data.filter(category => category.mainCategory.id === 1);
        setIndustryCategories(filteredCategories);
        setSlideCount(filteredCategories.length);

        
        // console.log("filteredCategories")
        // console.log(filteredCategories)
        // console.log("filteredCategories")
        


        const totalCourses = filteredCategories.reduce((sum, category) => sum + category.courses.length, 0);
        setTotalCourses(totalCourses);
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAllCategories = async () => {
      setLoading(true); // Set loading to true when fetching data
      try {
        const response = await fetch(`${API_HOST}api/courses/category/`);
        const data = await response.json();
        setAllCategories(data);
      } catch (error) {
        console.error('Error fetching all categories:', error);
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    fetchAllCategories();
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
    infinite: true,
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
          slidesToShow: 4,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 1100,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };

  return (
    <div>
      <Helmet>
        <title>Industry Sector Courses | A.R.T.S Training Services</title>
        <meta name="description" content="Explore our Industry Sector courses at A.R.T.S Training Services." />
        <meta name="keywords" content="A.R.T.S, training services, industry sector courses" />
      </Helmet>

      <section className='Top-Courses-sec'>
        <div className='site-container'>
          <div className='porpular_Sec Carrt_Porls'>
            <div className='Hh_courses'>
              <div className='Hh_Box'>
                <div className='Hh_courses_Header'>
                  <h3 className='mid-text'>Industry Sector1111</h3>
                  <p className='p'>{industryCategories.length} Categories, {totalCourses} courses</p>
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
                      ) : industryCategories.length > 0 ? industryCategories.map(category => (
                        <div className="slider-box" key={category.id}>
                          <div className='Hh_courses_Card'>
                            <Link to={`/courses/${category.id}`} className='course_card'>
                              <div className='course_card_banner'>
                                <img src={category.image} alt={category.title} />
                              </div>
                              <div className='course_card_dlt'>
                                <h3>{category.title}</h3>
                                <span><img src={CourserIcon1} alt="Icon 1" />Industry Sector Courses</span>
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
            </div>
          </div>

          <div className='courses_For_You'>
            <div className='Hh_courses'>
              <div className='Hh_Box'>
                <div className='Hh_courses_Header'>
                  <h3 className='mid-text'>Popular courses</h3>
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
                      ) : allCategories.length > 0 ? allCategories.map(category => (
                        <div className="slider-box" key={category.id}>
                          <div className='Hh_courses_Card'>
                            <Link to={`/courses/${category.id}`} className='course_card'>
                              <div className='course_card_banner'>
                                <img src={category.image} alt={category.title} />
                              </div>
                              <div className='course_card_dlt'>
                                <h3>{category.title}</h3>
                                <span><img src={CourserIcon1} alt="Icon 1" />{category.mainCategory === 1 ? 'Industry Sector' : 'Career Related'}</span>
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
            </div>
          </div>
        </div>
      </section>

      {/* <section className='Maihs_sec'>
        <div className='mid-container'>
          <div className='Abt_Sec'>
            <div className='Abt_Dlt'>
              <div>
                <h2 className='Semi-mid-text'>Our Industry Sector Courses</h2>
                <p className='p'>Our industry sector courses offer comprehensive training in various fields, preparing students for real-world challenges and opportunities.</p>
              </div>
              <div className='Abt_Img'>
                <img src={AbtImg4} alt="Industry Sector Courses" />
              </div>
            </div>
          </div>
        </div>
      </section> */}
    </div>
  );
};

const NextArrow = ({ isVisible, ...props }) => (
  <div {...props} className={`slick-arrow next-arrow ${isVisible ? 'visible' : 'hidden'}`} />
);

const PrevArrow = ({ isVisible, ...props }) => (
  <div {...props} className={`slick-arrow prev-arrow ${isVisible ? 'visible' : 'hidden'}`} />
);

export default IndustryCategoryPage;
