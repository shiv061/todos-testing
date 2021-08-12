const Loader = () => {
  let circleCommonClasses = 'h-2.5 w-2.5 bg-white rounded-full';

  return (
    <div
      className="w-screen h-screen absolute top-0 left-0 flex justify-center items-center z-10"
      style={{ background: 'rgba(0, 0, 0, 0.4)' }}
    >
      <div className="flex z-20">
        <div className={`${circleCommonClasses} mr-1 animate-bounce`}></div>
        <div className={`${circleCommonClasses} mr-1 animate-bounce200`}></div>
        <div className={`${circleCommonClasses} animate-bounce400`}></div>
      </div>
    </div>
  );
};

export default Loader;
