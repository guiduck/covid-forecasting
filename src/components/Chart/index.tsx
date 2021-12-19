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

  const { setTrainingData, trainingChartData, predictedChartData, training } = useBrainContext();

  useEffect(() => {
    if (dailyData) {
      setTrainingData(dailyData.reverse());
    }

  }, [dailyData])


  return (
    <Flex direction={['column', 'column', 'column', 'row']} w='100%'>
      <Flex w={['100%', '100%', '100%', '50%']} p={50}>
        <Line options={trainingChartData.options} data={trainingChartData.data} />
      </Flex>
      <Flex w={['100%', '100%', '100%', '50%']} p={50}>
        {!training ? <Line options={predictedChartData.options} data={predictedChartData.data} /> : <Spinner size='xl' />}

      </Flex>
    </Flex>
  );
}

export default Chart;