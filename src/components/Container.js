import { CreateTodo } from './CreateTodo';
import { Filter } from './Filter';
import { Header } from './Header';
import { TodoAddon } from './TodoAddon';
import { TodoSpace } from './TodoSpace';

export const Container = () => {
  return (
    <div className="max-w-xs sm:max-w-lg absolute top-20 w-full container-height">
      <div className="flex flex-col h-full ">
        <div style={{ flex: 1 }}>
          <Header />
        </div>
        <div className="py-2" style={{ flex: 1 }}>
          <CreateTodo />
        </div>
        <div style={{ flex: 8 }} className="overflow-auto">
          <TodoSpace />
        </div>
        <div>
          <TodoAddon />
        </div>
        <div className="my-6" style={{ flex: 1 }}>
          <Filter />
        </div>
      </div>
    </div>
  );
};
