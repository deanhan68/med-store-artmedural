'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { User } from '@prisma/client';
import { formRegisterSchema, TFormRegisterValues } from './modals/auth-modal/forms/schema';
import toast from 'react-hot-toast';
import { signOut } from 'next-auth/react';
import { Container } from './container';
import { Title } from './title';
import { FormInput } from './form/form-input';
import { Button } from '../ui';
import { updateUserInfo } from '@/app/actions';

interface Props {
  data: User;
}

export const ProfileForm: React.FC<Props> = ({ data }) => {
  const form = useForm({
    resolver: zodResolver(formRegisterSchema),
    defaultValues: {
      fullName: data.fullName,
      email: data.email,
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: TFormRegisterValues) => {
    try {
      await updateUserInfo({
        email: data.email,
        fullName: data.fullName,
        password: data.password,
      });
  
      toast.error('Данные обновлены 📝', {
        icon: '✅',
      });
    } catch (error) {
      return toast.error('Ошибка при обновлении данных', {
        icon: '❌',
      });
    }
  };

  const onClickSignOut = () => {
    signOut({
      callbackUrl: '/',
    });
  };

  return (
    <Container className="my-10">
      <div className="flex gap-10">
        {/* Левая часть: Заголовок и инфо */}
        <div className="w-[300px]">
          <Title text="Личные данные" size="md" className="font-bold" />
          <p className="text-gray-400 mt-2">
            Здесь вы можете изменить свои данные и настроить безопасность аккаунта.
          </p>
        </div>
  
        {/* Правая часть: Форма в карточке */}
        <div className="flex-1 bg-white p-8 rounded-3xl border border-gray-100 shadow-sm">
          <FormProvider {...form}>
            <form className="grid grid-cols-2 gap-5" onSubmit={form.handleSubmit(onSubmit)}>
              <FormInput name="email" label="E-Mail" required />
              <FormInput name="fullName" label="Полное имя" required />
              <FormInput type="password" name="password" label="Новый пароль" />
              <FormInput type="password" name="confirmPassword" label="Повторите пароль" />
  
              <div className="col-span-2 flex gap-4 mt-5">
                <Button disabled={form.formState.isSubmitting} className="flex-1 h-12 text-base" type="submit">
                  Сохранить изменения
                </Button>
                <Button
                  onClick={onClickSignOut}
                  variant="secondary"
                  className="h-12 px-8 text-gray-500"
                  type="button">
                  Выйти
                </Button>
              </div>
            </form>
          </FormProvider>
        </div>
      </div>
    </Container>
  );
};

