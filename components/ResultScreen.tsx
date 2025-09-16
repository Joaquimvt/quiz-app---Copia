import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

// Tipagem das props para a tela de resultados
type ResultScreenProps = {
  score: number;
  totalQuestions: number;
  onPlayAgain: () => void;
};

export default function ResultScreen({
  score,
  totalQuestions,
  onPlayAgain,
}: ResultScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>🎭 Fim da Batalha!</Text>
      <Text style={styles.scoreText}>
        「{score}」 de 「{totalQuestions}」 respondidas corretamente!
      </Text>
      <TouchableOpacity style={styles.button} onPress={onPlayAgain}>
        <Text style={styles.buttonText}>再 Jougan! (Jogar Novamente)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2e004f', // Roxo escuro JoJo
    padding: 20,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#FFD700', // Dourado
    textShadowColor: '#ff00ff',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  scoreText: {
    fontSize: 22,
    marginBottom: 40,
    color: '#fff',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#ff1493', // Rosa forte
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: '#FFD700',
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
