export const getWeek = (date) => {
    const currentDate = date.getDate();
    const firstDay = new Date(date.setDate(1)).getDay();
    return Math.ceil((currentDate + firstDay) / 7);
};
// year, month, week가 모두 있으면 해당 datetime,
// 아니라면 현재 시간에 맞는 datetime을 반환해줌.
export const getDatetime = (year, month, week) => {
    if (year && month && week)
        return `${year}-${month}-${week}`;
    const date = new Date();
    return `${date.getFullYear()}-${date.getMonth() + 1}-${getWeek(date)}`;
};
// 피셔-예이츠 셔플 알고리즘 사용. 자바스크립트 sort 메서드 사용시보다 분포가 고르다.
export const shuffleMembers = (array) => {
    const shuffledArray = [...array];
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return shuffledArray;
};
