import { ASCII_STARTING_INDEX, NUMBER_OF_GROUPS, } from "../constants/dailyscrum";
import { create, db } from "../models/db";
import { shuffleMembers } from "../utils/dailyscrumUtils";
export const findGroupSnapshotByDatetime = (datetime) => {
    const groupSnapshot = db.data?.dailyscrum_group_snapshots.filter((snapshot) => snapshot.datetime === datetime)[0]; // 하나만 반환함. 생성이나 업데이트 시에 datetime이 중복되지 않게 구현해두었음.
    if (groupSnapshot) {
        return groupSnapshot;
    }
    else {
        return new Error("해당하는 그룹이 없습니다.");
    }
};
export const getMembers = () => {
    return db.data?.dailyscrum_members;
};
const getRandomGroups = (members) => {
    const result = {};
    const membersOfGroup = Math.floor(members.length / NUMBER_OF_GROUPS);
    const shuffledMembers = shuffleMembers(members);
    for (let i = 0; i < NUMBER_OF_GROUPS; i++) {
        result[String.fromCharCode(i + ASCII_STARTING_INDEX)] =
            shuffledMembers.splice(0, membersOfGroup);
    }
    // 남은 멤버들을 나눠줌.
    shuffledMembers.forEach((member, index) => {
        result[String.fromCharCode(index + ASCII_STARTING_INDEX)].push(member);
    });
    return result;
};
const getSnapshotOverlapIndex = (prevGroupSnapshots, datetime) => {
    let overlapIndex = -1;
    prevGroupSnapshots.some((snapshot, index) => {
        if (snapshot.datetime === datetime) {
            overlapIndex = index;
            return true;
        }
    });
    return overlapIndex;
};
export const createGroupSnapshot = async (datetime) => {
    if (db.data === null)
        return "DB에 데이터가 없습니다. 개발자에게 어서 빨리 초기 세팅을 하라고 재촉해주세요.";
    const members = getMembers();
    if (members === undefined)
        return "멤버가 아무도 없습니다.";
    const newGroups = getRandomGroups(members);
    const newGroupSnapshot = create({ datetime, groups: newGroups });
    const prevGroupSnapshots = db.data?.dailyscrum_group_snapshots;
    if (prevGroupSnapshots === undefined) {
        db.data.dailyscrum_group_snapshots = [newGroupSnapshot];
    }
    else {
        const overlapIndex = getSnapshotOverlapIndex(prevGroupSnapshots, datetime);
        overlapIndex !== -1
            ? (prevGroupSnapshots[overlapIndex] = newGroupSnapshot)
            : prevGroupSnapshots.push(newGroupSnapshot);
    }
    await db.write();
    return newGroupSnapshot;
};
