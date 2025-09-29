import { UserType } from "../../../shared/types/user.js";
import { db, mapDocument } from "../utilities/database.util.js";
import authUtil from "../utilities/auth.util.js";

export const findAllUsers = async (): Promise<UserType[]> => {
  const usersRef = db.collection("users");

  const snapshot = await usersRef.get();

  const users: UserType[] = [];

  snapshot.forEach((doc) => users.push(mapDocument<UserType>(doc)));

  return users;
};

export const findOneUser = async (email: string): Promise<UserType | null> => {
  const usersRef = db.collection("users").where("email", "==", email);

  const snapshot = await usersRef.get();

  if (snapshot.empty) return null;

  const users: UserType[] = [];

  snapshot.forEach((doc) => users.push(mapDocument<UserType>(doc)));

  return users[0];
};

export const createUser = async (user: Omit<UserType, "id">) => {
  const usersRef = db.collection("users");

  // hash password
  user.password = await authUtil.hashPassword(user.password);

  // save to database
  const docRef = await usersRef.add(user);

  // fetch the created document and map it
  const snapshot = await docRef.get();
  const createdUser = mapDocument<UserType>(snapshot);

  if (!createdUser) throw new Error("Failed to create user");

  // return the newly created user
  return createdUser;
};
