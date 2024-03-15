// pages/index.js
'use client'
import * as React from 'react';
import { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function Home() {
  const [userId, setUserId] = useState('');
  const [userHistory, setUserHistory] = useState([]);
  const [prompt, setPrompt] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const [open, setOpen] = React.useState(false);

  // Placeholder data for demonstration purposes
  const dummyUserHistory = [
    { title: 'Breaking News: Global Warming Reaches Critical Levels', abstract: 'Scientists warn of dire consequences if immediate action is not taken.' },
    { title: 'Tech Giant Unveils Revolutionary AI Assistant', abstract: 'The new AI assistant promises to revolutionize the way we interact with technology.' },
    { title: 'Sports Update: Championship Finals Recap', abstract: 'Get all the highlights and analysis from the thrilling championship finals.' },
  ];

  const dummyRecommendations = [
    { title: 'Sustainable Living: Tips for Reducing Your Carbon Footprint', abstract: 'Learn how small changes in your daily life can have a big impact on the environment.' },
    { title: 'The Rise of Artificial Intelligence: Opportunities and Challenges', abstract: 'Explore the potential of AI and the ethical considerations surrounding its development.' },
    { title: 'Travel Destinations: Discover the Worlds Hidden Gems', abstract: 'Escape the crowds and uncover the most beautiful and underrated travel destinations.' },
  ];

  const handleUserIdChange = (e) => {
    setUserId(e.target.value);
  };

  const fetchUserHistory = () => {
    // Replace with your actual API call to fetch user history
    setUserHistory(dummyUserHistory);
  };

  const handlePromptChange = (e) => {
    setPrompt(e.target.value);
  };

  const generateRecommendations = () => {
    // Replace with your actual API call to generate recommendations
    console.log('Generating recommendations for prompt:', dummyRecommendations)
    setRecommendations(dummyRecommendations);
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 relative">
      <div className="flex m-4 rounded-md shadow-md">
        <input
          type="text"
          placeholder="Enter User ID"
          value={userId}
          onChange={handleUserIdChange}
          className="flex-grow px-4 py-2 border-r border-gray-300 rounded-l-md text-black"
        />
        <button
          onClick={fetchUserHistory}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-md transition-colors duration-300"
        >
          Fetch User Feed
        </button>
      </div>

      {userHistory.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-bold m-4">User Feed</h2>
          {userHistory.map((news, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 m-4 transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-bold text-black">{news.title}</h3>
              <p className="text-gray-700">{news.abstract}</p>
            </div>
          ))}
        </div>
      )}

      {recommendations.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold m-4">Recommendations</h2>
          {recommendations.map((news, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-md p-4 m-4 transition-transform duration-300 hover:scale-105"
            >
              <h3 className="text-xl font-bold text-black">{news.title}</h3>
              <p className="text-gray-700">{news.abstract}</p>
            </div>
          ))}
        </div>
      )}

      <button
        className="fixed bottom-4 right-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-full shadow-md transition-colors duration-300"
        onClick={() => setOpen(true)}
      > <div className='flex flex-row'>

        <FaPlus className="text-2xl mr-2" /> Prompt
      </div>
      </button>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries((formData as any).entries());
            const email = formJson.email;
            console.log(email);
            handleClose();
          },
        }}
        sx={{  width: '100%' } }
      >
        <DialogTitle className="text-2xl font-bold mb-4">
            Enter Prompt
          </DialogTitle>
          <DialogContentText className="m-6">
              Enter a prompt to generate new recommendations.
            </DialogContentText>
        <DialogContent>
            <input
              type="text"
              placeholder="Enter prompt"
              value={prompt}
              onChange={handlePromptChange}
              className="w-full px-4 py-2 border border-gray-300 rounded  text-black" />
          </DialogContent>
        <DialogActions>
              <div className="flex justify-end">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 m-2 rounded mr-2 transition-colors duration-300"
                onClick={() => setOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 m-2 rounded transition-colors duration-300"
                onClick={generateRecommendations}
              >
                Generate
              </button>
            </div>
          </DialogActions>
      </Dialog>
    </div>
  );
}