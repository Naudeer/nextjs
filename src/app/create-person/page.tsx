'use client';

import { FC, useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

const AddPerson: FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const router = useRouter();

  const handleSave = async () => {
    try {
      const response = await fetch('/api/create-person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age: parseInt(age, 10) }),
      });

      if (!response.ok) {
        throw new Error('Failed to create person');
      }

      const data = await response.json();
      console.log('Person created with ID:', data.id);

      setName('');
      setAge('');
      router.push('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px' }}>
      <h2>Add person record.</h2>
      <Box display="flex" flexDirection="column" gap={2}>
        <TextField
          label="Name"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
        />
        <TextField
          label="Age"
          type="number"
          variant="outlined"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          fullWidth
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleSave}
          fullWidth
          disabled={name.trim() === '' || age.trim() === ''}
        >
          Save
        </Button>
      </Box>
    </div>
  );
};

export default AddPerson;
