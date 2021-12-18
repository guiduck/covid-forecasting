import { Button, Flex, Heading, Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import Chart from '../Chart';
import { useBrainContext } from '../../context/BrainContext';

type DailyData = {
  positive: number,
  recovered: number,
  death: number,
  date: string
}

const Dashboard: React.FC = () => {

  const { dailyData, forecast, trainingData, daysInput, setDaysInput } = useBrainContext();

  const handleForecast = (e) => {
    console.log(daysInput)
    forecast(trainingData, parseInt(daysInput, 10))
  }

  return (
    <Flex direction='column' width='100vw' justifyContent='center' >
      <Flex direction='column'>
        <Heading p={10} size='xl' > How many days ahead would you like to predict? </Heading>
        <Flex width='40%' justifyContent='space-around'>
          <Input
            width='25%'
            placeholder='days to predict'
            type='number'
            value={daysInput}
            onChange={(e) => setDaysInput(e.target.value)}
          />
          <Button onClick={handleForecast}>Train AI</Button>
        </Flex>
      </Flex>
      <Flex >
        <Chart dailyData={dailyData} />
      </Flex>
    </Flex>
  );
}

export default Dashboard;