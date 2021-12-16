import { Flex } from '@chakra-ui/react';
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
    dailyData.reverse();
    setTrainingData(dailyData);
  }, [dailyData])

  const trainingChart = (
    trainingData[0] && (
      <Line
        data={{
          labels: trainingData.reverse().map(({ date }) => new Date(date).toLocaleDateString()),
          datasets: [{
            data: trainingData.map((data) => data.confirmed),
            label: 'Infected',
            borderColor: 'rgb(53, 162, 235)',
            backgroundColor: 'rgba(53, 162, 235, 0.5)',
            fill: true,
          }, {
            data: trainingData.map((data) => data.deaths),
            label: 'Deaths',
            borderColor: 'rgb(255, 99, 132)',
            backgroundColor: 'rgba(255, 99, 132, 0.5)',
            fill: true,
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
    )
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
    <Flex w='100%'>
      <Flex w='40%'>
        <Line options={testingOptions} data={testingData} />
      </Flex>
      <Flex w='40%'>
        {trainingChart}
      </Flex>
    </Flex>

  );
}

export default Chart;