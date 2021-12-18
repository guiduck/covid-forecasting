import React from 'react'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react';
import { BrainProvider } from '../src/context/BrainContext';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <BrainProvider>
        <Component {...pageProps} />
      </BrainProvider>
    </ChakraProvider>
  );
}

export default MyApp