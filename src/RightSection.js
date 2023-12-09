import React from 'react';
import Section from './Section';

const RightSection = ({ items, moveItem, moveAll, handleSearch }) => {
  return (
    <Section
      title="Selected"
      items={items}
      moveItem={moveItem}
      moveAll={moveAll}
      handleSearch={handleSearch}
    />
  );
};

export default RightSection;
