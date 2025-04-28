import React, { createContext, useContext, useState, ReactNode } from 'react';
import roadSigns from '../data/road-signs.json';
import trafficRules from '../data/traffic-rules.json';
import safetyProcedures from '../data/safety-procedures.json';
import vehicleControl from '../data/vehicle-control.json';

import truckRoadSigns from '../data/truck-road-signs.json';
import truckTrafficRules from '../data/truck-traffic-rules.json';
import truckSafetyProcedures from '../data/truck-safety-procedures.json';
import truckVehicleControl from '../data/truck-vehicle-control.json';

import { useVehicle } from './VehicleContext'; // Adjust path if needed

// Types
interface Question {
  id: number;
  text: string;
  options: string[];
  correctOptionIndex: number;
  imageSource?: any;
}

interface SimulationContextType {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  startSimulation: (questions: Question[]) => void;
  answerQuestion: (selectedOptionIndex: number) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  finishSimulation: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);
const { vehicleType } = useVehicle();

// Provider
export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);

  const startSimulation = () => {
    if (!vehicleType) {
      console.error("No vehicle type selected!");
      return;
    }
  
    let allQuestions: any[] = [];
  
    if (vehicleType === 'B') {
      allQuestions = [
        ...roadSigns,
        ...trafficRules,
        ...safetyProcedures,
        ...vehicleControl,
      ];
    } else if (vehicleType === 'C') {
      allQuestions = [
        ...truckRoadSigns,
        ...truckTrafficRules,
        ...truckSafetyProcedures,
        ...truckVehicleControl,
        ...roadSigns,
        ...trafficRules,
        ...safetyProcedures,
        ...vehicleControl,
      ];
    }
  
    // Shuffle
    const shuffled = allQuestions.sort(() => Math.random() - 0.5);
  
    // Take 30 questions
    const selected = shuffled.slice(0, 30);
  
    setQuestions(selected);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(selected.length).fill(null));
  };

  const answerQuestion = (selectedOptionIndex: number) => {
    const updatedAnswers = [...userAnswers];
    updatedAnswers[currentQuestionIndex] = selectedOptionIndex;
    setUserAnswers(updatedAnswers);
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const finishSimulation = () => {
    console.log('Simulation finished!');
    // You can navigate to a results page or show score
  };

  return (
    <SimulationContext.Provider value={{
      questions,
      currentQuestionIndex,
      userAnswers,
      startSimulation,
      answerQuestion,
      goToNextQuestion,
      goToPreviousQuestion,
      finishSimulation
    }}>
      {children}
    </SimulationContext.Provider>
  );
};

// Hook
export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
