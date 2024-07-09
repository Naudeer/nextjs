'use client';

import PersonForm from '../components/PersonForm';

const CreatePerson = () => {
  const handleSubmit = async (name: string, age: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/create-person`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
      });

      if (!response.ok) {
        throw new Error('Failed to create person');
      }

      const data = await response.json();
      console.log('Person created with ID:', data.id);
    } catch (error) {
      console.error('Error creating person:', error);
    }
  };

  return <PersonForm onSubmit={handleSubmit} />;
};

export default CreatePerson;
