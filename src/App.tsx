import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import './App.css';
import StarBackground from './components/StarBackground';
import LandingPage from './components/LandingPage';
import JourneyTransition from './components/JourneyTransition';
import PwnedPage from './components/PwnedPage';

function App() {
  const [stage, setStage] = useState<'landing' | 'journey' | 'pwned'>('landing');

  const startJourney = () => {
    setStage('journey');
  };

  const finishJourney = () => {
    setStage('pwned');
  };

  return (
    <div className="App">
      {stage !== 'pwned' && <StarBackground />}

      <AnimatePresence mode="wait">
        {stage === 'landing' && (
          <LandingPage key="landing" onStart={startJourney} />
        )}

        {stage === 'journey' && (
          <JourneyTransition key="journey" onComplete={finishJourney} />
        )}

        {stage === 'pwned' && (
          <PwnedPage key="pwned" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
