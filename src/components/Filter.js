import { useAppState } from '../hooks/useAppState';

const items = ['All', 'Active', 'Completed'];

export const Filter = () => {
  const {
    dispatch,
    state: { filter },
  } = useAppState();

  return (
    <div className="bg-secondary flex justify-center rounded-md">
      {items.map((item) => {
        const lowerCaseItem = item.toLowerCase();
        return (
          <span
            key={item}
            className="p-3"
            onClick={() => {
              dispatch({ type: 'FILTER', payload: lowerCaseItem });
            }}
          >
            <h6
              className="text-gray-500 font-semibold cursor-pointer"
              style={{ color: filter === lowerCaseItem && '#3b6fd9' }}
            >
              {item}
            </h6>
          </span>
        );
      })}
    </div>
  );
};
