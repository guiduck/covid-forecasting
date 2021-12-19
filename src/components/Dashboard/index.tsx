import { Box, Button, Flex, Heading, Input, Text } from '@chakra-ui/react';
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
      <Flex direction='column' alignItems='center'>
        <Heading m={5} size='xl'>How many days ahead would you like to predict? </Heading>
        <Text ml={10} mb={5} size='md'>Textinho explicando coisa boa
        Textinho explicando coisa boa
        Textinho explicando coisa boa
        Textinho explicando coisa boa
        Textinho explicando coisa boa
        Textinho explicando coisa boa
        Textinho explicando coisa boa
        Textinho explicando coisa boa
        Textinho explicando coisa boa
        </Text>
        <Flex>
          <Input
            width='200px'
            placeholder='Days to predict'
            type='number'
            value={daysInput}
            onChange={(e) => setDaysInput(e.target.value)}
          />
          <Button disabled={daysInput === ""} ml='1.5' onClick={handleForecast}>Train AI</Button>
        </Flex>
      </Flex>
      <Box>
        <Chart dailyData={dailyData} />
      </Box>
    </Flex>
  );
}

export default Dashboard;