// src/context/SimulationContext.tsx
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useVehicle } from './VehicleContext';

import roadSigns from '../data/road-signs.json';
import trafficRules from '../data/traffic-rules.json';
import safetyProcedures from '../data/safety-procedures.json';
import vehicleControl from '../data/vehicle-control.json';

import truckRoadSigns from '../data/truck-road-signs.json';
import truckTrafficRules from '../data/truck-traffic-rules.json';
import truckSafetyProcedures from '../data/truck-safety-procedures.json';
import truckVehicleControl from '../data/truck-vehicle-control.json';

// --- Types ---
interface Question {
  id: number;
  text: {
    he: string;
    en: string;
    ar: string;
  };
  options: {
    he: string;
    en: string;
    ar: string;
  }[];
  correctOptionIndex: number;
  explanation: {
    he: string;
    en: string;
    ar: string;
  };
  isImportant: boolean;
  categoryId: number;
  relatedSignId: number;
  imageSource?: string; // Optional
}


interface SimulationContextType {
  questions: Question[];
  currentQuestionIndex: number;
  userAnswers: (number | null)[];
  simulationStarted: boolean;
  simulationFinished: boolean;
  timer: number;

  startSimulation: () => void;
  answerQuestion: (selectedOptionIndex: number) => void;
  goToNextQuestion: () => void;
  goToPreviousQuestion: () => void;
  finishSimulation: () => void;
  resetSimulation: () => void;
}

const SimulationContext = createContext<SimulationContextType | undefined>(undefined);

// --- Provider ---
export const SimulationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { vehicleType } = useVehicle();

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<(number | null)[]>([]);
  const [simulationStarted, setSimulationStarted] = useState<boolean>(false);
  const [simulationFinished, setSimulationFinished] = useState<boolean>(false);
  const [timer, setTimer] = useState<number>(1800); // 30 minutes default

  // --- Effect: Timer Countdown ---
  useEffect(() => {
    if (!simulationStarted || simulationFinished) return;

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          finishSimulation(); // Auto-finish
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [simulationStarted, simulationFinished]);

  // --- Start Simulation ---
  const startSimulation = () => {
    if (!vehicleType) {
      console.error('Vehicle type not selected!');
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
  
    // Map the questions to the right format
    const cleanedQuestions = allQuestions.map((q) => {
      if (Array.isArray(q.options)) {
        return q;
      }
  
      const optionCount = q.options.he.length;
      const options = Array.from({ length: optionCount }, (_, idx) => ({
        he: q.options.he[idx],
        en: q.options.en[idx],
        ar: q.options.ar[idx],
      }));
  
      return {
        ...q,
        options,
      };
    });
  
    const shuffled = [...cleanedQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 30);
  
    setQuestions(selected);
    setCurrentQuestionIndex(0);
    setUserAnswers(new Array(selected.length).fill(null));
    setTimer(1800);
    setSimulationStarted(true);
    setSimulationFinished(false);
  };
  

  const answerQuestion = (selectedOptionIndex: number) => {
    setUserAnswers(prev => {
      const updated = [...prev];
      updated[currentQuestionIndex] = selectedOptionIndex;
      return updated;
    });
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
    setSimulationFinished(true);
    setSimulationStarted(false);
  };

  const resetSimulation = () => {
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers([]);
    setSimulationStarted(false);
    setSimulationFinished(false);
    setTimer(1800);
  };

  return (
    <SimulationContext.Provider
      value={{
        questions,
        currentQuestionIndex,
        userAnswers,
        simulationStarted,
        simulationFinished,
        timer,
        startSimulation,
        answerQuestion,
        goToNextQuestion,
        goToPreviousQuestion,
        finishSimulation,
        resetSimulation,
      }}
    >
      {children}
    </SimulationContext.Provider>
  );
};

// --- Hook ---
export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error('useSimulation must be used within a SimulationProvider');
  }
  return context;
};
