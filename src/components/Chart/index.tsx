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

  const { setTrainingData, trainingChartData, predictedChartData } = useBrainContext();

  useEffect(() => {
    if (dailyData) {
      setTrainingData(dailyData.reverse());
    }

  }, [dailyData])


  return (
    <Flex direction='column' w='100%'>
      <Flex w='70%' p={50}>
        <Line options={trainingChartData.options} data={trainingChartData.data} />
      </Flex>
      <Flex w='70%' p={50}>
        <Line options={predictedChartData.options} data={predictedChartData.data} />
      </Flex>
    </Flex>
  );
}

export default Chart;