// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// import CourseUploadIcon from './Img/course-upload-icon.svg';
// import AssessmentUploadIcon from './Img/assessment-upload-icon.svg';
// import TimeIcon from './Img/time-icon.svg';
// import AllIcon from './Img/all-arrow.svg';
// import PlusIcon from './Img/plus-icon.svg';

// import MessageEditor from './MessageEditor';
// import Assessment from './Assessment';
// import AddInstructor from './AddInstructor';
// import AddCategory from './AddCategory';

// import Alert from './Alert';  // Import the Alert component

// import Loader from './Img/loader.gif';

// const CourseUpload = ({ onClose }) => {
//   const [courseDescription, setCourseDescription] = useState('');
//   const [selectedDays, setSelectedDays] = useState(1); // Default to 1 day
//   const [lessonTimes, setLessonTimes] = useState([{ startTime: '', endTime: '' }]);
//   const [activeSection, setActiveSection] = useState('addCourse'); // Default to 'addCourse'
//   const [showAddInstructor, setShowAddInstructor] = useState(false); // State for Add Instructor
//   const [showAddCategory, setShowAddCategory] = useState(false); // State for Add Category

//   const [instructors, setInstructors] = useState([]); // State to store fetched instructors
//   const [categories, setCategories] = useState([]); // State to store fetched categories

//   const [loading, setLoading] = useState(false);

//   const [courseTitle, setCourseTitle] = useState('');
//   const [amount, setAmount] = useState('');
//   const [courseCode, setCourseCode] = useState('');
//   const [courseStatus, setCourseStatus] = useState('qualifications'); // Default value
//   const [courseType, setCourseType] = useState('online'); // Default value
//   const [courseDuration, setCourseDuration] = useState('');
//   const [accreditedCourses, setAccreditedCourses] = useState(false); // Boolean state
//   const [selectedInstructor, setSelectedInstructor] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState('');

//   const token = localStorage.getItem("authToken");

//   const navigate = useNavigate(); // Initialize useNavigate hook

//   const [alert, setAlert] = useState({ message: '', type: '', hidden: true });  // State for alert


//   useEffect(() => {
//     // Fetch instructors from the API
//     const fetchInstructors = async () => {
//       try {
//         const response = await fetch('https://cmvp.net/api/v1/free/api/courses/instructors/');
//         if (!response.ok) {
//           throw new Error('Failed to fetch instructors');
//         }
//         const data = await response.json();

//         setInstructors(data); // Store the instructors in state
//         setLoading(false); // Set loading to false
//       } catch (error) {
//         console.error('Error fetching instructors:', error);
//         setLoading(false);
//       }
//     };

//     // Fetch categories from the API
//     const fetchCategories = async () => {
//       try {
//         const response = await fetch('https://cmvp.net/api/v1/free/api/courses/category/');
//         if (!response.ok) {
//           throw new Error('Failed to fetch categories');
//         }
//         const data = await response.json();
//         setCategories(data); // Store the categories in state
//       } catch (error) {
//         console.error('Error fetching categories:', error);
//       }
//     };

//     fetchInstructors();
//     fetchCategories();
//   }, []);
  

//   const handleSend = async () => {
//     setLoading(true);
  
//     // Validate selections
//     if (!selectedInstructor || !selectedCategory) {
//       setAlert({ message: 'Please select an instructor and category.', type: 'error', hidden: false });
//       setLoading(false);
//       return;
//     }
  
//     const courseData = {
//       title: courseTitle,
//       details: courseDescription,
//       amount: amount,
//       course_code: courseCode,
//       course_status: courseStatus,
//       course_type: courseType,
//       duration: courseDuration,
//       days_per_week: selectedDays,
//       accredited_courses: accreditedCourses || false,
//       category: parseInt(selectedCategory),
//       instructor_id: parseInt(selectedInstructor),
//     };
  
//     try {
//       const response = await fetch('http://127.0.0.1:9090/api/courses/courses/', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           // Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify(courseData),
//       });
  
//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(`Failed to send data: ${errorData.message || 'Unknown error'}`);
//       }
  
//       setAlert({ message: 'Course uploaded successfully!', type: 'success', hidden: false });
//       setTimeout(() => navigate('a-courses'), 1500);
//     } catch (error) {
//       console.error('Error sending data:', error.message);
//       setAlert({ message: `Error: ${error.message}`, type: 'error', hidden: false });
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   const handleDaysChange = (e) => {
//     const days = parseInt(e.target.value);
//     setSelectedDays(days);

//     // Adjust lesson times array based on selected days
//     setLessonTimes(Array(days).fill({ startTime: '', endTime: '' }));
//   };

//   const handleTimeChange = (index, field, value) => {
//     const newLessonTimes = [...lessonTimes];
//     newLessonTimes[index] = {
//       ...newLessonTimes[index],
//       [field]: value,
//     };
//     setLessonTimes(newLessonTimes);
//   };

//   const handleAddInstructorClick = () => {
//     setShowAddInstructor(true);
//     setShowAddCategory(false); // Ensure the category form is hidden when instructor is shown
//   };

//   const handleAddCategoryClick = () => {
//     setShowAddCategory(true);
//     setShowAddInstructor(false); // Ensure the instructor form is hidden when category is shown
//   };

//   const handleCloseAddInstructor = () => {
//     setShowAddInstructor(false);
//   };

//   const handleCloseAddCategory = () => {
//     setShowAddCategory(false);
//   };

//   return (
//     <div className='course-upload'>
//       <div className='upload-env'>
//       <Alert 
//         type={alert.type} 
//         message={alert.message} 
//         onClose={() => setAlert({ ...alert, hidden: true })} 
//         hidden={alert.hidden} 
//       />
      
//         <div className='top_Cc_upoload'>
//           <div className='Cc_Kl'>
//             <div className='Cc_title'>
//               <h3>
//                 {activeSection === 'addCourse' && 'Add Course'}
//                 {activeSection === 'setLearningTime' && 'Set Learning Time'}
//                 {activeSection === 'addAssessment' && 'Add Assessment'}
//               </h3>
//             </div>
//             <span className='gap_img'><img src={AllIcon} alt="All" /></span>
//             <div className='Cc_Btns_1'>
//               <button
//                 className={activeSection === 'addCourse' ? 'active_Upload_btn' : ''}
//                 onClick={() => setActiveSection('addCourse')}
//               >
//                 <img src={CourseUploadIcon} alt="Add Course" /> Add Course
//               </button>
//               <button
//                 className={activeSection === 'setLearningTime' ? 'active_Upload_btn' : ''}
//                 onClick={() => setActiveSection('setLearningTime')}
//               >
//                 <img src={TimeIcon} alt="Set Learning Time" /> Set Learning Time
//               </button>
//               <button
//                 className={activeSection === 'addAssessment' ? 'active_Upload_btn' : ''}
//                 onClick={() => setActiveSection('addAssessment')}
//               >
//                 <img src={AssessmentUploadIcon} alt="Add Assessment" /> Add Assessment
//               </button>
//             </div>
//           </div>
//           <div className='Cc_Btns_2'>
//             {/* <button className='uploadCc_Main_btn' onClick={handleSend}>Upload course</button> */}

//             <button
//               className='proceed_Main_btn'
//               onClick={handleSend}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <span>Uploading...</span>
//                   <img src={Loader} alt="Loading..." className='loader' />
//                 </>
//               ) : (
//                 'Upload course'
//               )}
//             </button>

//             <button onClick={onClose}>Close</button> {/* Use onClose prop here */}
//           </div>
//         </div>
//         <div className='Main_Cc_upload'>
//           {/* Conditionally render AddInstructor and AddCategory */}
//           {activeSection === 'addCourse' && showAddInstructor && (
//             <AddInstructor onClose={handleCloseAddInstructor} />
//           )}
//           {activeSection === 'addCourse' && showAddCategory && (
//             <AddCategory onClose={handleCloseAddCategory} />
//           )}

//           {!showAddInstructor && !showAddCategory && activeSection === 'addCourse' && (
//             <div className='Add_Course_Box ClasiK'>
//               <div className='Box_ClasiK'>
//                 <div className='Upload_Input'>
//                   <p>Course instructor</p>
//                   <div className='Upload_Input_main'>
                   
//                     <select
//                       onChange={(e) => setSelectedInstructor(e.target.value)}
//                       value={selectedInstructor}
//                     >
//                       <option value="">Select Instructor</option>
//                       {instructors.map(instructor => (
//                         <option key={instructor.id} value={instructor.id}>
//                           {`${instructor.first_name} ${instructor.last_name}`}
//                         </option>
//                       ))}
//                     </select>
//                     <span
//                       className='Add_Span Upload_instructor_btn'
//                       onClick={handleAddInstructorClick}
//                     >
//                       <img src={PlusIcon} alt="Add" />
//                     </span>
//                   </div>
//                 </div>

//                 <div className='Upload_Input'>
//                   <p>Course category</p>
//                   <div className='Upload_Input_main'>

//                     <select
//                       onChange={(e) => setSelectedCategory(e.target.value)}
//                       value={selectedCategory}
//                     >
//                       <option value="">Select Category</option>
//                       {categories.map(category => (
//                         <option key={category.id} value={category.id}>
//                           {category.title}
//                         </option>
//                       ))}
//                     </select>
//                     <span
//                       className='Add_Span Upload_category_btn'
//                       onClick={handleAddCategoryClick}
//                     >
//                       <img src={PlusIcon} alt="Add" />
//                     </span>
//                   </div>
//                 </div>

//                 <div className='Upload_Input'>
//                   <p>Course status</p>
//                   <div className='Upload_Input_main'>
                
//                     <select
//                         onChange={(e) => setCourseStatus(e.target.value)}
//                         value={courseStatus}
//                       >
//                         <option>Select course status </option>
//                         <option value="qualifications">Qualifications</option>
//                         <option value="courses">Courses</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>

//               <div className='Box_ClasiK'>
//                 <div className='Upload_Input'>
//                   <p>Study type</p>
//                   <div className='Upload_Input_main'>
//                    <select
//                       onChange={(e) => setCourseType(e.target.value)}
//                       value={courseType}
//                     >
//                        <option>Select study type</option>
//                       <option value="online">Online</option>
//                       <option value="on demand">On Demand</option>
//                       <option value="class room">Class Room</option>
//                     </select>
                    
//                   </div>
//                 </div>

//                 <div className='Upload_Input'>
//                   <p>Price</p>
//                   <div className='Upload_Input_main'>
//                   <input
//                     type="number"
//                     placeholder='Enter course price (£)'
//                     value={amount}
//                     onChange={(e) => setAmount(e.target.value)}
//                   />
//                   </div>
//                 </div>
//               </div>

//               <div className='Box_ClasiK'>
//                 <div className='Upload_Input'>
//                   <p>Course code</p>
//                   <div className='Upload_Input_main'>
//                     <input
//                       type='text'
//                       placeholder='Enter course code'
//                       value={courseCode}
//                       onChange={(e) => setCourseCode(e.target.value)}
//                     />
//                   </div>
//                 </div>

//                 <div className='Upload_Input'>
//                   <p>Course title</p>
//                   <div className='Upload_Input_main'>
//                   <input
//                     type="text"
//                     placeholder="Course Title"
//                     value={courseTitle}
//                     onChange={(e) => setCourseTitle(e.target.value)}
//                   />
                    
//                   </div>
//                 </div>

//                 <div className='Upload_Input'>
//                   <p>Course duration</p>
//                   <div className='Upload_Input_main'>
//                     <input
//                       type='text'
//                       placeholder ='Enter course duration'
//                       value={courseDuration}
//                       onChange={(e) => setCourseDuration(e.target.value)}
//                     />
//                   </div>
//                 </div>
//               </div>

//               <div className='Box_ClasiK'>
//                 <div className='Upload_Input'>
//                   <p>Course description</p>
//                   <MessageEditor
//                   value={courseDescription}
//                   onChange={(newValue) => setCourseDescription(newValue)}
//                   placeholder='Enter course description'
              
//               />
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeSection === 'setLearningTime' && (
//             <div className='Add_Course_Box'>
//               <div className='Box_ClasiK'>
//                 <div className='Upload_Input'>
//                   <p>Number of days</p>
//                   <div className='Upload_Input_main'>
//                     <input
//                       type="number"
//                        min='1'
//                       placeholder="Days per Week"
//                       value={selectedDays}
//                       onChange={(e) => setSelectedDays(parseInt(e.target.value))}
//                     />
//                   </div>
//                 </div>
//               </div>

//               {lessonTimes.map((_, index) => (
//                 <div className='Box_ClasiK' key={index}>
//                   <div className='Upload_Input'>
//                     <p>Lesson {index + 1} start time</p>
//                     <div className='Upload_Input_main'>
//                       <input
//                         type='time'
//                         value={lessonTimes[index].startTime}
//                         onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   <div className='Upload_Input'>
//                     <p>Lesson {index + 1} end time</p>
//                     <div className='Upload_Input_main'>
//                       <input
//                         type='time'
//                         value={lessonTimes[index].endTime}
//                         onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           )}

//           {activeSection === 'addAssessment' && <Assessment />}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseUpload;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import CourseUploadIcon from './Img/course-upload-icon.svg';
import AssessmentUploadIcon from './Img/assessment-upload-icon.svg';
import TimeIcon from './Img/time-icon.svg';
import AllIcon from './Img/all-arrow.svg';
import PlusIcon from './Img/plus-icon.svg';

import MessageEditor from './MessageEditor';
import Assessment from './Assessment';
import AddInstructor from './AddInstructor';
import AddCategory from './AddCategory';

import Alert from './Alert';  // Import the Alert component
import Loader from './Img/loader.gif';

const CourseUpload = ({ onClose, course }) => {
  const [courseDescription, setCourseDescription] = useState('');
  const [selectedDays, setSelectedDays] = useState(1); // Default to 1 day
  const [lessonTimes, setLessonTimes] = useState([{ startTime: '', endTime: '' }]);
  const [activeSection, setActiveSection] = useState('addCourse');
  const [showAddInstructor, setShowAddInstructor] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [instructors, setInstructors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [courseTitle, setCourseTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [courseStatus, setCourseStatus] = useState('qualifications');
  const [courseType, setCourseType] = useState('online');
  const [courseDuration, setCourseDuration] = useState('');
  const [accreditedCourses, setAccreditedCourses] = useState(false);
  const [selectedInstructor, setSelectedInstructor] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [courseId, setCourseId] = useState(null);
  const API_HOST = process.env.REACT_APP_API_HOST;

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();
  const [alert, setAlert] = useState({ message: '', type: '', hidden: true });

  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        const response = await fetch(`${API_HOST}api/courses/instructors/`);
        if (!response.ok) throw new Error('Failed to fetch instructors');
        const data = await response.json();
        setInstructors(data);
      } catch (error) {
        console.error('Error fetching instructors:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_HOST}api/courses/category/`);
        if (!response.ok) throw new Error('Failed to fetch categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchInstructors();
    fetchCategories();

    if (course) {
      setCourseId(course.id);
      setCourseTitle(course.title);
      setCourseDescription(course.details);
      setAmount(course.amount);
      setCourseCode(course.course_code);
      setCourseStatus(course.course_status);
      setCourseType(course.course_type);
      setCourseDuration(course.duration);
      setAccreditedCourses(course.accredited_courses);
      setSelectedDays(course.days_per_week);
      setSelectedInstructor(course.instructor_id);
      setSelectedCategory(course.category);
      setLessonTimes(Array(course.days_per_week).fill({ startTime: '', endTime: '' }));
    }
  }, [course]);

  const handleSend = async () => {
    setLoading(true);

    if (!selectedInstructor || !selectedCategory) {
      setAlert({ message: 'Please select an instructor and category.', type: 'error', hidden: false });
      setLoading(false);
      return;
    }

    const courseData = {
      title: courseTitle,
      details: courseDescription,
      amount,
      course_code: courseCode,
      course_status: courseStatus,
      course_type: courseType,
      duration: courseDuration,
      days_per_week: selectedDays,
      accredited_courses: accreditedCourses,
      category: parseInt(selectedCategory),
      instructor_id: parseInt(selectedInstructor),
    };

    try {
      const url = courseId
        ? `${API_HOST}api/courses/courses/${courseId}/`
        : `${API_HOST}api/courses/courses/`;
      const method = courseId ? 'PATCH' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(courseData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Failed to send data: ${errorData.message || 'Unknown error'}`);
      }

      setAlert({ message: `Course ${courseId ? 'updated' : 'uploaded'} successfully!`, type: 'success', hidden: false });
      setTimeout(() => navigate('a-courses'), 1500);
    } catch (error) {
      console.error('Error sending data:', error.message);
      setAlert({ message: `Error: ${error.message}`, type: 'error', hidden: false });
    } finally {
      setLoading(false);
    }
  };

  const handleDaysChange = (e) => {
    const days = parseInt(e.target.value);
    setSelectedDays(days);
    setLessonTimes(Array(days).fill({ startTime: '', endTime: '' }));
  };

  const handleTimeChange = (index, field, value) => {
    const newLessonTimes = [...lessonTimes];
    newLessonTimes[index] = { ...newLessonTimes[index], [field]: value };
    setLessonTimes(newLessonTimes);
  };

  const handleAddInstructorClick = () => {
    setShowAddInstructor(true);
    setShowAddCategory(false);
  };

  const handleAddCategoryClick = () => {
    setShowAddCategory(true);
    setShowAddInstructor(false);
  };

  const handleCloseAddInstructor = () => setShowAddInstructor(false);
  const handleCloseAddCategory = () => setShowAddCategory(false);

  return (
    <div className='course-upload'>
      <div className='upload-env'>
      <Alert 
        type={alert.type} 
        message={alert.message} 
        onClose={() => setAlert({ ...alert, hidden: true })} 
        hidden={alert.hidden} 
      />
      
        <div className='top_Cc_upoload'>
          <div className='Cc_Kl'>
            <div className='Cc_title'>
              <h3>
                {activeSection === 'addCourse' && 'Add Course'}
                {activeSection === 'setLearningTime' && 'Set Learning Time'}
                {activeSection === 'addAssessment' && 'Add Assessment'}
              </h3>
            </div>
            <span className='gap_img'><img src={AllIcon} alt="All" /></span>
            <div className='Cc_Btns_1'>
              <button
                className={activeSection === 'addCourse' ? 'active_Upload_btn' : ''}
                onClick={() => setActiveSection('addCourse')}
              >
                <img src={CourseUploadIcon} alt="Add Course" /> Add Course
              </button>
              <button
                className={activeSection === 'setLearningTime' ? 'active_Upload_btn' : ''}
                onClick={() => setActiveSection('setLearningTime')}
              >
                <img src={TimeIcon} alt="Set Learning Time" /> Set Learning Time
              </button>
              <button
                className={activeSection === 'addAssessment' ? 'active_Upload_btn' : ''}
                onClick={() => setActiveSection('addAssessment')}
              >
                <img src={AssessmentUploadIcon} alt="Add Assessment" /> Add Assessment
              </button>
            </div>
          </div>
          <div className='Cc_Btns_2'>
            {/* <button className='uploadCc_Main_btn' onClick={handleSend}>Upload course</button> */}

            <button
              className='proceed_Main_btn'
              onClick={handleSend}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span>Uploading...</span>
                  <img src={Loader} alt="Loading..." className='loader' />
                </>
              ) : (
                'Upload course'
              )}
            </button>

            <button onClick={onClose}>Close</button> {/* Use onClose prop here */}
          </div>
        </div>
        <div className='Main_Cc_upload'>
          {/* Conditionally render AddInstructor and AddCategory */}
          {activeSection === 'addCourse' && showAddInstructor && (
            <AddInstructor onClose={handleCloseAddInstructor} />
          )}
          {activeSection === 'addCourse' && showAddCategory && (
            <AddCategory onClose={handleCloseAddCategory} />
          )}

          {!showAddInstructor && !showAddCategory && activeSection === 'addCourse' && (
            <div className='Add_Course_Box ClasiK'>
              <div className='Box_ClasiK'>
                <div className='Upload_Input'>
                  <p>Course instructor</p>
                  <div className='Upload_Input_main'>
                   
                    <select
                      onChange={(e) => setSelectedInstructor(e.target.value)}
                      value={selectedInstructor}
                    >
                      <option value="">Select Instructor</option>
                      {instructors.map(instructor => (
                        <option key={instructor.id} value={instructor.id}>
                          {`${instructor.first_name} ${instructor.last_name}`}
                        </option>
                      ))}
                    </select>
                    <span
                      className='Add_Span Upload_instructor_btn'
                      onClick={handleAddInstructorClick}
                    >
                      <img src={PlusIcon} alt="Add" />
                    </span>
                  </div>
                </div>

                <div className='Upload_Input'>
                  <p>Course category</p>
                  <div className='Upload_Input_main'>

                    <select
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      value={selectedCategory}
                    >
                      <option value="">Select Category</option>
                      {categories.map(category => (
                        <option key={category.id} value={category.id}>
                          {category.title}
                        </option>
                      ))}
                    </select>
                    <span
                      className='Add_Span Upload_category_btn'
                      onClick={handleAddCategoryClick}
                    >
                      <img src={PlusIcon} alt="Add" />
                    </span>
                  </div>
                </div>

                <div className='Upload_Input'>
                  <p>Course status</p>
                  <div className='Upload_Input_main'>
                
                    <select
                        onChange={(e) => setCourseStatus(e.target.value)}
                        value={courseStatus}
                      >
                        <option>Select course status </option>
                        <option value="qualifications">Qualifications</option>
                        <option value="courses">Courses</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className='Box_ClasiK'>
                <div className='Upload_Input'>
                  <p>Study type</p>
                  <div className='Upload_Input_main'>
                   <select
                      onChange={(e) => setCourseType(e.target.value)}
                      value={courseType}
                    >
                       <option>Select study type</option>
                      <option value="online">Online</option>
                      <option value="on demand">On Demand</option>
                      <option value="class room">Class Room</option>
                    </select>
                    
                  </div>
                </div>

                <div className='Upload_Input'>
                  <p>Price</p>
                  <div className='Upload_Input_main'>
                  <input
                    type="number"
                    placeholder='Enter course price (£)'
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                  />
                  </div>
                </div>
              </div>

              <div className='Box_ClasiK'>
                <div className='Upload_Input'>
                  <p>Course code</p>
                  <div className='Upload_Input_main'>
                    <input
                      type='text'
                      placeholder='Enter course code'
                      value={courseCode}
                      onChange={(e) => setCourseCode(e.target.value)}
                    />
                  </div>
                </div>

                <div className='Upload_Input'>
                  <p>Course title</p>
                  <div className='Upload_Input_main'>
                  <input
                    type="text"
                    placeholder="Course Title"
                    value={courseTitle}
                    onChange={(e) => setCourseTitle(e.target.value)}
                  />
                    
                  </div>
                </div>

                <div className='Upload_Input'>
                  <p>Course duration</p>
                  <div className='Upload_Input_main'>
                    <input
                      type='text'
                      placeholder ='Enter course duration'
                      value={courseDuration}
                      onChange={(e) => setCourseDuration(e.target.value)}
                    />
                  </div>
                </div>
              </div>

              <div className='Box_ClasiK'>
                <div className='Upload_Input'>
                  <p>Course description</p>
                  <MessageEditor
                  value={courseDescription}
                  onChange={(newValue) => setCourseDescription(newValue)}
                  placeholder='Enter course description'
              
              />
                </div>
              </div>
            </div>
          )}

          {activeSection === 'setLearningTime' && (
            <div className='Add_Course_Box'>
              <div className='Box_ClasiK'>
                <div className='Upload_Input'>
                  <p>Number of days</p>
                  <div className='Upload_Input_main'>
                    <input
                      type="number"
                       min='1'
                      placeholder="Days per Week"
                      value={selectedDays}
                      onChange={(e) => setSelectedDays(parseInt(e.target.value))}
                    />
                  </div>
                </div>
              </div>

              {lessonTimes.map((_, index) => (
                <div className='Box_ClasiK' key={index}>
                  <div className='Upload_Input'>
                    <p>Lesson {index + 1} start time</p>
                    <div className='Upload_Input_main'>
                      <input
                        type='time'
                        value={lessonTimes[index].startTime}
                        onChange={(e) => handleTimeChange(index, 'startTime', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className='Upload_Input'>
                    <p>Lesson {index + 1} end time</p>
                    <div className='Upload_Input_main'>
                      <input
                        type='time'
                        value={lessonTimes[index].endTime}
                        onChange={(e) => handleTimeChange(index, 'endTime', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeSection === 'addAssessment' && <Assessment />}
        </div>
      </div>
    </div>
  );
};

export default CourseUpload;