import { Container } from './components/Container';
import { useAppState } from './hooks/useAppState';

function App() {
  const {
    state: { dark },
  } = useAppState();
  return (
    <div className="w-screen h-screen">
      <div className="grid grid-cols-1 grid-rows-3 h-full relative">
        <div className="row-span-1 gradient_background" />
        <div
          className={`row-span-2 flex flex-row justify-center animate ${
            dark ? 'bg-primary' : 'bg-white'
          }`}
        >
          <Container />
        </div>
      </div>
    </div>
  );
}

export default App;
