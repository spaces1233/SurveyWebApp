import React, { useState } from 'react';

function Survey() {
  const [responses, setResponses] = useState({
    transport: '',
    arrivalTime: '',
    commuteDuration: '',
    otherTransport: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResponses({
      ...responses,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Survey Responses:', responses);
    alert('Survey submitted successfully!');
  };

  return (
    <div className="container mt-2 min-h-screen">
      <div className="text-3xl font-bold leading-tight tracking-tighter md:text-4xl lg:leading-[1.1] text-center">
        School Commute Survey
      </div>
      <div className="overflow-auto p-8">
        <div className="text-center rounded-lg overflow-hidden w-56 sm:w-96 mx-auto">
          
          <form className="space-y-4" onSubmit={handleSubmit}>
            
            <div>
              <label className="block text-left">1. How do you usually get to school?</label>
              <select
                name="transport"
                value={responses.transport}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select an option</option>
                <option value="bus">By bus</option>
                <option value="car">By car</option>
                <option value="bike">By bike</option>
                <option value="walking">Walking</option>
                <option value="other">Other (please specify)</option>
              </select>
              {responses.transport === 'other' && (
                <input
                  type="text"
                  name="otherTransport"
                  value={responses.otherTransport}
                  onChange={handleChange}
                  placeholder="Please specify"
                  className="w-full p-2 mt-2 border border-gray-300 rounded"
                  required
                />
              )}
            </div>

            <div>
              <label className="block text-left">2. What time do you typically arrive at school?</label>
              <select
                name="arrivalTime"
                value={responses.arrivalTime}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select an option</option>
                <option value="before-7">Before 7:00 AM</option>
                <option value="7-7-30">7:00 - 7:30 AM</option>
                <option value="7-30-8">7:30 - 8:00 AM</option>
                <option value="8-8-30">8:00 - 8:30 AM</option>
                <option value="after-8-30">After 8:30 AM</option>
              </select>
            </div>

            <div>
              <label className="block text-left">3. How long does it usually take you to get to school?</label>
              <select
                name="commuteDuration"
                value={responses.commuteDuration}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded"
                required
              >
                <option value="">Select an option</option>
                <option value="less-15">Less than 15 minutes</option>
                <option value="15-30">15 - 30 minutes</option>
                <option value="30-45">30 - 45 minutes</option>
                <option value="45-60">45 minutes - 1 hour</option>
                <option value="more-1-hour">More than 1 hour</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full p-2 bg-blue-500 text-white font-bold rounded hover:bg-blue-600"
            >
              Submit
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Survey;
