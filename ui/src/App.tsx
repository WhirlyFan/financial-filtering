import './App.css';

import { Route, Routes } from 'react-router-dom';
import Dashboard from '@/app/dashboard/page';
import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

function App() {
  return (
    <>
      <ModeToggle />
      <Button>Click me</Button>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </>
  );
}

export default App;
