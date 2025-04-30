// utils/simulation.ts
import { Question } from "../types/question";

export const mergeQuestionsForVehicleType = (vehicleType: "B" | "C", data: any): Question[] => {
  const {
    roadSigns, trafficRules, safetyProcedures, vehicleControl,
    truckRoadSigns, truckTrafficRules, truckSafetyProcedures, truckVehicleControl
  } = data;

  let allQuestions = vehicleType === "B"
    ? [...roadSigns, ...trafficRules, ...safetyProcedures, ...vehicleControl]
    : [
        ...truckRoadSigns, ...truckTrafficRules,
        ...truckSafetyProcedures, ...truckVehicleControl,
        ...roadSigns, ...trafficRules,
        ...safetyProcedures, ...vehicleControl
      ];

  return normalizeOptions(allQuestions);
};

export const normalizeOptions = (questions: any[]): Question[] => {
  return questions.map((q) => {
    if (Array.isArray(q.options)) return q;

    const optionCount = q.options.he.length;
    const options = Array.from({ length: optionCount }, (_, idx) => ({
      he: q.options.he[idx],
      en: q.options.en[idx],
      ar: q.options.ar[idx],
    }));

    return { ...q, options, imageSource: `../../assets/images/${q.id}.jpg`,};
  });
};

export const pickRandomSubset = <T>(array: T[], count: number): T[] => {
  return [...array].sort(() => 0.5 - Math.random()).slice(0, count);
};
