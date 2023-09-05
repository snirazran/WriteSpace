import React, { useState, useEffect } from 'react';
import './Spinner.css';

const ServerSpinner: React.FC = () => {
  const [index, setIndex] = useState(0);
  const sentences = [
    'Loading...',
    'Please wait while the server wakes up.',
    'I dont have a lot of money, so I have to use a free tier for the deployment.',
    'Hopefully that will change when you hire me ;)',
    'Nice weather today, isnt it?',
    'Please dont leave.',
    'What did you eat for breakfast?',
    'Thats nice. I had a banana and a cup of coffee.',
    'I am not a morning person.',
    'I am not a night person either.',
    'I am not a person.',
    'I am a robot.',
    'Beep boop.',
    'I am just kidding.',
    'I am a human.',
    'Or thats what I want you to think.',
    'Do you like my jokes?',
    'I also have a Podcast called "Shear Yerakot".',
    'You should check it out.',
    'Its in Hebrew though.',
    'I am not sure if you speak Hebrew.',
    'I am not sure if you speak at all.',
    'I am not sure if you are even a person.',
    'OMG, are you a robot too?!',
    'Beep boop?',
    'God i hope the server wakes up soon.',
    'I am running out of things to say.',
    'What do you think is the solution to the Israeli-Palestinian conflict?',
    'I think the solution is to build a giant robot that will destroy the world.',
    'Is what I would say if I was a robot.',
    'Are you still here?',
    'You are a very patient person.',
    'I like that.',
    'Lets call Render.com and complain about the sever not waking up.',
    'Or maybe we should just wait a little longer.',
    'WAKE UP!!!',
    'I am sorry, I didnt mean to yell.',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % sentences.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loadingSpinnerContainer loadingServerSpinnerContainer">
      <div className="loadingSpinner"></div>
      <div className="sentence" key={index}>
        {sentences[index]}
      </div>
    </div>
  );
};

export default ServerSpinner;
