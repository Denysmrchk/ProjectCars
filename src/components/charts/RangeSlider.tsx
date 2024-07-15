import React, { FC, useState } from 'react';
import 'swiper/swiper-bundle.css';
import { Col, InputNumber, Row, Slider, Space } from 'antd';
export interface IRangeSliderProps {
  step: number;
  priceCar: number;
  maxValue: number;
  minValue: number;
  inputValue: number;
  setInputValue: (value: number) => void;
}
export const RangeSlider: FC<IRangeSliderProps> = ({
  step,
  priceCar,
  maxValue,
  minValue,
  inputValue,
  setInputValue,
}) => {
  const [inputValueLocal, setInputValueLocal] = useState(priceCar);
  const onChange = (newValue: number | null) => {
    if (newValue) {
      setInputValue(newValue);
      setInputValueLocal(newValue);
    }
  };

  return (
    <Space
      style={{
        width: '100%',
      }}
      direction="vertical">
      <Row>
        <Col span={12}>
          <Slider
            step={step}
            min={minValue}
            max={maxValue}
            onChange={onChange}
            value={typeof inputValue === 'number' ? inputValueLocal : 0}
          />
        </Col>
        <Col span={4}>
          <InputNumber
            step={step}
            min={minValue}
            max={maxValue}
            style={{
              margin: '0 16px',
            }}
            value={inputValueLocal}
            onChange={onChange}
          />
        </Col>
      </Row>
    </Space>
  );
};
