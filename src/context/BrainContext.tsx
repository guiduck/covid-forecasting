import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { fetchDailyData, fetchGlobalData } from "../services/api";
import * as brain from 'brain.js'

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

type TrainingChart = {
  data: {
    labels: string[];
    datasets: ({
        data: number[];
        label: string;
        borderColor: string;
        backgroundColor: string;
        fill?: undefined;
    } | {
        data: number[];
        label: string;
        borderColor: string;
        backgroundColor: string;
        fill: boolean;
    })[];
  };
  options: {
    responsive: boolean,
    plugins: {
      legend: {
        position: any,
      },
      title: {
        display: boolean,
        text: string,
      },
    }
  };
}

type BrainContextType = {
  trainingData: TrainingData[],
  setTrainingData: Dispatch<SetStateAction<TrainingData[]>>,
  setDailyData: Dispatch<SetStateAction<DailyData[]>>,
  dailyData: DailyData[],
  trainingChartData: TrainingChart
}

export const BrainContext = createContext({} as BrainContextType)

export const BrainProvider = ({ children }) => {

  const [training, setTraining] = useState(false);
  const [dailyData, setDailyData] = useState<DailyData[]>([])
  const [globalData, setGlobalData] = useState({})
  const [trainingData, setTrainingData] = useState<TrainingData[]>([])

  const trainingChartData = {
    data: {
      labels: trainingData.reverse().map(({ date }) => new Date(date).toLocaleDateString()),
      datasets: [{
        data: trainingData.map((data) => data.confirmed),
        label: 'Infected',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      }, {
        data: trainingData.map((data) => data.deaths),
        label: 'Deaths',
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      }],
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
        },
        title: {
          display: true,
          text: 'AI training data',
        },
      }
    }
  }

  const forecast = (trainingData: TrainingData[]) => {
    console.log('has brain')
    const network = new brain.NeuralNetwork({
      hiddenLayers: [3, 6]
    })

    network.train([
      {
        input: [0, 0],
        output: [0]
      },
      {
        input: [1, 0],
        output: [1]
      },
      {
        input: [1, 1],
        output: [0]
      },
      {
        input: [0, 1],
        output: [1]
      },
    ], {
      errorThresh: 0.01,
      log: stats => {
        console.log(stats);
      }
    })

    console.log(network.run([2, 2]))
  }

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
    <BrainContext.Provider value={{trainingData, setTrainingData, setDailyData, dailyData, trainingChartData}} >
      {children}
    </BrainContext.Provider>
  );
}

//easier export
export const useBrainContext = () => useContext(BrainContext);
