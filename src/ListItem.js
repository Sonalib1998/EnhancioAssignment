import React from 'react';
import { useDrag } from 'react-dnd';

const ListItem = ({ item, moveItem, handleToggle, isExpanded }) => {
  const [{ isDragging }, drag] = useDrag({
    type: 'ITEM',
    item: { id: item.id },
    collect: monitor => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const handleMove = () => {
    moveItem(item.id);
  };

  return (
    <li ref={drag} style={{ opacity: isDragging ? 0.5 : 1 }}>
      <label>
        <input type="checkbox" onChange={handleMove} />
        {item.name}
        {item.subIndustryList && item.subIndustryList.length > 0 && (
          <button onClick={() => handleToggle(item.id)}>
            {isExpanded ? '▼' : '▶'}
          </button>
        )}
      </label>
      {isExpanded && item.subIndustryList && (
        <ul>
          {item.subIndustryList.map(subItem => (
            <ListItem
              key={subItem.id} 
              item={subItem} 
              moveItem={moveItem} 
              handleToggle={handleToggle} 
              isExpanded={false} 
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default ListItem;


