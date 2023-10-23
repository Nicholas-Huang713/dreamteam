export const randomScoreBasedOnAvg = (avg, standardDeviation) => {
    return avg + standardDeviation * Math.floor((Math.random() + Math.random() + Math.random() - 1.5));
}

export const calculatePlayerPrice = (values) => {
    const total = values.reduce((accum, current) => accum + current, 0);
    return total * 2;
}