import { IEnergyGenerationModel } from './energy-generation-data.model';

export interface IDataFetchResult {
    data: IEnergyGenerationModel;
    isLoading: boolean;
    isError: boolean;
}

export enum FetchTypes {
    FETCH_LOADING,
    FETCH_SUCCESS,
    FETCH_FAILURE
}

export interface FetchActionTypes {
    type: FetchTypes;
    payload?: IEnergyGenerationModel;
}
