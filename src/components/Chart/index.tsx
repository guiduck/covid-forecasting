import { Flex, Spinner } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js'
import { Line } from 'react-chartjs-2';
import faker from 'faker';
var brain = require('brain.js');

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

type Data = {
  date: string,
  confirmed: number
  deaths: number,
  recovered: number
}

const Chart: React.FC<any> = ({ dailyData }) => {


  const [trainingData, setTrainingData] = useState([])
  console.log(dailyData);

  useEffect(() => {


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


    if (dailyData) {
      setTrainingData(dailyData.reverse());
    }

  }, [dailyData])

  const trainingChart = (
    trainingData ? (
      <Line
        data={{
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
          },  {
            data: trainingData.map((data) => data.recovered),
            label: 'Recovered',
            borderColor: 'green',
            backgroundColor: 'rgba(0, 255, 0, 0.5)',
            fill: true,
          },
          ],
        }}
      />
    ) : <Spinner size='lg' />
  )

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];

  const testingData = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Dataset 2',
        data: labels.map(() => faker.datatype.number({ min: -1000, max: 1000 })),
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };
  const testingOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
    },
  };

  return (
    <Flex direction='column' w='100%'>
      <Flex w='70%' p={50}>
        <Line options={testingOptions} data={testingData} />
      </Flex>
      <Flex w='70%' p={50}>
        {trainingChart}
      </Flex>
    </Flex>

  );
}

export default Chart;