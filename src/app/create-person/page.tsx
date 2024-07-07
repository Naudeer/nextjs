'use client';

import PersonForm from '../components/PersonForm';

const CreatePerson = () => {
  const handleSubmit = async (name: string, age: number) => {
    const response = await fetch('/api/create-person', {
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
  };

  return <PersonForm onSubmit={handleSubmit} />;
};

export default CreatePerson;
