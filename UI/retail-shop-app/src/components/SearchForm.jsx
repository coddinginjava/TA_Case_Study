import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { searchPricingRecords } from '../redux/slices/pricingSlice';
import { Input, Button, Stack } from '@chakra-ui/react';

const SearchForm = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();

  const handleSearch = () => {
    dispatch(searchPricingRecords(searchTerm));
  };

  return (
    <Stack direction="row" spacing={4} align="center">
      <Input
        placeholder="Search by SKU or Product Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>
    </Stack>
  );
};

export default SearchForm;
