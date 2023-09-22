import { toRadians } from "./index";

export const getDistance = (location1: number[], location2: number[]) => {
    const dLat = toRadians(location2[1] - location1[1]); // 위도와 경도의 각도 차이를 호도법으로 변환 후 변수에 저장한다.
    const dLon = toRadians(location2[0] - location1[0]);

    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(location1[0])) *
            Math.cos(toRadians(location2[0])) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); // 각도 사이의 곡선의 길이를 계산한다. 이 때 그려지는 원은 단위원이다.
    const kilometer = 6371 * c; // 단위원으로 계산된 값을 지구 반지름에 곱해서 실제 거리를 km단위로 얻는다.
    return kilometer; // 지구는 완벽한 구형이 아닌 타원이기 때문에 정확한 위치 계산은 어렵지만 유사한 거리는 이 함수를 통해 계산할 수 있다.
};
