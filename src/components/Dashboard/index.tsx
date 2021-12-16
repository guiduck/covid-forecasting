import { Flex } from '@chakra-ui/react';
import React from 'react';
import Chart from '../Chart';

const Dashboard: React.FC = () => {
  return (
    <Flex>
      <Chart />
    </Flex>
  );
}

export default Dashboard;