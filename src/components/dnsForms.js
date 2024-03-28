import React, { useContext, useState } from 'react';
import '../dns.css';
import { default as CompanyContext } from '../context/companycontext';

const DnsForm = () => {
  const [CompanyName, setName] = useState('');
  const [Position, setPosition] = useState('');
  const [Image, setImage] = useState('');

  const context = useContext(CompanyContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if all required fields are filled
    if (!CompanyName || !Position|| !Image) {
      console.error('Please fill in all fields');
      return;
    }

    try {
      // Use the postData function from the context to send data to the backend
      await context.postData({ CompanyName, Position, Image });
      
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <>
      <form className="dns-form" onSubmit={handleSubmit}>
        <h3 className='add-job'>ADD JOB DETAILS</h3>
        <label className="dns-label">
          Company Name
          <input
            className="dns-input"
            type="text"
            value={CompanyName}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label className="dns-label">
          Role
          <input
            className="dns-input"
            type="text"
            value={Position}
            onChange={(e) => setPosition(e.target.value)}
          />
        </label>
        <label className="dns-label">
          Image
          <input
            className="dns-input"
            type="text"
            // value={Image}
            onChange={(e) => setImage(e.target.value)
            }
          />
          <span style={{color:"red"}}>Note:Only use the image link from google</span>
        </label>
        <button className="dns-button" type="submit">
          Add Record
        </button>
      </form>
    </>
  );
};

export default DnsForm;
