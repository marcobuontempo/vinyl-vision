/**
 * Users Services
 * 
 * Provides database operations for user management
 * 
 */

// TYPES IMPORTS
import type { UserType } from "../../../shared/types/user.js";
// LOCAL IMPORTS
import { db, mapDocument } from "../utilities/database.util.js";
import authUtil from "../utilities/auth.util.js";

/**
 * Fetch all users from the database.
 * @returns {Promise<UserType[]>} - Array of all users
 */
export const findAllUsers = async (): Promise<UserType[]> => {
  const usersRef = db.collection("users");

  const snapshot = await usersRef.get();

  const users: UserType[] = [];

  snapshot.forEach((doc) => users.push(mapDocument<UserType>(doc)));

  return users;
};

/**
 * Fetch a single user by email.
 * @param {string} email - Email of the user
 * @returns {Promise<UserType | null>} - The user or null if not found
 */
export const findOneUser = async (email: string): Promise<UserType | null> => {
  const usersRef = db.collection("users").where("email", "==", email);

  const snapshot = await usersRef.get();

  if (snapshot.empty) return null;

  const users: UserType[] = [];

  snapshot.forEach((doc) => users.push(mapDocument<UserType>(doc)));

  return users[0];
};

/**
 * Fetch a single user by ID.
 * @param {string} id - User ID
 * @returns {Promise<UserType | null>} - The user or null if not found
 */
export const findOneUserById = async (id: string): Promise<UserType | null> => {
  const user = await db.collection("users").doc(id).get();
  return mapDocument<UserType>(user);
};


/**
 * Create a new user in the database.
 * Hashes the password before saving.
 * @param {Omit<UserType, "id">} user - User data excluding ID
 * @returns {Promise<UserType>} - The newly created user
 * @throws {Error} - If creation fails
 */
export const createUser = async (user: Omit<UserType, "id">): Promise<UserType> => {
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

/**
 * Update an existing user.
 * Hashes new password if provided.
 * @param {string} id - User ID
 * @param {Partial<UserType>} updates - Partial updates to apply
 * @returns {Promise<UserType | null>} - The updated user or null if not found
 */
export const updateUser = async (id: string, updates: Partial<UserType>): Promise<UserType | null> => {
  const userRef = db.collection("users").doc(id);

  // hash new password if provided
  if (updates.password) {
    updates.password = await authUtil.hashPassword(updates.password);
  }

  // update database
  await userRef.update(updates);

  // return the updated details
  const user = await userRef.get();
  const updatedUser = mapDocument<UserType>(user);
  return updatedUser;
};
