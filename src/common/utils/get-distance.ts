import { toRadians } from "./index";

export const getDistance = (location1: number[], location2: number[]) => {
    const dLat = toRadians(location2[1] - location1[1]);
    const dLon = toRadians(location2[0] - location1[0]);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(location1[0])) *
            Math.cos(toRadians(location2[0])) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const kilometer = 6371 * c;
    return kilometer;
};
