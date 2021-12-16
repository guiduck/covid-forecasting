import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Chart from '../Chart';
import { fetchDailyData } from '../../services/api';

type ChartData = {
  date: string,
  confirmed: number
  deaths: number,
  recovered: number
}

const Dashboard: React.FC = () => {

  const [dailyData, setDailyData] = useState();

  useEffect(() => {
    const loadDailyData = async () => {
      const initialDailyData = await fetchDailyData();

      setDailyData(initialDailyData);
    }

    loadDailyData();
  }, [])

  return (
    <Flex>
      <Chart dailyData={dailyData} />
    </Flex>
  );
}

export default Dashboard;