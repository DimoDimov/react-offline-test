import React, { useEffect, useState } from 'react';
import { uid } from 'react-uid';
import DonutChart from 'react-donut-chart';
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
import { GETURL } from '@/shared/constants/energy-generation.constants';
import { dataApi } from '@/shared/http-services/data-api.service';
import { IEnergyItemModel } from '@/shared/models/energy-generation-data.model';
import pukingUnicorn from '@/images/pukingUnicorn.jpg';
import pukingUnicorn2 from '@/images/pukingUnicorn2.jpg';
import './energy-generation.css';

const EnergyGeneration: React.FC = () => {
    const [lastUpdated, setLastUpdated] = useState('');
    const [pukingUnicornImg, setPukingUnicornImg] = useState(pukingUnicorn);

    const initValue = { generationmix: [], from: '', to: '' };

    const { data, isLoading, isError } = dataApi(GETURL, initValue, 5);

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

    const updateUnicorn = () => {
        pukingUnicornImg === pukingUnicorn
            ? setPukingUnicornImg(pukingUnicorn2)
            : setPukingUnicornImg(pukingUnicorn);
    };

    useEffect(() => {
        // updating the date and time for the fetched data
        if (!isLoading && !isError && data && data.generationmix.length) {
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
    }, [isLoading, isError, data]);

    return (
        //shorter syntax for <React.Fragment>
        <>
            <div>
                <h4 className="provided-data-update-date">
                    The provided data was last updated on {lastUpdated}
                </h4>
                {isError && (
                    <div className="connection-error">
                        Unable to establish a connection with server
                    </div>
                )}
                {isLoading && (
                    <div
                        className="spinner-border loading-spinner"
                        data-role="status"
                    >
                        <span className="sr-only">Loading...</span>
                    </div>
                )}
                {!isError && !isLoading && data && data.generationmix && (
                    <>
                        <div className="container energy-generation-container py-5">
                            <div className="row gauge-chart-container">
                                {data.generationmix.map(
                                    (gm: IEnergyItemModel) => (
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
                                                {React.createElement(
                                                    iconsMaps[gm.fuel]
                                                )}
                                            </h2>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-2"></div>
                            <div className="col-md-10 donut-chart-container">
                                <DonutChart
                                    data={data.generationmix.map(
                                        (gm: IEnergyItemModel) => ({
                                            label: gm.fuel,
                                            value: gm.perc
                                        })
                                    )}
                                    innerRadius={0.5}
                                    formatValues={(
                                        values: number,
                                        total: number
                                    ) =>
                                        `${((values / total) * 100).toFixed(
                                            2
                                        )}%`
                                    }
                                />
                            </div>
                        </div>
                    </>
                )}
                {!data && <div>No data available</div>}
                <div className="container unicorn-container mt-5">
                    <h4>And of course giant unicorn's rainbow puke!!</h4>
                    <div className="col-xs-6">
                        <span className="cursor-pointer">
                            <img
                                className="unicorn-image"
                                src={pukingUnicornImg}
                                alt="puking unicor"
                                onClick={updateUnicorn}
                            />
                        </span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default EnergyGeneration;
