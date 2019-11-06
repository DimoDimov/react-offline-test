import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
jest.mock('@/shared/http-services/data-api.service');
import { dataApi } from '@/shared/http-services/data-api.service';
import EnergyGenerationDonutchart from './energy-generation-donutchart.component';

describe('<Donutchart energyGenerationData={data.generationmix} />', () => {
    let mockedDataApi: jest.Mock;

    const data = {
        generationmix: [
            { fuel: 'nuclear', perc: 32 },
            { fuel: 'gas', perc: 43 },
            { fuel: 'wind', perc: 22 },
            { fuel: 'other', perc: 3 }
        ]
    };

    let container = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);

        mockedDataApi = (dataApi as jest.Mock).mockImplementation(() => data);
        act(() => {
            render(
                <EnergyGenerationDonutchart
                    energyGenerationData={data.generationmix}
                />,
                container
            );
        });
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        mockedDataApi.mockRestore();
    });

    it('should render and match snapshot', () => {
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });

    it('should render nothing if there is no data', () => {
        act(() => {
            render(
                <EnergyGenerationDonutchart energyGenerationData={[]} />,
                container
            );
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });

    it('should create donut chart and a legend with nuclear, gas, wind, other', () => {
        expect(
            container.querySelectorAll('.donut-chart-container .donutchart')
                .length
        ).toBe(1);

        const allDonutLegendItems = container.querySelectorAll(
            '.donut-chart-container .donutchart-legend-item-label'
        );

        expect(allDonutLegendItems.length).toBe(4);
        expect(allDonutLegendItems[0].textContent.trim()).toBe('nuclear - 32');
        expect(allDonutLegendItems[1].textContent.trim()).toBe('gas - 43');
        expect(allDonutLegendItems[2].textContent.trim()).toBe('wind - 22');
        expect(allDonutLegendItems[3].textContent.trim()).toBe('other - 3');
    });
});
