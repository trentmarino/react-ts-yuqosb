import * as React from 'react';

import './style.css';
import { TransferList } from './TransferList';

export default function App() {
  return (
    <div>
      <div className="container">
        <h1 className="text-xl font-bold">Transfer List</h1>
        <p>Read the description to start solving the problem. 💯</p>
        <TransferList />
      </div>
    </div>
  );
}
