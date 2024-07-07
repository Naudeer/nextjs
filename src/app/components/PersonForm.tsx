import { FC, useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { useRouter } from 'next/navigation';

interface PersonFormProps {
  onSubmit: (name: string, age: number) => void;
  initialValues?: {
    name?: string;
    age?: number;
  };
}

const PersonForm: FC<PersonFormProps> = ({ onSubmit, initialValues }) => {
  const [name, setName] = useState(initialValues?.name || '');
  const [age, setAge] = useState(initialValues?.age?.toString() || '');
  const router = useRouter();

  const handleSave = async () => {
    try {
      await onSubmit(name, parseInt(age, 10));
      setName('');
      setAge('');
      router.push('/');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: '16px' }}>
      <h2>{initialValues ? 'Edit person record.' : 'Add person record.'}</h2>
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
          {initialValues ? 'Update' : 'Save'}
        </Button>
      </Box>
    </div>
  );
};

export default PersonForm;
