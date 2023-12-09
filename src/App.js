import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import LeftSection from './LeftSection';
import RightSection from './RightSection';
import data from './data.json';
import './App.css';

const App = () => {
  const [leftItems, setLeftItems] = useState(data);
  const [rightItems, setRightItems] = useState([]);
  const [moveDirection, setMoveDirection] = useState('left');

  const moveItem = (fromSection, toSection, itemId) => {
    const itemToMove = findItem(fromSection, itemId);
    const updatedFromSection = removeItem(fromSection, itemId);
    const updatedToSection = [...toSection, itemToMove];

    if (toSection === rightItems) {
      setLeftItems(updatedFromSection);
      setRightItems(updatedToSection);
    } else {
      setLeftItems(updatedToSection);
      setRightItems(updatedFromSection);
    }
  };

  const moveAllItems = () => {
    if (moveDirection === 'left') {
      setLeftItems([...leftItems, ...rightItems]);
      setRightItems([]);
      setMoveDirection('right');
    } else {
      setRightItems([...rightItems, ...leftItems]);
      setLeftItems([]);
      setMoveDirection('left');
    }
  };

  const handleSearch = query => {
    const filteredLeftItems = filterItems(leftItems, query);
    const filteredRightItems = filterItems(rightItems, query);

    setLeftItems(filteredLeftItems);
    setRightItems(filteredRightItems);
  };

  const filterItems = (items, query) => {
    return items.reduce((result, item) => {
      const filteredChildren = item.subIndustryList
        ? filterItems(item.subIndustryList, query)
        : [];
  
      const isMatch = item.name.toLowerCase().includes(query.toLowerCase());
  
      if (isMatch || filteredChildren.length > 0) {
        result.push({
          ...item,
          subIndustryList: filteredChildren,
        });
      }
  
      return result;
    }, []);
  };
  

  const findItem = (section, itemId) => {
    for (const item of section) {
      if (item.id === itemId) {
        return item;
      } else if (item.subIndustryList && item.subIndustryList.length > 0) {
        const childResult = findItem(item.subIndustryList, itemId);
        if (childResult) {
          return childResult;
        }
      }
    }
  };

  const removeItem = (section, itemId) => {
    return section.filter(item => {
      if (item.id === itemId) {
        return false;
      } else if (item.subIndustryList && item.subIndustryList.length > 0) {
        item.subIndustryList = removeItem(item.subIndustryList, itemId);
        return true;
      }
      return true;
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <h3>Industries</h3>
      <input
        type="text"
        placeholder="Search..."
        onChange={e => handleSearch(e.target.value)}
      />
      <div className="app-container">
        <LeftSection
          items={leftItems}
          moveItem={itemId => moveItem(leftItems, rightItems, itemId)}
        />
        <button onClick={moveAllItems}>Move All</button>
        <RightSection
          items={rightItems}
          moveItem={itemId => moveItem(rightItems, leftItems, itemId)}
        />
      </div>
    </DndProvider>
  );
};

export default App;
