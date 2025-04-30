import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useVehicle } from "./VehicleContext";
import { Question } from "../types/question";

import roadSigns from "../data/road-signs.json";
import trafficRules from "../data/traffic-rules.json";
import safetyProcedures from "../data/safety-procedures.json";
import vehicleControl from "../data/vehicle-control.json";
import truckRoadSigns from "../data/truck-road-signs.json";
import truckTrafficRules from "../data/truck-traffic-rules.json";
import truckSafetyProcedures from "../data/truck-safety-procedures.json";
import truckVehicleControl from "../data/truck-vehicle-control.json";

import {
  mergeQuestionsForVehicleType,
  pickRandomSubset
} from "../utils/simulation";

// --- Context Type ---
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
  const [timer, setTimer] = useState<number>(1800); // 30 minutes

  // Timer countdown
  useEffect(() => {
    if (!simulationStarted || simulationFinished) return;

    const interval = setInterval(() => {
      setTimer((prev) => {
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

  const startSimulation = () => {
    if (!vehicleType) {
      console.error("Vehicle type not selected!");
      return;
    }

    const allQuestions = mergeQuestionsForVehicleType(vehicleType, {
      roadSigns, trafficRules, safetyProcedures, vehicleControl,
      truckRoadSigns, truckTrafficRules, truckSafetyProcedures, truckVehicleControl
    });

    const selected = pickRandomSubset(allQuestions, 30);

    setQuestions(selected);
    setUserAnswers(new Array(selected.length).fill(null));
    setCurrentQuestionIndex(0);
    setTimer(1800);
    setSimulationStarted(true);
    setSimulationFinished(false);
  };

  const answerQuestion = (selectedOptionIndex: number) => {
    setUserAnswers((prev) => {
      const updated = [...prev];
      updated[currentQuestionIndex] = selectedOptionIndex;
      return updated;
    });
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const goToPreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
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

export const useSimulation = () => {
  const context = useContext(SimulationContext);
  if (!context) {
    throw new Error("useSimulation must be used within a SimulationProvider");
  }
  return context;
};
