import { Flex } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import Chart from '../Chart';
import { fetchDailyData, fetchGlobalData } from '../../services/api';

type DailyData = {
  positive: number,
  recovered: number,
  death: number,
  date: string
}

const Dashboard: React.FC = () => {

  const [dailyData, setDailyData] = useState<DailyData[]>();

  useEffect(() => {
    const loadDailyData = async () => {
      const initialDailyData = await fetchDailyData();

      if (initialDailyData) {
        setDailyData(initialDailyData);
        console.log(initialDailyData);
      }

      const globalData = await fetchGlobalData();
      if (globalData) {
        console.log(globalData)
      }
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