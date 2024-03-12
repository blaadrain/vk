import { Button } from '../../../shared/ui/button';
import { Card, CardContent } from '../../../shared/ui/card';
import { Input } from '../../../shared/ui/input';
import { useQuery } from '@tanstack/react-query';
import { ElementRef, useRef, useState } from 'react';
import { fetchCatFact } from '../actions/getCatFact';

export const GetCatFact = () => {
  const [catFact, setCatFact] = useState<string>('');
  const [isFactFetched, setIsFactFetched] = useState<boolean>(false);
  const inputRef = useRef<ElementRef<'input'>>(null);

  const { isLoading, isError, refetch } = useQuery({
    queryKey: ['catFact'],
    queryFn: fetchCatFact,
    enabled: false,
  });

  const onClick = async () => {
    try {
      const { data } = await refetch();
      if (data) {
        setCatFact(data.fact);
        setIsFactFetched(true);
        setCursor(data.fact.indexOf(' '), data.fact.indexOf(' '));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const setCursor = (start: number, end: number) => {
    inputRef.current?.focus();
    setTimeout(() => {
      inputRef.current?.setSelectionRange(start, end);
    }, 0);
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-2">
        <Button
          disabled={isLoading}
          onClick={onClick}
          className="w-full"
        >
          Получить {isFactFetched && 'новый '}факт
        </Button>
        <Input
          ref={inputRef}
          value={catFact}
          onChange={(e) => setCatFact(e.target.value)}
          placeholder="Cats can't taste sweetness."
        />
        {isError && (
          <p className="pt-3 text-center">Произошла ошибка при запросе :(</p>
        )}
      </CardContent>
    </Card>
  );
};
