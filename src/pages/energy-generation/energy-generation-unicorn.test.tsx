import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import pretty from 'pretty';
jest.mock('@/shared/http-services/data-api.service');
import EnergyGenerationUnicorn from './energy-generation-unicorn.component';

describe('<EnergyGenerationUnicorn />', () => {
    let container = null;
    beforeEach(() => {
        // setup a DOM element as a render target
        container = document.createElement('div');
        document.body.appendChild(container);
        act(() => {
            render(<EnergyGenerationUnicorn />, container);
        });
    });

    afterEach(() => {
        // cleanup on exiting
        unmountComponentAtNode(container);
        container.remove();
        container = null;
    });

    it('should render and match snapshot', () => {
        expect(pretty(container.innerHTML)).toMatchSnapshot();
    });

    it('should display a unicorn', () => {
        expect(container.querySelectorAll('.unicorn-image').length).toBe(1);
    });
});
