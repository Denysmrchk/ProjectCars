import React, { useEffect, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip, Legend);

export const CircularChart = ({ value }: { value: number }) => {
  const angle = (value / 100) * 180 - 90;
  const [animatedValue, setAnimatedValue] = useState(-90);
  useEffect(() => {
    setAnimatedValue(angle);
  }, [value]);
  const data = {
    datasets: [
      {
        data: [65, 20, 15],
        backgroundColor: ['green', 'orange', 'red'],
        borderWidth: 0,
      },
    ],
  };

  const options = {
    cutout: '70%',
    rotation: -90,
    circumference: 180,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const getNeedleStyle = (value: number) => {
    return {
      transform: `rotate(${animatedValue}deg)`,
      transformOrigin: 'bottom center',
      transition: 'transform 1.5s ease-out',
    };
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', userSelect: 'none' }}>
      <Doughnut data={data} options={options} />

      <div style={{ position: 'absolute', top: '37px', left: '65px', width: '0', height: '0' }}>
        <svg style={getNeedleStyle(value)} height="75" width="20" viewBox="0 0 20 100">
          <polygon points="10,0 0,100 20,100" fill="black" />
        </svg>
      </div>
      {value < 65 ? (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '-20px',
            color: 'green',
            fontSize: '12px',
            fontWeight: 'bold',
          }}>
          Good Price
        </div>
      ) : value < 80 ? (
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '100px',
            color: 'orange',
            fontSize: '12px',
            fontWeight: 'bold',
          }}>
          Risky
        </div>
      ) : (
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '150px',
            color: 'red',
            fontSize: '12px',
            fontWeight: 'bold',
          }}>
          Did somebody buy it?
        </div>
      )}
    </div>
  );
};
