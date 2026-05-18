import React from 'react';

interface Props {
  code: string;
}

export const VerificationUserTemplate: React.FC<Props> = ({ code }) => {
  // Автоматически берет адрес Vercel на сервере, либо локалхост, если запускаешь дома
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  return (
    <div>
      <p>
        Код подтверждения: <h2>{code}</h2>
      </p>

      <p>
        <a href={`${baseUrl}/api/auth/verify?code=${code}`}>Подтвердить регистрацию</a>
      </p>
    </div>
  );
};