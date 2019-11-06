import React from 'react';
import { IEnergyItemModel } from '@/shared/models/energy-generation-data.model';
import { uid } from 'react-uid';
import GaugeChart from 'react-gauge-chart';
import { FaGripfire, FaRecycle } from 'react-icons/fa';
import {
    GiCoalWagon,
    GiBatteryPlus,
    GiElectricalResistance,
    GiWaterSplash,
    GiSolarPower,
    GiWindTurbine
} from 'react-icons/gi';
import { IoIosNuclear } from 'react-icons/io';

const EnergyGenerationGaugeList: React.FC<{
    energyGenerationData: IEnergyItemModel[];
}> = ({ energyGenerationData }) => {
    const iconsMaps = {
        biomass: FaRecycle,
        gas: FaGripfire,
        coal: GiCoalWagon,
        nuclear: IoIosNuclear,
        other: GiBatteryPlus,
        imports: GiElectricalResistance,
        hydro: GiWaterSplash,
        solar: GiSolarPower,
        wind: GiWindTurbine
    };

    return (
        <>
            {energyGenerationData && energyGenerationData.length && (
                <div className="container energy-generation-container py-5">
                    <div className="row gauge-chart-container">
                        {energyGenerationData.map((gm: IEnergyItemModel) => (
                            <div
                                className="gauge-chart-item col-md-3 col-xs-12 p-1 ml-5 m-2 bg-light border border-secondary rounded"
                                key={uid(gm)}
                            >
                                <GaugeChart
                                    id={gm.fuel}
                                    nrOfLevels={33}
                                    arcPadding={0.05}
                                    arcWidth={0.4}
                                    cornerRadius={6}
                                    textColor="grey"
                                    needleColor="red"
                                    needleBaseColor="black"
                                    percent={gm.perc / 100}
                                />
                                <h2>
                                    {gm.fuel}{' '}
                                    {React.createElement(iconsMaps[gm.fuel])}
                                </h2>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </>
    );
};

export default EnergyGenerationGaugeList;
