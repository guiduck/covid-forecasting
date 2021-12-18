import { Flex, Spinner } from '@chakra-ui/react';
import React, { useEffect } from 'react';
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
import { useBrainContext } from '../../context/BrainContext';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const Chart: React.FC<any> = ({ dailyData }) => {

  const { setTrainingData, trainingChartData } = useBrainContext();

  useEffect(() => {
    if (dailyData) {
      setTrainingData(dailyData.reverse());
    }

  }, [dailyData])


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
        <Line options={trainingChartData.options} data={trainingChartData.data} />
      </Flex>
    </Flex>
  );
}

export default Chart;