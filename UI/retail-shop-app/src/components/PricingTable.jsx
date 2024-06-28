import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Table, Thead, Tbody, Tr, Th, Td, Button } from '@chakra-ui/react';
import { selectPricingRecords, setSelectedRecord } from '../redux/slices/pricingSlice';
import EditModal from './EditModal';

const PricingTable = () => {
  const records = useSelector(selectPricingRecords);
  const dispatch = useDispatch();
  const [isModalOpen, setModalOpen] = React.useState(false);

  const handleEdit = (record) => {
    dispatch(setSelectedRecord(record));
    setModalOpen(true);
  };

  return (
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Store ID</Th>
            <Th>SKU</Th>
            <Th>Product Name</Th>
            <Th>Price</Th>
            <Th>Date</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {records.map((record) => (
            <Tr key={record.id}>
              <Td>{record.storeId}</Td>
              <Td>{record.sku}</Td>
              <Td>{record.productName}</Td>
              <Td>{record.price}</Td>
              <Td>{record.date}</Td>
              <Td>
                <Button onClick={() => handleEdit(record)}>Edit</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <EditModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default PricingTable;
