import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
jest.mock('@/shared/http-services/data-api.service');
import { dataApi } from '@/shared/http-services/data-api.service';
import EnergyGenerationGaugeList from './energy-generation-gauge-list.component';

describe('<EnergyGenerationGaugeList energyGenerationData={data.generationmix} />', () => {
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
                <EnergyGenerationGaugeList
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
                <EnergyGenerationGaugeList energyGenerationData={[]} />,
                container
            );
        });
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });

    it('should create four gauge elements - nuclear, gas, wind, other', () => {
        const allChartItems = container.querySelectorAll(
            '.gauge-chart-item h2'
        );

        expect(allChartItems.length).toBe(4);

        expect(allChartItems[0].textContent.trim()).toBe('nuclear');
        expect(allChartItems[1].textContent.trim()).toBe('gas');
        expect(allChartItems[2].textContent.trim()).toBe('wind');
        expect(allChartItems[3].textContent.trim()).toBe('other');
    });
});
