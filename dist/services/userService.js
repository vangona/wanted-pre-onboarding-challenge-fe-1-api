import { create, db } from "../models/db";
export const createUser = async ({ email, password, }) => {
    const newUser = create({ email, password });
    db.data?.users.push(newUser);
    await db.write();
    return newUser;
};
export const findUser = (predicate) => {
    return db.data?.users.find(predicate);
};
