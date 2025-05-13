import React, { useState } from 'react';
import { MUSIC_QUIZ } from '../services/music';
import './MusicQuiz.css';

function MusicQuiz({ onComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  const handleAnswer = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));

    // Move to next question or complete quiz
    if (currentQuestion < MUSIC_QUIZ.questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      onComplete(answers);
    }
  };

  const question = MUSIC_QUIZ.questions[currentQuestion];

  return (
    <div className="music-quiz">
      <div className="quiz-progress">
        <div 
          className="progress-bar"
          style={{ width: `${((currentQuestion + 1) / MUSIC_QUIZ.questions.length) * 100}%` }}
        />
        <span className="progress-text">
          Question {currentQuestion + 1} of {MUSIC_QUIZ.questions.length}
        </span>
      </div>

      <h2>{question.text}</h2>
      
      <div className="quiz-options">
        {question.options.map((option, index) => (
          <button
            key={index}
            className={`quiz-option ${answers[question.id] === option.value ? 'selected' : ''}`}
            onClick={() => handleAnswer(question.id, option.value)}
          >
            {option.text}
          </button>
        ))}
      </div>
    </div>
  );
}

export default MusicQuiz; 