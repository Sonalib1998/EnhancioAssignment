import React, { useState } from 'react';
import { useDrop } from 'react-dnd';
import ListItem from './ListItem';

const Section = ({ title, items, moveItem, handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedItems, setExpandedItems] = useState([]);

  const filteredItems = items.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleToggle = (itemId) => {
    if (expandedItems.includes(itemId)) {
      setExpandedItems(expandedItems.filter(id => id !== itemId));
    } else {
      setExpandedItems([...expandedItems, itemId]);
    }
  };

  const [{ isOver }, drop] = useDrop({
    accept: 'ITEM',
    drop: (draggedItem) => moveItem(draggedItem.id),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  return (
    <div ref={drop} className="section" style={{ border: isOver ? '2px solid #73b892' : '1px solid #ddd' }}>
      {title}
      <ul>
        {filteredItems.map(item => (
          <ListItem
            key={item.id}
            item={item}
            moveItem={moveItem}
            handleToggle={handleToggle}
            isExpanded={expandedItems.includes(item.id)}
          />
        ))}
      </ul>
    </div>
  );
};

export default Section;




