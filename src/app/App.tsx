import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/tabs';
import { GetCatFact } from '../features/get-cat-fact';
import { GuessAge } from '../features/guess-age';

const App = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <Tabs
        defaultValue="task1"
        className="w-[400px]"
      >
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="task1">Задание 1</TabsTrigger>
          <TabsTrigger value="task2">Задание 2</TabsTrigger>
        </TabsList>
        <TabsContent value="task1">
          <GetCatFact />
        </TabsContent>
        <TabsContent value="task2">
          <GuessAge />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default App;
