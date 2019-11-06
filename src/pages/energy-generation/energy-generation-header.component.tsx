import React, { useEffect, useState } from 'react';
import { IEnergyItemModel } from '@/shared/models/energy-generation-data.model';

const EnergyGenerationHeader: React.FC<{
    energyGenerationData: IEnergyItemModel[];
}> = ({ energyGenerationData }) => {
    const [lastUpdated, setLastUpdated] = useState('');

    useEffect(() => {
        // updating the date and time for the fetched data
        if (energyGenerationData && energyGenerationData.length) {
            const optionsDate = {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            };

            const optionsTime = { hour: '2-digit', minute: '2-digit' };
            var now = new Date(Date.now());
            const lastUpdatedStr = `${now.toLocaleDateString(
                'en-UK',
                optionsDate
            )} ${new Date(now).toLocaleTimeString('en-UK', optionsTime)}`;
            setLastUpdated(lastUpdatedStr);
        }
    }, [energyGenerationData]);

    return (
        <h4 className="provided-data-update-date">
            The provided data was last updated on {lastUpdated}
        </h4>
    );
};

export default EnergyGenerationHeader;
