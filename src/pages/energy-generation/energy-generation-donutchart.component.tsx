import React from 'react';
import DonutChart from 'react-donut-chart';
import { IEnergyItemModel } from '@/shared/models/energy-generation-data.model';

const EnergyGenerationDonutchart: React.FC<{
    energyGenerationData: IEnergyItemModel[];
}> = ({ energyGenerationData }) => {
    return (
        <>
            {energyGenerationData && energyGenerationData.length && (
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-10 donut-chart-container">
                        <DonutChart
                            data={energyGenerationData.map(
                                (gm: IEnergyItemModel) => ({
                                    label: gm.fuel,
                                    value: gm.perc
                                })
                            )}
                            innerRadius={0.5}
                            formatValues={(values: number, total: number) =>
                                `${((values / total) * 100).toFixed(2)}%`
                            }
                        />
                    </div>
                </div>
            )}
        </>
    );
};

export default EnergyGenerationDonutchart;
