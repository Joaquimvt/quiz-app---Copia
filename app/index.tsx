import { useState, useEffect } from 'react';
import QuizScreen from '../components/QuizScreen';
import ResultScreen from '../components/ResultScreen';
import { Audio } from 'expo-av';
import questions from '../questions.json';
import React from 'react';

export default function HomePage() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [isQuizFinished, setIsQuizFinished] = useState(false);
  const [music, setMusic] = useState(true);

  // Som de fundo em loop (Android/iOS)
  useEffect(() => {
    let sound: Audio.Sound;

    const playLoop = async () => {
      const { sound: s } = await Audio.Sound.createAsync(
        require('../assets/sounds/theme.mp3')
      );
      sound = s;
      await sound.setIsLoopingAsync(true);
      await sound.playAsync();
    };

    if (music) {
      playLoop();
    }

    // Cleanup ao desmontar
    return () => {
      if (sound) {
        sound.stopAsync();
        sound.unloadAsync();
      }
    };
  }, [music]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleOptionPress = (option: string) => {
    if (option === currentQuestion.correctAnswer) {
      setScore(score + 1);
    }
    setSelectedOption(option);
    setIsOptionsDisabled(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption(null);
      setIsOptionsDisabled(false);
    } else {
      setIsQuizFinished(true);
    }
  };

  const handlePlayAgain = () => {
    setIsQuizFinished(false);
    setCurrentQuestionIndex(0);
    setSelectedOption(null);
    setIsOptionsDisabled(false);
    setScore(0);
  };

  return isQuizFinished ? (
    <ResultScreen
      score={score}
      totalQuestions={questions.length}
      onPlayAgain={handlePlayAgain}
    />
  ) : (
    <QuizScreen
      currentQuestion={currentQuestion}
      selectedOption={selectedOption}
      isOptionsDisabled={isOptionsDisabled}
      onOptionPress={handleOptionPress}
      onNextQuestion={handleNextQuestion}
    />
  );
}
