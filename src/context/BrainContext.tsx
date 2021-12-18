import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { fetchDailyData, fetchGlobalData } from "../services/api";

type DailyData = {
  positive: number,
  recovered: number,
  death: number,
  date: string
}

type TrainingData = {
  confirmed: number,
  recovered: number,
  deaths: number,
  date: string
}

type BrainContextType = {
  trainingData: TrainingData[],
  setTrainingData: Dispatch<SetStateAction<TrainingData[]>>,
  setDailyData: Dispatch<SetStateAction<DailyData[]>>,
  dailyData: DailyData[]
}

export const BrainContext = createContext({} as BrainContextType)

export const BrainProvider = ({ children }) => {

  const [dailyData, setDailyData] = useState<DailyData[]>([])
  const [globalData, setGlobalData] = useState({})
  const [trainingData, setTrainingData] = useState<TrainingData[]>([])

  useEffect(() => {
    const loadDailyData = async () => {
      const initialDailyData = await fetchDailyData();

      if (initialDailyData) {
        setDailyData(initialDailyData);
      }
    }

    const loadGlobalData = async () => {
      const globalData = await fetchGlobalData();
      if (globalData) {
        console.log(globalData)
        setGlobalData(globalData)
      }
    }

    loadDailyData();
  }, [])

  return (
    <BrainContext.Provider value={{trainingData, setTrainingData, setDailyData, dailyData}} >
      {children}
    </BrainContext.Provider>
  );
}

//easier export
export const useBrainContext = () => useContext(BrainContext);
