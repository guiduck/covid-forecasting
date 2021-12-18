import { Flex } from '@chakra-ui/react';
import React from 'react';
import Chart from '../Chart';
import { useBrainContext } from '../../context/BrainContext';

type DailyData = {
  positive: number,
  recovered: number,
  death: number,
  date: string
}

const Dashboard: React.FC = () => {

  const { dailyData } = useBrainContext();

  return (
    <Flex>
      <Chart dailyData={dailyData} />
    </Flex>
  );
}

export default Dashboard;