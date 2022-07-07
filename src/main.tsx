import React from 'react';
import ReactDOM from 'react-dom/client';

const el = document.getElementById('root');
if (el === null) throw new Error('Root container missing in index.html');

ReactDOM.createRoot(el).render(
  <React.StrictMode>
    <div>Hello, world!</div>
  </React.StrictMode>,
);
