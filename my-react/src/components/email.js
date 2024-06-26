import React, { useState } from 'react';

function Email() {
  const [emails, setEmails] = useState([]);
  const [sender, setSender] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchEmails = async () => {
    setLoading(true);
    try {
      const result = await fetch(`http://localhost:4000/emails?sender=${sender}`, {
        method: "GET",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        }
      });

      if (!result.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await result.json();
      setEmails(data);
      setLoading(false);
    } catch (error) {
      console.error("There was an error fetching the emails!", error);
      setLoading(false);
    }
  };

  return (
    <div className="App1">
      <h1>Email Client</h1>
      <input
        type="text"
        value={sender}
        onChange={(e) => setSender(e.target.value)}
        placeholder="Sender's email"
      />
      <button onClick={fetchEmails}>Fetch Emails</button>
      {loading ? <p>Loading...</p> : null}
      <div>
        {emails.map((email, index) => (
          <div key={index}>
            <h2>{email.subject}</h2>
            <p>From: {email.from.text}</p>
            <div dangerouslySetInnerHTML={{ __html: email.html }} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Email;
