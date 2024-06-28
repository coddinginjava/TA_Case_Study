import React from 'react';
import { ChakraProvider, Box, Heading } from '@chakra-ui/react';
import UploadForm from './components/UploadForm';
import SearchForm from './components/SearchForm';
import PricingTable from './components/PricingTable';

const App = () => {
  return (
    <ChakraProvider>
      <Box p={4}>
        <Heading as="h1" size="xl" mb={4}>
          Pricing Feed Management
        </Heading>
        <UploadForm />
        <SearchForm />
        <PricingTable />
      </Box>

    </ChakraProvider>
  );
};

export default App;
