export const CustomBulletChart = ({ width = 1, title = '' }) => {
  return (
    <div className="flex flex-col">
      <p>{title}</p>
      <div className="flex">
        <div className="relative w-full mt-1">
          <div className="absolute h-3 bg-gray-500 w-full"></div>
          <div
            className="absolute top-0 h-3 bg-green-500"
            style={{
              width: `${width}%`,
              backgroundColor: width > 69 ? 'rgb(34,197,94)' : width < 30 ? 'red' : 'orange',
            }}></div>
        </div>
        <div className="ml-1">{width}%</div>
      </div>
    </div>
  );
};
