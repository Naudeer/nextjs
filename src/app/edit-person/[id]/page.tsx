'use client';

import PersonForm from '../../components/PersonForm';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const EditPerson = ({ params }: { params: { id: string } }) => {
  const [initialValues, setInitialValues] = useState<{ name: string; age: number } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchPerson = async () => {
      try {
        const response = await fetch(`/api/person?id=${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch person');
        }
        const person = await response.json();
        setInitialValues(person);
      } catch (error) {
        console.error('Error fetching person:', error);
      }
    };

    fetchPerson();
  }, [params.id]);

  const handleSubmit = async (name: string, age: number) => {
    try {
      const response = await fetch(`/api/person?id=${params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, age }),
      });

      if (!response.ok) {
        throw new Error('Failed to update person');
      }

      const data = await response.json();
      console.log('Person updated:', data);
      router.push('/');
    } catch (error) {
      console.error('Error updating person:', error);
    }
  };

  return initialValues ? (
    <PersonForm onSubmit={handleSubmit} initialValues={initialValues} />
  ) : (
    <div>Loading...</div>
  );
};

export default EditPerson;
