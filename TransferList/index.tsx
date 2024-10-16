import React, { useEffect, useState } from 'react';
import { data } from '../TransferList/data';
import './transferList.css';
import RightArrow from './RightArrow';
import LeftArrow from './LeftArrow';

type dataType = {
  title: string;
  checked: boolean;
  id: number;
};

export const TransferList = () => {
  const [leftContainerList, setLeftContainerList] = useState<Array<dataType>>(
    []
  );
  const [rightContainerList, setRightContainerList] = useState<Array<dataType>>(
    []
  );

  useEffect(() => {
    setLeftContainerList(data);
  }, []);

  const handleItemSelect = (item: dataType, continer: 'left' | 'right') => {
    if (continer === 'left') {
      const leftItemIndex = leftContainerList.findIndex(
        (leftItem) => leftItem.id === item.id
      );
      const newLeftItemContainer = [...leftContainerList];
      newLeftItemContainer[leftItemIndex].checked =
        !newLeftItemContainer[leftItemIndex].checked;
      setLeftContainerList(newLeftItemContainer);
    } else {
      const rightItemIndex = rightContainerList.findIndex(
        (leftItem) => leftItem.id === item.id
      );
      const newRightItemContainer = [...rightContainerList];
      newRightItemContainer[rightItemIndex].checked =
        !newRightItemContainer[rightItemIndex].checked;
      setRightContainerList(newRightItemContainer);
    }
  };

  const moveItem = (moveTo: 'left' | 'right') => {
    const indexesToRemove: Array<number> = [];
    const itemsToMove = [];
    switch (moveTo) {
      case 'left':
        leftContainerList.forEach((value, index) => {
          if (value.checked) {
            value.checked = !value.checked;
            itemsToMove.push(value);
            indexesToRemove.push(index);
          }
        });

        setRightContainerList([...rightContainerList, ...itemsToMove]);
        setLeftContainerList((leftItems) =>
          leftItems.filter(
            (value, index: number) => !indexesToRemove.includes(index)
          )
        );
        break;
      case 'right':
        rightContainerList.forEach((value, index) => {
          if (value.checked) {
            value.checked = !value.checked;
            itemsToMove.push(value);
            indexesToRemove.push(index);
          }
        });

        setLeftContainerList([...leftContainerList, ...itemsToMove]);
        setRightContainerList((leftItems) =>
          leftItems.filter((value, index) => !indexesToRemove.includes(index))
        );
        break;
    }
  };

  const CheckBoxButtons = ({
    val,
    side,
  }: {
    val: dataType;
    side: 'left' | 'right';
  }) => (
    <div
      className={`transferlist_item ${val.checked ? 'checked' : ''}`}
      key={val.id}
      onClick={() => handleItemSelect(val, side)}
    >
      {val.title}
    </div>
  );

  const Container = ({
    items,
    side,
  }: {
    items: Array<dataType>;
    side: 'left' | 'right';
  }) => (
    <div className="transfetList_item_container">
      {items.map((val) => (
        <CheckBoxButtons val={val} side={side} />
      ))}
    </div>
  );

  const Controls = () => (
    <div className="transferList_controls">
      <button onClick={() => moveItem('right')}>
        <LeftArrow />
      </button>
      <button onClick={() => moveItem('left')}>
        <RightArrow />
      </button>
    </div>
  );

  return (
    <div>
      <div className="trandferList_container">
        {/* Left container */}
        <Container items={leftContainerList} side="left" />
        {/* controls */}
        <Controls />
        {/* Right container */}
        <Container items={rightContainerList} side="right" />
      </div>
    </div>
  );
};
