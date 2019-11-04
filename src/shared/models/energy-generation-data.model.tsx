export interface IEnergyItemModel {
    fuel: string;
    perc: number;
}
export interface IEnergyGenerationModel {
    generationmix: IEnergyItemModel[];
    from: string;
    to: string;
}
