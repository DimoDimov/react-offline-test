import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
jest.mock('@/shared/http-services/data-api.service');
import EnergyGenerationHeader from './energy-generation-header.component';

describe('<EnergyGenerationHeader />', () => {
    const now = '2019-10-25T00:20';
    let mockDateNow: jest.SpyInstance;

    const data = {
        generationmix: [{ fuel: 'nuclear', perc: 32 }]
    };

    let container = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);

        mockDateNow = jest
            .spyOn(global.Date, 'now')
            .mockImplementation(() => new Date(now).getTime());

        act(() => {
            render(
                <EnergyGenerationHeader
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
        mockDateNow.mockRestore();
    });

    it('should render and match snapshot', () => {
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });

    it('should updated The provided data date and time ', async () => {
        expect(
            container.querySelectorAll('.provided-data-update-date').length
        ).toBe(1);
        expect(
            container.querySelector('.provided-data-update-date').textContent
        ).toBe(
            'The provided data was last updated on Friday, October 25, 2019 12:20 AM'
        );
    });
});
