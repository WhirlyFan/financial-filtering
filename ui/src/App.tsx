import './App.css';

import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/app/dashboard/page';
import { ModeToggle } from '@/components/mode-toggle';

function App() {
  return (
    <>
      <div className="fixed bottom-2 left-2 z-50">
        <ModeToggle />
      </div>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
