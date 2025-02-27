import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import CardLoader from './CardLoader';

import CourserIcon1 from '../assets/Img/student.png';
import CourserIcon2 from '../assets/Img/write.png';

const CareerCategoryPage = () => {
  const API_HOST = process.env.REACT_APP_API_HOST;
  const [slideCount, setSlideCount] = useState(0);
  const [isPrevVisible, setIsPrevVisible] = useState(false);
  const [isNextVisible, setIsNextVisible] = useState(true);
  const sliderRef = useRef(null);
  const [activeBtn, setActiveBtn] = useState('health');
  const [categories, setCategories] = useState([]);
  const [totalCourses, setTotalCourses] = useState(0);
  const [popularCategories, setPopularCategories] = useState([]);
  const [popularCoursesCount, setPopularCoursesCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // New state to track loading

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true); // Set loading to true when fetching data
      try {
        const response = await fetch(`${API_HOST}api/courses/category/`);
        const data = await response.json();
        const filteredCategories = data.filter(category => category.mainCategory === 2);
        setCategories(filteredCategories);
        setSlideCount(filteredCategories.length); // Update slide count based on the number of categories
        setTotalCourses(filteredCategories.reduce((sum, category) => sum + category.courses.length, 0));
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    const fetchPopularCategories = async () => {
      setIsLoading(true); // Set loading to true when fetching data
      try {
        const response = await fetch(`${API_HOST}/api/courses/category/`);
        const data = await response.json();
        setPopularCategories(data);
        setPopularCoursesCount(data.reduce((sum, category) => sum + category.courses.length, 0));
      } catch (error) {
        console.error('Error fetching popular categories:', error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching data
      }
    };

    fetchCategories();
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

  return (
    <div>
      <Helmet>
        <title>Career Related Courses | A.R.T.S Training Services</title>
        <meta name="description" content="Career Related Courses | A.R.T.S Training Services" />
        <meta name="keywords" content="A.R.T.S, training services, accredited career courses" />
      </Helmet>

      <section className='Top-Courses-sec'>
        <div className='site-container'>
          <div className='porpular_Sec Carrt_Porls'>
            <div className='Hh_courses'>
              <div className='Hh_Box'>
                <div className='Hh_courses_Header'>
                  <h3 className='mid-text'>Career Related</h3>
                  <p className='p'>{categories.length} Categories, {totalCourses} courses</p>
                </div>
                <div className='Hh_Slider'>
                  <div className="slider-container">
                    <Slider {...settings} ref={sliderRef}>
                      {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                          <div className="slider-box" key={index}>
                            <div className='Hh_courses_Card'>
                              <CardLoader />
                            </div>
                          </div>
                        ))
                      ) : categories.length > 0 ? (
                        categories.map(category => (
                          <div className="slider-box" key={category.id}>
                            <div className='Hh_courses_Card'>
                              <Link to={`/courses/${category.id}`} className='course_card'>
                                <div className='course_card_banner'>
                                  <img src={category.image} alt={category.title} />
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
                        ))
                      ) : (
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
                  <p className='p'>{popularCategories.length} Categories, {popularCoursesCount} courses</p>
                </div>
                <div className='Hh_Slider'>
                  <div className="slider-container">
                    <Slider {...settings} ref={sliderRef}>
                      {isLoading ? (
                        Array.from({ length: 5 }).map((_, index) => (
                          <div className="slider-box" key={index}>
                            <div className='Hh_courses_Card'>
                              <CardLoader />
                            </div>
                          </div>
                        ))
                      ) : popularCategories.length > 0 ? (
                        popularCategories.map(category => (
                          <div className="slider-box" key={category.id}>
                            <div className='Hh_courses_Card'>
                              <Link to={`/courses/${category.id}`} className='course_card'>
                                <div className='course_card_banner'>
                                  <img src={category.image} alt={category.title} />
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
                        ))
                      ) : (
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
    </div>
  );
};

const NextArrow = ({ isVisible }) => (
  <button className={`slick-next ${isVisible ? 'visible' : 'hidden'}`}>
    <i className="fa fa-chevron-right"></i>
  </button>
);

const PrevArrow = ({ isVisible }) => (
  <button className={`slick-prev ${isVisible ? 'visible' : 'hidden'}`}>
    <i className="fa fa-chevron-left"></i>
  </button>
);

export default CareerCategoryPage;
