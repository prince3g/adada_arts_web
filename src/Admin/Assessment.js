import React, { useState, useEffect } from 'react';
import MessageEditor from './MessageEditor';

const Assessment = () => {
  const [currentDate, setCurrentDate] = useState('');
  const [selectedQuestionType, setSelectedQuestionType] = useState('Objective');
  const [courseDescription, setCourseDescription] = useState('');
  const [questionCount, setQuestionCount] = useState(1); // Default to 1 question

  useEffect(() => {
    // Get current date
    const today = new Date();
    const date = today.toISOString().substr(0, 10); // Format: YYYY-MM-DD
    setCurrentDate(date);
  }, []);

  const handleQuestionTypeChange = (e) => {
    setSelectedQuestionType(e.target.value);
  };

  const handleQuestionCountChange = (e) => {
    setQuestionCount(parseInt(e.target.value));
  };

  return (
    <div>
      <div className='Box_ClasiK'>
        <div className='Upload_Input'>
          <p>Question type</p>
          <div className='Upload_Input_main'>
            <select value={selectedQuestionType} onChange={handleQuestionTypeChange}>
              <option value="Objective">Objective questions</option>
              <option value="Essay">Essay questions</option>
            </select>
          </div>
        </div>

        <div className='Upload_Input'>
          <p>Number of Questions</p>
          <div className='Upload_Input_main'>
            <select value={questionCount} onChange={handleQuestionCountChange}>
              {[...Array(20)].map((_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className='Upload_Input'>
          <p>Date</p>
          <div className='Upload_Input_main'>
            <input type="date" id="date" value={currentDate} readOnly />
          </div>
        </div>
      </div>

      {selectedQuestionType === 'Objective' && (
        <div className='Question_Carravn Obj_Questions'>
          <div className='Question_Title'>
            <h2>Objective Questions</h2>
            <p>Indicate the right answer for each question by selecting one of the radio buttons.</p>
          </div>

          {[...Array(questionCount)].map((_, i) => (
            <div key={i} className='question_BoXX'>
              <div className='Box_ClasiK'>
                <div className='Upload_Input'>
                  <p>Question {i + 1}</p>
                  <MessageEditor
                    value={courseDescription}
                    onChange={setCourseDescription}
                  />
                </div>
              </div>

              <div className='Box_ClasiK'>
                <div className='Upload_Input'>
                  <p><label><input type="radio" name={`question${i}`} className='ChooseInput' />A</label></p>
                  <div className='Upload_Input_main'>
                    <input type='text' placeholder='Enter option' />
                  </div>
                </div>

                <div className='Upload_Input'>
                  <p><label><input type="radio" name={`question${i}`} className='ChooseInput' />B</label></p>
                  <div className='Upload_Input_main'>
                    <input type='text' placeholder='Enter option' />
                  </div>
                </div>

                <div className='Upload_Input'>
                  <p><label><input type="radio" name={`question${i}`} className='ChooseInput' />C</label></p>
                  <div className='Upload_Input_main'>
                    <input type='text' placeholder='Enter option' />
                  </div>
                </div>

                <div className='Upload_Input'>
                  <p><label><input type="radio" name={`question${i}`} className='ChooseInput' />D</label></p>
                  <div className='Upload_Input_main'>
                    <input type='text' placeholder='Enter option' />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedQuestionType === 'Essay' && (
        <div className='Question_Carravn Eassy_Questions'>
          <div className='Question_Title'>
            <h2>Essay Questions</h2>
            <p>Provide question submission email before proceeding.</p>
          </div>

          <div className='Box_ClasiK'>
            <div className='Upload_Input'>
              <p>Submission Email</p>
              <div className='Upload_Input_main'>
                <input type='text' placeholder='Enter submission email' />
              </div>
            </div>
          </div>

          {[...Array(questionCount)].map((_, i) => (
            <div key={i} className='question_BoXX'>
              <div className='Box_ClasiK'>
                <div className='Upload_Input'>
                  <p>Question {i + 1}</p>
                  <MessageEditor
                    value={courseDescription}
                    onChange={setCourseDescription}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Assessment;
