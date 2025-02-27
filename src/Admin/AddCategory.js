// import React, { useState, useEffect, useRef } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import axios from 'axios';
// import Loader from './Img/loader.gif';
// import MessageEditor from './MessageEditor'; // Import MessageEditor

// const AddCategory = ({ onClose }) => {
//   const [mainCategoryId, setMainCategoryId] = useState('');
//   const [title, setTitle] = useState('');
//   const [banner, setBanner] = useState(null);
//   const [courseDescription, setCourseDescription] = useState('');
//   const [alert, setAlert] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [categories, setCategories] = useState([]);
//   const fileInputRef = useRef(null);

//   const token = localStorage.getItem("authToken");
//   const navigate = useNavigate(); // Initialize useNavigate

//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const response = await axios.get('https://cmvp.net/api/v1/free/api/courses/mainCategory/');
//         setCategories(response.data);
//       } catch (err) {
//         console.error('Error fetching categories:', err);
//         setAlert({ type: 'error', message: 'Failed to load categories. Please try again.' });
//       }
//     };

//     fetchCategories();
//   }, []);

//   const handleFileChange = (event) => {
//     setBanner(event.target.files[0]);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();

//     if (!mainCategoryId || !title || !banner || !courseDescription) {
//       setAlert({ type: 'error', message: 'All fields are required.' });
//       return;
//     }

//     setAlert(null);
//     setLoading(true);

//     const formData = new FormData();
//     formData.append('title', title);
//     formData.append('details', courseDescription);
//     formData.append('mainCategory', mainCategoryId);
//     formData.append('image', banner);

//     try {

//       console.log("formData")
//       console.log(title)
//       console.log(courseDescription)
//       console.log(mainCategoryId)
//       console.log(banner)
//       console.log("formData")
//       await axios.post('https://cmvp.net/api/v1/free/api/courses/category/', 
//         formData, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       setAlert({ type: 'success', message: 'Category added successfully!' });

//       // Redirect to 'a-category' after successful submission
//       setTimeout(() => {
//         navigate('a-categories');
//       }, 2000);

//       // Reset form
//       setMainCategoryId('');
//       setTitle('');
//       setBanner(null);
//       setCourseDescription('');
//       if (fileInputRef.current) {
//         fileInputRef.current.value = '';
//       }
//     } catch (err) {
//       const errorMessage = err.response
//         ? err.response.data.detail || 'Failed to add category. Please try again.'
//         : 'Failed to add category. Please try again.';
//       setAlert({ type: 'error', message: errorMessage });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (alert) {
//       const timeout = setTimeout(() => {
//         setAlert(null);  // Hide alert after 5 seconds
//       }, 5000);

//       return () => clearTimeout(timeout);  // Clean up the timeout on component unmount
//     }
//   }, [alert]);

//   return (
//     <div className='POpUp_Sec'>
//       <div className='PopUp_Box'>
//         <div className='top_Cc_upoload'>
//           <div className='Cc_Kl'>
//             <div className='Cc_title'>
//               <h3>Add Course Category</h3>
//             </div>
//           </div>
//           <div className='Cc_Btns_2'>
//             <button
//               className='proceed_Main_btn'
//               onClick={handleSubmit}
//               disabled={loading}
//             >
//               {loading ? (
//                 <>
//                   <span>Submitting...</span>
//                   <img src={Loader} alt="Loading..." className='loader' />
//                 </>
//               ) : (
//                 'Proceed'
//               )}
//             </button>
//             <button className='close-btn' onClick={onClose}>Close</button>
//           </div>
//         </div>

//         <div className='main_PopUP'>
//           <div className='Box_ClasiK'>
//             <div className='Upload_Input'>
//               <p>Main Category</p>
//               <div className='Upload_Input_main'>
//                 <select value={mainCategoryId} onChange={(e) => setMainCategoryId(e.target.value)}>
//                   <option value="">Select Main Category</option>
//                   {categories.map((category) => (
//                     <option key={category.id} value={category.id}>
//                       {category.name}
//                     </option>
//                   ))}
//                 </select>
//               </div>
//             </div>

//             <div className='Upload_Input'>
//               <p>Title</p>
//               <div className='Upload_Input_main'>
//                 <input type='text' value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Enter Title' />
//               </div>
//             </div>
//           </div>

//           <div className='Box_ClasiK'>
//             <div className='Upload_Input'>
//               <p>Upload Banner</p>
//               <div className='Upload_Input_main'>
//                 <input
//                   type='file'
//                   onChange={handleFileChange}
//                   className='file-upload-input'
//                   ref={fileInputRef}
//                 />
//               </div>
//             </div>
//           </div>

//           <div className='Box_ClasiK'>
//             <div className='Upload_Input'>
//               <p>Description</p>
//               <MessageEditor
//                 value={courseDescription}
//                 onChange={setCourseDescription}
//               />
//             </div>
//           </div>

//           {alert && (
//             <div className={`alert ${alert.type}`}>
//               {alert.message}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AddCategory;

import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Loader from './Img/loader.gif';
import MessageEditor from './MessageEditor';
import Alert from './Alert';

const AddCategory = ({ category, onClose, onUpdate }) => {
  const API_HOST = process.env.REACT_APP_API_HOST;
  const [mainCategoryId, setMainCategoryId] = useState('');
  const [title, setTitle] = useState('');
  const [banner, setBanner] = useState(null);
  const [courseDescription, setCourseDescription] = useState('');
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const fileInputRef = useRef(null);

  const token = localStorage.getItem("authToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_HOST}api/courses/mainCategory/`);
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setAlert({ type: 'error', message: 'Failed to load categories. Please try again.' });
      }
    };

    fetchCategories();
  }, []);

  const handleFileChange = (event) => {
    setBanner(event.target.files[0]);
  };

  useEffect(() => {
    if (category) {
      setMainCategoryId(category.mainCategory || '');
      setTitle(category.title || '');
      setCourseDescription(category.details || '');
      setBanner(null);  // Banner cannot be prepopulated as files can't be set programmatically
    }
  }, [category]);


  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!mainCategoryId || !title || !courseDescription || !banner) {
      setAlert({ type: 'error', message: 'All fields are required.' });
      return;
    }

    setAlert(null);
    setLoading(true);
    

    const formData = new FormData();
    formData.append('title', title);
    formData.append('details', courseDescription);
    formData.append('mainCategory', mainCategoryId);
    formData.append('image', banner);

    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const url = category
      ? `${API_HOST}api/courses/category/${category.id}/`
      : `${API_HOST}api/courses/category/`;
    const method = category ? 'PATCH' : 'POST';

    try {
      await axios({
        method: method,
        url: url,
        data: formData,
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      });

      setAlert({ type: 'success', message: `Category ${category ? 'updated' : 'added'} successfully!` });

      setTimeout(() => {
        if (category) {
          window.location.reload();
        } else {
          navigate('a-categories');
        }
        onClose();
      }, 2000);

      setMainCategoryId('');
      setTitle('');
      setCourseDescription('');
      setBanner(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      console.error('API Error:', err.response || err.message);
      const errorMessage = err.response
        ? err.response.data.detail || 'Failed to submit category. Please try again.'
        : 'Failed to submit category. Please try again.';
      setAlert({ type: 'error', message: errorMessage });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='POpUp_Sec'>
      <div className='PopUp_Box'>
        <div className='top_Cc_upoload'>
          <div className='Cc_Kl'>
            <div className='Cc_title'>
              <h3>{category ? 'Edit Course Category' : 'Add Course Category'}</h3>
            </div>
          </div>
          <div className='Cc_Btns_2'>
            <button
              className='proceed_Main_btn'
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? (
                <>
                  <span>Submitting...</span>
                  <img src={Loader} alt="Loading..." className='loader' />
                </>
              ) : (
                'Proceed'
              )}
            </button>
            <button className='close-btn' onClick={onClose}>Close</button>
          </div>
        </div>

        {alert && (
          <Alert
            type={alert.type}
            message={alert.message}
            onClose={() => setAlert(null)}
          />
        )}

        <div className='main_PopUP'>
          <div className='Box_ClasiK'>
            <div className='Upload_Input'>
              <p>Main Category</p>
              <div className='Upload_Input_main'>
                <select value={mainCategoryId} onChange={(e) => setMainCategoryId(e.target.value)}>
                  <option value="">Select Main Category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className='Upload_Input'>
              <p>Title</p>
              <div className='Upload_Input_main'>
                <input
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder='Enter Title'
                />
              </div>
            </div>
          </div>

          <div className='Box_ClasiK'>
            <div className='Upload_Input'>
              <p>Upload Banner</p>
              <div className='Upload_Input_main'>
                <input
                  type='file'
                  onChange={handleFileChange}
                  className='file-upload-input'
                  ref={fileInputRef}
                />
              </div>
            </div>
          </div>

          <div className='Box_ClasiK'>
            <div className='Upload_Input'>
              <p>Description</p>
              <MessageEditor
                value={courseDescription}
                onChange={setCourseDescription}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
