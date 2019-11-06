import React, { useEffect, useState } from 'react';

import { GETURL } from '@/shared/constants/energy-generation.constants';
import { dataApi } from '@/shared/http-services/data-api.service';

import './energy-generation.css';
import EnergyGenerationGaugeList from './energy-generation-gauge-list.component';
import EnergyGenerationDonutchart from './energy-generation-donutchart.component';
import EnergyGenerationUnicorn from './energy-generation-unicorn.component';
import EnergyGenerationHeader from './energy-generation-header.component';

const EnergyGeneration: React.FC = () => {
    const initValue = { generationmix: null, from: '', to: '' };

    const { data, isLoading, isError } = dataApi(GETURL, initValue, 5);

    return (
        //shorter syntax for <React.Fragment>
        <>
            <div>
                {/* always display the header */}
                <EnergyGenerationHeader
                    energyGenerationData={data.generationmix}
                />

                {/* if errror display error message */}
                {isError && (
                    <div className="connection-error">
                        Unable to establish a connection with server
                    </div>
                )}

                {/* if loading add spinner */}
                {isLoading && (
                    <div
                        className="spinner-border loading-spinner text-primary"
                        data-role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                )}

                {/* if there is data - display it */}
                {!isError && !isLoading && data && data.generationmix && (
                    <>
                        <EnergyGenerationGaugeList
                            energyGenerationData={data.generationmix}
                        />
                        <EnergyGenerationDonutchart
                            energyGenerationData={data.generationmix}
                        />
                    </>
                )}

                {/* if there isn't any data - display no data message  */}
                {!data && <div>No data available</div>}

                {/* always display the unicorns */}
                <EnergyGenerationUnicorn />
            </div>
        </>
    );
};

export default EnergyGeneration;
