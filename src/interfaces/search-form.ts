export type GeolocationCoordinates = { longitude: number; latitude: number; };

export type ISearchFormChildrenProps = GeolocationCoordinates & { isNearMe: boolean };
