import React from 'react';
import Section from './Section';

const LeftSection = ({ items, moveItem, moveAll, handleSearch }) => {
  return (
    <Section
      title="Choose from"
      items={items}
      moveItem={moveItem}
      moveAll={moveAll}
      handleSearch={handleSearch}
    />
  );
};

export default LeftSection;
