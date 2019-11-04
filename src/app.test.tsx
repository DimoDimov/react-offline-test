import { render, unmountComponentAtNode } from 'react-dom';
import pretty from 'pretty';
import React from 'react';
import { act } from 'react-dom/test-utils';
import App from './app';
jest.mock('@/shared/http-services/data-api.service');
import { dataApi } from '@/shared/http-services/data-api.service';

describe('<App />', () => {
    let container = null;
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

    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);

        mockedDataApi = (dataApi as jest.Mock).mockImplementation(() => data);
        mockDateNow = jest
            .spyOn(global.Date, 'now')
            .mockImplementation(() => new Date(now).getTime());
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
        mockedDataApi.mockRestore();
        mockDateNow.mockRestore();
    });

    it('should render without crashing', async () => {
        await act(async () => {
            render(<App />, container);
        });

        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });

    it('should display the GB Electricity National Grid Demand and Output ', async () => {
        await act(async () => {
            render(<App />, container);
        });

        expect(container.querySelector('h2').textContent).toBe(
            'GB Electricity National Grid Demand and Output'
        );
    });
});
