import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { renderHook } from '@testing-library/react-hooks';
import { dataApi } from './data-api.service';

describe('dataApi', () => {
    test('should test dataApi GET when the request is successful', async () => {
        const initialValue = {
            generationmix: [],
            from: '',
            to: ''
        };
        const mock = new MockAdapter(axios);

        const mockedData = {
            data: {
                generationmix: [{ perc: 0, fuel: '' }],
                from: '1',
                to: '2'
            }
        };
        const url = 'http://mocked-data.com';
        mock.onGet(url).reply(200, mockedData);

        const { result, waitForNextUpdate } = renderHook(() =>
            dataApi(url, initialValue)
        );
        expect(result.current.isLoading).toBeTruthy();
        expect(result.current.data).toEqual({
            generationmix: [],
            from: '',
            to: ''
        });

        await waitForNextUpdate();

        expect(result.current.data).toEqual({
            generationmix: [{ perc: 0, fuel: '' }],
            from: '1',
            to: '2'
        });
        expect(result.current.isLoading).toBeFalsy();
    });

    test('should test dataApi GET request when an error occurs', async () => {
        const mock = new MockAdapter(axios);

        const initialValue = {
            generationmix: [],
            from: '',
            to: ''
        };
        const url = 'http://mocked-error-data.com';

        mock.onGet(url).networkError();

        const { result, waitForNextUpdate } = renderHook(() =>
            dataApi(url, initialValue)
        );

        expect(result.current.data).toEqual({
            generationmix: [],
            from: '',
            to: ''
        });
        expect(result.current.isLoading).toBeTruthy();

        await waitForNextUpdate();

        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.data).toEqual({
            generationmix: [],
            from: '',
            to: ''
        });
        expect(result.current.isError).toBeTruthy();
    });

    test('should test dataApi GET request when a timeout occurs', async () => {
        const mock = new MockAdapter(axios);

        const initialValue = {
            generationmix: [],
            from: '',
            to: ''
        };
        const url = 'http://mocked-error-data.com';

        mock.onGet(url).timeout();

        const { result, waitForNextUpdate } = renderHook(() =>
            dataApi(url, initialValue)
        );

        expect(result.current.data).toEqual({
            generationmix: [],
            from: '',
            to: ''
        });
        expect(result.current.isLoading).toBeTruthy();

        await waitForNextUpdate();

        expect(result.current.isLoading).toBeFalsy();
        expect(result.current.data).toEqual({
            generationmix: [],
            from: '',
            to: ''
        });
        expect(result.current.isError).toBeTruthy();
    });
});
