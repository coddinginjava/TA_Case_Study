import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { uploadPricingFeed } from '../redux/slices/pricingSlice';
import { Button, Input, Stack } from '@chakra-ui/react';

const UploadForm = () => {
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      dispatch(uploadPricingFeed(formData));
    }
  };

  return (
    <Stack direction="row" spacing={4} align="center">
      <Input type="file" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
    </Stack>
  );
};

export default UploadForm;
