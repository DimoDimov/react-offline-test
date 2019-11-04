import axios, { AxiosError } from 'axios';
import { useEffect, useReducer } from 'react';
import {
    IDataFetchResult,
    FetchTypes,
    FetchActionTypes
} from '../models/data-api-store.model';
import { IEnergyGenerationModel } from '@/shared/models/energy-generation-data.model';

/* 
@endpoint: string param with the url
@initialData: the initial data that we might or might not want to display
@fetchDataIntervalMinutes: optional param of how often we should fetch the latest data
*/

export const dataApi = (
    endpoint: string,
    initialData: IEnergyGenerationModel,
    fetchDataIntervalMinutes?: number
): IDataFetchResult => {
    const dataFetchReducer = (
        state: IDataFetchResult,
        action: FetchActionTypes
    ) => {
        switch (action.type) {
            case FetchTypes.FETCH_LOADING:
                return {
                    ...state,
                    isLoading: true,
                    isError: false
                };
            case FetchTypes.FETCH_SUCCESS:
                return {
                    isLoading: false,
                    isError: false,
                    data: action.payload
                };
            case FetchTypes.FETCH_FAILURE:
                return {
                    ...state,
                    isLoading: false,
                    isError: true
                };
            default:
                throw new Error();
        }
    };

    const [state, dispatch] = useReducer(dataFetchReducer, {
        isLoading: false,
        isError: false,
        data: initialData
    });

    /* update the user data every five minutes just like in https://gridwatch.co.uk/
    the user displayed data is updated every five minites
    no need for manually refresh, the browser will fetch the data automatically */
    const fetchDataOnInterval = (
        minutes: number,
        callback: () => void
    ): NodeJS.Timeout => {
        // set interval every x minutes
        return global.setInterval(() => {
            callback();
        }, minutes * 60000);
    };

    useEffect(() => {
        let fetchInterval: NodeJS.Timeout = null;
        let fetchTimeOut: NodeJS.Timer = null;

        const fetchData = async () => {
            dispatch({ type: FetchTypes.FETCH_LOADING });
            await axios(endpoint)
                .then((result: { data: { data: IEnergyGenerationModel } }) => {
                    dispatch({
                        type: FetchTypes.FETCH_SUCCESS,
                        payload: result.data.data
                    });
                })
                .catch((err: AxiosError) => {
                    dispatch({ type: FetchTypes.FETCH_FAILURE });
                });
        };
        fetchData();

        /* set initial timeout to call the interval
        it will calculate the time to the closest minute that is
        dividable to 5 without reminder (if fetchDataIntervalMinutes === 5)
        e.g. now is 10:41, if minutes variable is set to 5
        the timeout will refresh the data at 10:45
        afterwards it will delegate the update of the data to the interval 
        that will fire fetch every 5 minutes */
        if (fetchDataIntervalMinutes) {
            const today = new Date();
            // do next call to fetch data in x minutes (every 5 minutes)
            const minuteToMiliseconds = (min: number): number => min * 60000;

            fetchTimeOut = global.setTimeout(() => {
                fetchData();

                fetchInterval = fetchDataOnInterval(
                    fetchDataIntervalMinutes,
                    fetchData
                );
            }, minuteToMiliseconds(fetchDataIntervalMinutes - (today.getMinutes() % fetchDataIntervalMinutes)));
        }

        // clean up the effect from previous render
        return () => {
            global.clearTimeout(fetchTimeOut);
            clearTimeout(fetchTimeOut);
            global.clearInterval(fetchInterval);
        };
    }, [endpoint, fetchDataIntervalMinutes]);
    return { ...state };
};
