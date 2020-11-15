declare interface IPathfinder {
  search(origin: IPosition,
    goal: {
      pos: IPosition,
      range: number
    }[],
    opts?: {
      plainCost?: number;
      swampCost?: number;
      flee?: boolean;   
    }): { path: IPosition[]; incomplete: boolean }
}
