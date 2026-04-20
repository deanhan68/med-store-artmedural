'use client';

import React from 'react';
import dynamic from 'next/dynamic'; // Импортируем dynamic
import 'react-dadata/dist/react-dadata.css';

// Динамически импортируем библиотеку только на клиенте
const AddressSuggestions = dynamic(
  () => import('react-dadata').then((mod) => mod.AddressSuggestions),
  { ssr: false } // Это отключит рендеринг на сервере
);

interface Props {
  onChange?: (value?: string) => void;
}

export const AdressInput: React.FC<Props> = ({ onChange }) => {
  return (
    <AddressSuggestions
      token="d66fb6c69a75269cfdeb46324fd970c04de780e6" 
      onChange={(data) => onChange?.(data?.value)}
    />
  );
};