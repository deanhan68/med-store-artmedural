'use client';

import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { FormInput } from '@/shared/components/shared/form'; // проверь путь к своим инпутам
import { Button } from '@/shared/components/ui';
import { formRegisterSchema, TFormRegisterValues } from './schema';
import { registerUser } from '@/app/actions';



interface Props {
  onClose?: VoidFunction;
  onClickLogin?: VoidFunction;
}

export const RegisterForm: React.FC<Props> = ({ onClose, onClickLogin }) => {
  const form = useForm<TFormRegisterValues>({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      email: '',
      fullName: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await registerUser({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });

      toast.success('Регистрация успешна 📝. Подтвердите свою почту', {
        icon: '✅',
      });
      

      onClose?.();
      
    } catch (error) {
      toast.error('Ошибка при регистрации', {
        icon: '❌',
      });
    }
  };

  return (
    <FormProvider {...form}>
      <form className="flex flex-col gap-5" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="text-center">
          <h1 className="text-2xl font-bold">Регистрация</h1>
          <p className="text-gray-400">Введите данные, чтобы создать аккаунт</p>
        </div>

        <FormInput name="email" label="E-Mail" required />
        <FormInput name="fullName" label="Полное имя" required />
        <FormInput name="password" label="Пароль" type="password" required />
        <FormInput name="confirmPassword" label="Подтвердите пароль" type="password" required />

        <Button
          loading={form.formState.isSubmitting}
          className="h-12 text-base mt-2"
          type="submit">
          Зарегистрироваться
        </Button>

        {onClickLogin && (
          <Button
            variant="outline"
            onClick={onClickLogin}
            type="button"
            className="h-12 text-base text-gray-500">
            Уже есть аккаунт? Войти
          </Button>
        )}
      </form>
    </FormProvider>
  );
};