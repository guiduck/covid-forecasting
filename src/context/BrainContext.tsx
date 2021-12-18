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

type BrainContextType = {
  trainingData: TrainingData[],
  setTrainingData: Dispatch<SetStateAction<TrainingData[]>>,
  setDailyData: Dispatch<SetStateAction<DailyData[]>>,
  dailyData: DailyData[],
  trainingChartData: TrainingChart,
  forecast: (data: TrainingData[], days: number) => void,
  daysInput: string,
  setDaysInput: Dispatch<SetStateAction<string>>,
  prediction: number[]
}

export const BrainContext = createContext({} as BrainContextType)

export const BrainProvider = ({ children }) => {

  const [training, setTraining] = useState(false)
  const [dailyData, setDailyData] = useState<DailyData[]>([])
  const [globalData, setGlobalData] = useState({})
  const [trainingData, setTrainingData] = useState<TrainingData[]>([])

  const [daysInput, setDaysInput] = useState('')
  const [prediction, setPrediction] = useState([]);

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
    console.log(trainingData)
    setTraining(true)

    function format(arr) {
      const toReturn = []
      for(let i= 0; i<arr.length; i+=5) {
          toReturn.push(arr.slice(i, i+5))
      }
      if(toReturn[toReturn.length-1].length == 1) {
        const last = toReturn.pop()
        toReturn[toReturn.length-1].concat(last)
      }
      return toReturn
    }

    const newTrainingData = new Array(50).fill(0)

    if (trainingData) {
      for(let i = 0; i <= 50; i ++) {
        newTrainingData[i] = trainingData[trainingData.length - 51 + i]?.confirmed
      }
    }

    const scaledData = scaler.fit_transform(newTrainingData);
    const readyforTrainingData = format(scaledData);

    //use readyForTrainingData to train networkw

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
    console.log('unscaled learning data', newTrainingData)
    console.log(scaledData, 'scaledData')
    console.log('formated scaled/fitttrans data', readyforTrainingData)

    console.log(network.run([2, 3, 4]))
    const result = network.forecast([3], daysInput)
    setPrediction(result)
    console.log(result)

    // reverse scailing and json.stringify result
    // console.log(JSON.stringify(scaler.inverse_transform(network.forecast(scaledData, 3))));

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
        console.log(globalData)
        setGlobalData(globalData)
      }
    }

    loadDailyData()
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
        prediction
      }}
    >
      {children}
    </BrainContext.Provider>
  );
}

//easier export
export const useBrainContext = () => useContext(BrainContext);
