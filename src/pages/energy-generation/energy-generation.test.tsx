import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import EnergyGeneration from './energy-generation';
import pretty from 'pretty';
jest.mock('@/shared/http-services/data-api.service');
import { dataApi } from '@/shared/http-services/data-api.service';

describe('<EnergyGeneration />', () => {
    const now = '2019-10-25T00:20';
    let mockDateNow: jest.SpyInstance;
    let mockedDataApi: jest.Mock;

    const data = {
        data: {
            from: '2019-10-25T00:00Z',
            to: '2019-10-25T00:30Z',
            generationmix: [
                { fuel: 'nuclear', perc: 32 },
                { fuel: 'gas', perc: 43 },
                { fuel: 'wind', perc: 22 },
                { fuel: 'other', perc: 3 }
            ]
        },
        isLoading: false,
        isError: false
    };

    let container = null;
    beforeEach(async () => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);

        mockedDataApi = (dataApi as jest.Mock).mockImplementation(() => data);

        mockDateNow = jest
            .spyOn(global.Date, 'now')
            .mockImplementation(() => new Date(now).getTime());

        await act(async () => {
            render(<EnergyGeneration />, container);
        });
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        mockedDataApi.mockRestore();
        mockDateNow.mockRestore();
    });

    it('should render and match snapshot', () => {
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });

    it('should updated The provided data date and time ', () => {
        expect(
            container.querySelectorAll('.provided-data-update-date').length
        ).toBe(1);
        expect(
            container.querySelector('.provided-data-update-date').textContent
        ).toBe(
            'The provided data was last updated on Friday, October 25, 2019 12:20 AM'
        );
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

    it('should display a unicorn', () => {
        expect(container.querySelectorAll('.unicorn-image').length).toBe(1);
    });

    it('should display a loading while loading fetching the data', async () => {
        const mockedLoadingData = { isLoading: true, isError: false, data: {} };

        mockedDataApi = (dataApi as jest.Mock).mockImplementation(
            () => mockedLoadingData
        );

        await act(async () => {
            render(<EnergyGeneration />, container);
        });
        expect(container.querySelectorAll('.loading-spinner').length).toBe(1);
        expect(container.querySelector('.loading-spinner').textContent).toBe(
            'Loading...'
        );
    });

    it('should display an error if error occurs while fetching data', async () => {
        const mockedLoadingData = { isLoading: false, isError: true, data: {} };

        mockedDataApi = (dataApi as jest.Mock).mockImplementation(
            () => mockedLoadingData
        );

        await act(async () => {
            render(<EnergyGeneration />, container);
        });
        expect(container.querySelectorAll('.connection-error').length).toBe(1);
        expect(container.querySelector('.connection-error').textContent).toBe(
            'Unable to establish a connection with server'
        );
    });
});
