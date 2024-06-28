import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  FormControl,
  FormLabel,
  useToast
} from '@chakra-ui/react';
import { updatePricingRecord, selectSelectedRecord } from '../redux/slices/pricingSlice';

const EditModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const toast = useToast();
  const selectedRecord = useSelector(selectSelectedRecord);
  const [formData, setFormData] = useState({
    storeId: '',
    sku: '',
    productName: '',
    price: '',
    date: ''
  });

  useEffect(() => {
    if (selectedRecord) {
      setFormData(selectedRecord);
    }
  }, [selectedRecord]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSave = () => {
    dispatch(updatePricingRecord(formData))
      .unwrap()
      .then(() => {
        toast({
          title: 'Record updated.',
          description: 'The pricing record has been updated successfully.',
          status: 'success',
          duration: 5000,
          isClosable: true
        });
        onClose();
      })
      .catch((error) => {
        toast({
          title: 'Error updating record.',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true
        });
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Pricing Record</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Store ID</FormLabel>
            <Input
              name="storeId"
              value={formData.storeId}
              onChange={handleInputChange}
              disabled
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>SKU</FormLabel>
            <Input
              name="sku"
              value={formData.sku}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Product Name</FormLabel>
            <Input
              name="productName"
              value={formData.productName}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Price</FormLabel>
            <Input
              name="price"
              type="number"
              value={formData.price}
              onChange={handleInputChange}
            />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Date</FormLabel>
            <Input
              name="date"
              value={formData.date}
              onChange={handleInputChange}
            />
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSave}>
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditModal;
