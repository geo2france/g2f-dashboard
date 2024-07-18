import React from 'react'
import { CaretLeftOutlined, CaretRightOutlined } from "@ant-design/icons"
import { Button, Flex, Select, SelectProps} from "antd"
import { CSSProperties, useEffect, useState } from "react"
import './NextPrevSelect_style.css'


export interface NextPrevSelectProps  {
    options:SelectProps['options']
    style?:CSSProperties
    defaultValue?:string | number
    value:string | number
    onChange?: (value: string | number) => void;
    reverse?:boolean // False : next = goDown
  }

export const NextPrevSelect: React.FC<NextPrevSelectProps> = ({
  options = [],
  style,
  value,
  defaultValue,
  onChange,
  reverse = false,
}) => {
  const [current_value, setCurrent_value] = useState<string | number>(value);

  const current_index = options?.findIndex((o) => o.value == current_value);

  const next = () =>
    reverse
      ? options[current_index - 1].value!
      : options[current_index + 1].value!;

  const previous = () =>
    reverse
      ? options[current_index + 1].value!
      : options[current_index - 1].value!;

  const isFirst = () =>
    reverse ? current_index == options.length - 1 : current_index == 0;

  const isLast = () =>
    reverse ? current_index == 0 : current_index == options.length - 1;


  useEffect(() => {
    onChange && onChange(current_value.toString());
  }, [current_value])


  return (
    <Flex style={style}>
      <Button className="nextPrevSelect-left-button" onClick={() => setCurrent_value(previous())} disabled={isFirst()}>
      <CaretLeftOutlined />
      </Button>
      <Select
        className="nextPrevSelect"
        options={options}
        style={style}
        value={current_value}
        defaultValue={defaultValue}
        onChange={setCurrent_value}
      />
      <Button className="nextPrevSelect-right-button" onClick={() => setCurrent_value(next())} disabled={isLast()}>
      <CaretRightOutlined />
      </Button>
    </Flex>
  );
};
