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
        <Text ml={10} mb={5} size='md'>
          This is an artificial inteligence made using brainjs. We use some data from a covid-19 tracker api and feed our small, but powerfull AI so it can predict a probable infection rate some days ahead starting from the data used to train it.
          Ideally, we would use some data to train it and other part to test it. I didn't test the predictable result with the remaining data. Also, the only thing taken into account is past confirmed covid-19 cases, again, ideally we should train it with much more data(ex: population density, climate, death cases, recovery cases, double positive cases[...]). This is not a serious prediction. But it was very interesting to make, and hopefully to play with it.
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