import './App.css';

import AaplPage from '@/components/aapl/page';
import { ModeToggle } from '@/components/mode-toggle';
import { Toaster } from '@/components/ui/toaster';

function App() {
  return (
    <>
      <div className="fixed bottom-2 left-2 z-50">
        <ModeToggle />
      </div>
      <div className="text-center text-3xl font-bold pt-4 my-10">AAPL Income Statements</div>
      <AaplPage />
      <Toaster />
    </>
  );
}

export default App;
