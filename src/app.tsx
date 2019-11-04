import React from 'react';
import EnergyGeneration from '@/pages/energy-generation/energy-generation';

const App: React.FC = () => (
    <>
        <div className="text-center mt-5">
            <h2>GB Electricity National Grid Demand and Output</h2>
            <div>
                <EnergyGeneration />
            </div>
        </div>
    </>
);

export default App;
