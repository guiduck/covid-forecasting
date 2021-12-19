import { chakra, Flex, Spinner } from '@chakra-ui/react';
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
      <Flex direction='column' w={['100%', '100%', '100%', '50%']} p={50}>
        <Line options={trainingChartData.options} data={trainingChartData.data} />
        <chakra.p>this data was obtaied from https://api.covidtracking.com/ and is from usa states only. We currently have 420 daily reports and are using just 80 to feed our AI for usability purposes.</chakra.p>
      </Flex>
      <Flex direction='column' w={['100%', '100%', '100%', '50%']} p={50}>
        {!training ? <Line options={predictedChartData.options} data={predictedChartData.data} /> : <Spinner size='xl' />}
        <chakra.p>and here, hopefully, if everything is working, here should be seen your prediction for the given number of days</chakra.p>
      </Flex>
    </Flex>
  );
}

export default Chart;