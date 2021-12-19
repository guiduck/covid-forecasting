import { createContext, Dispatch, SetStateAction, useContext, useEffect, useState } from "react";
import { fetchDailyData, fetchGlobalData } from "../services/api";
import * as brain from 'brain.js';
// import scaler from 'minmaxscaler'
import scaler from '../utils/scaler'

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

type PredictedChart = {
  data: {
    labels: number[];
    datasets: {
        data: number[];
        label: string;
        borderColor: string;
        backgroundColor: string;
    }[];
  };
  options: {
      responsive: boolean;
      plugins: {
          legend: {
              position: any;
          };
          title: {
              display: boolean;
              text: string;
          };
      };
  };
}

type BrainContextType = {
  trainingData: TrainingData[],
  setTrainingData: Dispatch<SetStateAction<TrainingData[]>>,
  setDailyData: Dispatch<SetStateAction<DailyData[]>>,
  dailyData: DailyData[],
  trainingChartData: TrainingChart,
  predictedChartData: PredictedChart,
  forecast: (data: TrainingData[], days: number) => void,
  daysInput: string,
  setDaysInput: Dispatch<SetStateAction<string>>,
  prediction: number[],
  training: boolean
}

export const BrainContext = createContext({} as BrainContextType)

export const BrainProvider = ({ children }) => {

  const [training, setTraining] = useState(false)
  const [dailyData, setDailyData] = useState<DailyData[]>([])
  const [globalData, setGlobalData] = useState({})
  const [trainingData, setTrainingData] = useState<TrainingData[]>([])

  const [daysInput, setDaysInput] = useState('')
  const [prediction, setPrediction] = useState([]);

  const predictedChartData = {
    data: {
      labels: prediction.map(( n, index ) => index),
      datasets: [{
        data: prediction.map((data) => data),
        label: 'Infected',
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
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
          text: 'Your Covid-19 infection forecasting',
        },
      }
    }
  }

  const trainingChartData = {
    data: {
      labels: trainingData.map(({ date }) => new Date(date).toLocaleDateString()),
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

  const forecast = (trainingData: TrainingData[], daysInput: number) => {
    setTraining(true)

    const newTrainingData = new Array(80).fill(0)

    if (trainingData) {
      for(let i = 0; i <= 80; i ++) {
        newTrainingData[i] = trainingData[trainingData.length - 81 + i]?.confirmed
      }
    }

    const scaledData = scaler.fit_transform(newTrainingData);

    const network = new brain.recurrent.LSTMTimeStep({
      inputSize: 1,
      hiddenLayers: [10],
      outputSize: 1
    })

    network.train([scaledData], {
      learningRate: 0.005,
      errorThresh: 0.01,
      log: stats => {
        console.log(stats);
      }
    })

    const result = network.forecast([1], daysInput)
    setPrediction(scaler.inverse_transform(result))
    setTraining(false)
  }

  useEffect(() => {
    const loadDailyData = async () => {
      const initialDailyData = await fetchDailyData()

      if (initialDailyData) {
        setDailyData(initialDailyData);
      }
    }

    const loadGlobalData = async () => {
      const globalData = await fetchGlobalData()
      if (globalData) {
        setGlobalData(globalData)
      }
    }

    loadDailyData()
    // loadGlobalData()
  }, [])

  return (
    <BrainContext.Provider
      value={{
        trainingData,
        setTrainingData,
        setDailyData,
        dailyData,
        trainingChartData,
        forecast,
        daysInput,
        setDaysInput,
        prediction,
        predictedChartData,
        training
      }}
    >
      {children}
    </BrainContext.Provider>
  );
}

//easier export
export const useBrainContext = () => useContext(BrainContext);
