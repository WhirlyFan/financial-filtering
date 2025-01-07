import './App.css';

import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/app/dashboard/page';
import { ModeToggle } from '@/components/mode-toggle';

function App() {
  return (
    <>
      <ModeToggle />
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
