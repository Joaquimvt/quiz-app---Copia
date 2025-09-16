import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Tipagem das props
type Question = {
  question: string;
  options: string[];
  correctAnswer: string;
};

type QuizScreenProps = {
  currentQuestion: Question;
  selectedOption: string | null;
  isOptionsDisabled: boolean;
  onOptionPress: (option: string) => void;
  onNextQuestion: () => void;
  score?: number;
};

export default function QuizScreen({
  currentQuestion,
  selectedOption,
  isOptionsDisabled,
  onOptionPress,
  onNextQuestion,
  score,
}: QuizScreenProps) {
  const getOptionStyle = (option: string) => {
    if (selectedOption) {
      const isCorrect = option === currentQuestion.correctAnswer;
      if (isCorrect) {
        return styles.correctOption;
      }
      if (option === selectedOption && !isCorrect) {
        return styles.incorrectOption;
      }
    }
    return {};
  };

  return (
    <View style={styles.container}>
      {/* Placar */}
      {typeof score === 'number' && (
        <View style={styles.scoreContainer}>
          <Text style={styles.scoreText}>⚔️ Pontuação: {score}</Text>
        </View>
      )}

      {/* Pergunta */}
      <View style={styles.questionContainer}>
        <Text style={styles.questionText}>
          「{currentQuestion.question}」
        </Text>
      </View>

      {/* Opções */}
      <View style={styles.optionsContainer}>
        {currentQuestion.options.map((option) => (
          <TouchableOpacity
            key={option}
            style={[styles.option, getOptionStyle(option)]}
            onPress={() => onOptionPress(option)}
            disabled={isOptionsDisabled}
          >
            <Text style={styles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Botão próxima */}
      {selectedOption && (
        <TouchableOpacity
          style={styles.nextButton}
          onPress={onNextQuestion}
        >
          <Text style={styles.nextButtonText}>➡️ Próxima Pergunta</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2e004f', // Roxo escuro
    padding: 16,
  },
  scoreContainer: {
    marginBottom: 15,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#FFD700',
    textShadowColor: '#ff00ff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  questionContainer: {
    height: 150,
    justifyContent: 'center',
    backgroundColor: '#4b0082',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#FFD700',
  },
  questionText: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#fff',
    fontStyle: 'italic',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
   optionsContainer: {
    flex: 1,
    justifyContent: 'flex-start', // antes era space-around
  },
  option: {
    backgroundColor: '#6a0dad',
    padding: 26,
    borderRadius: 12,
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFD700',
    marginBottom: 30, // antes era 12
  },
  optionText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  correctOption: {
    borderColor: '#4CAF50',
    backgroundColor: '#228B22',
  },
  incorrectOption: {
    borderColor: '#F44336',
    backgroundColor: '#8B0000',
  },
  nextButton: {
    
    backgroundColor: '#ff1493',
    padding: 15,
    borderRadius: 12,
    marginBottom: 50,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
