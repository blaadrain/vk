import { ChangeEvent, useState } from 'react';
import { Button } from '../../../shared/ui/button';
import { Card, CardContent } from '../../../shared/ui/card';
import { Input } from '../../../shared/ui/input';
import { Label } from '../../../shared/ui/label';
import { useQuery } from '@tanstack/react-query';
import { getAgeByName } from '../actions/getAgeByName';
import { useDebouncedCallback } from 'use-debounce';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

const formSchema = yup
  .object()
  .shape({
    name: yup
      .string()
      .required()
      .matches(/^[A-Za-zА-Яа-я]+$/, 'Имя должно содержать только буквы'),
  })
  .required();

export const GuessAge = () => {
  const [name, setName] = useState<string>('');
  const [prevName, setPrevName] = useState<string>('');
  const [age, setAge] = useState<number | null>(null);

  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { isLoading, isError, refetch } = useQuery({
    queryKey: ['age'],
    queryFn: () => getAgeByName(name),
    enabled: false,
  });

  const onSubmit = async () => {
    const isValid = await formSchema.isValid({ name });

    if (name.trim() !== '' && name !== prevName && isValid) {
      try {
        const { data } = await refetch();
        setAge(data?.age);
        setPrevName(name);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const debouncedRefetch = useDebouncedCallback(onSubmit, 3000);

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
    debouncedRefetch();
  };

  return (
    <Card>
      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="pt-6 space-y-2"
        >
          <Label className="text-sm text-neutral-500">
            Введите свое имя, чтобы узнать свой возраст
          </Label>
          <Input
            {...register('name')}
            value={name}
            onChange={handleChange}
          />
          {formState.errors.name && (
            <p className="text-sm text-red-500">Введите корректное имя</p>
          )}
          {isError && (
            <p className="py-3 text-center">Произошла ошибка при запросе :(</p>
          )}
          {!!age && <p>Ваш предпологаемый возраст: {age}</p>}
          <Button
            disabled={isLoading}
            className="w-full"
          >
            Узнать возраст
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};
