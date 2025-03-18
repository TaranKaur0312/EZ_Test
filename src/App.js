import React from 'react';
import { useState } from 'react';
import ServiceCard from './components/ServiceCard';
import './App.css';

const services = [
  { icon: '/images/presentation design.png', title: 'Presentation Design', description: 'Lorem ipsum dolor sit amet' },
  { icon: '/images/audio visual production.png', title: 'Audio-Visual Production', description: 'Lorem ipsum dolor sit amet' },
  { icon: '/images/translation services.png', title: 'Translation Services', description: 'Lorem ipsum dolor sit amet' },
  { icon: '/images/graphic design.png', title: 'Graphic Design', description: 'Lorem ipsum dolor sit amet' },
  { icon: '/images/research and analytics.png', title: 'Research & Analytics', description: 'Lorem ipsum dolor sit amet' },
  { icon: '/images/data processing.png', title: 'Data Processing', description: 'Lorem ipsum dolor sit amet' },
];

const App = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Button Clicked");
    setMessage('');
    setError('');

    if (!email) {
      setError('Email is required.');
      return;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Enter a valid email address.');
      return;
    }

    if (email.endsWith('@ez.works')) {
      setError('Emails from @ez.works are not allowed.');
      return;
    }

    try {
      const response = await fetch('https://test.ezworks.ai/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (response.status === 200) {
        setMessage('Form Submitted Successfully');
        setEmail('');
      } else if (response.status === 422) {
        setError('Email Not Allowed');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (error) {
      setError('Network Error. Please try again later.');
    }
  };

  return (
    <div className="container">
      <div className="left-section">
      <h1>
          <img src="/images/EZ logo.png" alt="EZ Logo" className="logo" /> Works
        </h1>
        <h2 className="subtitle">Suite Of Business Support Services</h2>
        <p className="description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt...Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
        </p>
     
      <form onSubmit={handleSubmit} className="email-section">
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">Contact Me</button>
        </form>

        {error && <p className="error-message">{error}</p>}
        {message && <p className="success-message">{message}</p>}
      </div>

      <div className="right-section">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} />
        ))}
      </div>
    </div>
  );
};

export default App;
