import React, { useState } from 'react';
import './index.css';

function App() {
  const [counters, setCounters] = useState([
    { name: "Counter 1", value: 0, startValue: 0 },
  ]);

  const [newCounterName, setNewCounterName] = useState("");

  const onAddCounter = () => {
    setCounters([...counters, { name: newCounterName, value: 0, startValue: 0 }]);
    setNewCounterName("");
  };

  const onRemoveCounter = () => {
    setCounters(counters.slice(0, -1));
  };

  const onSetName = (index, newName) => {
    const newCounters = [...counters];
    newCounters[index] = { ...newCounters[index], name: newName };
    setCounters(newCounters);
  };

  const onSelectStartValue = (index) => {
    const newStartValue = prompt("Enter a new start value for the counter:");
    if (newStartValue !== null) {
      const newCounters = [...counters];
      newCounters[index] = { ...newCounters[index], startValue: parseInt(newStartValue) };
      setCounters(newCounters);
    }
  };

  const onIncrement = (index) => {
    const newCounters = [...counters];
    newCounters[index].value += 1;
    setCounters(newCounters);
  };

  const onDecrement = (index) => {
    const newCounters = [...counters];
    newCounters[index].value -= 1;
    setCounters(newCounters);
  };

  const onReset = (index) => {
    const newCounters = [...counters];
    newCounters[index].value = newCounters[index].startValue;
    setCounters(newCounters);
  };

  return (
    <div className="container">
      <div className="counter-container">
        {counters.map((counter, index) => (
          <Counter
            key={index}
            name={counter.name}
            value={counter.value}
            onSetName={(newName) => onSetName(index, newName)}
            onSelectStartValue={() => onSelectStartValue(index)}
            onIncrement={() => onIncrement(index)}
            onDecrement={() => onDecrement(index)}
            onReset={() => onReset(index)}
          />
        ))}
      </div>
      <div className="add-remove-container">
        <button className="button" onClick={onAddCounter}>Add Counter</button>
        <button className="button" onClick={onRemoveCounter}>Remove Counter</button>
        <input
          className="input"
          type="text"
          placeholder="Counter Name"
          value={newCounterName}
          onChange={(event) => setNewCounterName(event.target.value)}
        />
      </div>
    </div>
  );
}



function Counter({ name, value, onSetName, onSelectStartValue, onIncrement, onDecrement, onReset }) {
  const [editingName, setEditingName] = useState(false);
  const [tempName, setTempName] = useState(name);

  const handleNameChange = (event) => {
    setTempName(event.target.value);
  };

  const handleSetName = () => {
    onSetName(tempName);
    setEditingName(false);
  };

  return (
    <div className="counter calculator-shape">
      {editingName ? (
        <>
          <input
            className="input"
            type="text"
            value={tempName}
            onChange={handleNameChange}
          />
          <button className="button" onClick={handleSetName}>Set Name</button>
        </>
      ) : (
        <>
          <div className="calculator-screen">
            <p>{name}</p>
            <p>Count: {value}</p>
          </div>
          <div className="calculator-buttons">
            <button className="button" onClick={() => setEditingName(true)}>Edit Name</button>
            <button className="button" onClick={onSelectStartValue}>Set Start Value</button>
            <button className="button" onClick={onIncrement}>Increment</button>
            <button className="button" onClick={onDecrement}>Decrement</button>
            <button className="button" onClick={onReset}>Reset</button>
          </div>
        </>
      )}
    </div>
  );
}


export default App;
