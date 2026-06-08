import { ARGON2ID_MEMORY_COST_KIB, ARGON2ID_TIME_COST } from "@/constants";

/**
 * Hashes a plaintext password with Bun's Argon2id implementation.
 *
 * The returned PHC string includes the algorithm, salt, hash, and configured
 * cost parameters, so it can be stored directly in `users.passwordHash`.
 */
export const hashPassword = async (password: string): Promise<string> => {
  return await Bun.password.hash(password, {
    algorithm: "argon2id",
    memoryCost: ARGON2ID_MEMORY_COST_KIB,
    timeCost: ARGON2ID_TIME_COST,
  });
};

/**
 * Verifies a plaintext password against a stored Argon2id PHC hash.
 *
 * Use this when authenticating a user from `users.passwordHash`; never compare
 * password hashes manually.
 */
export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await Bun.password.verify(password, hash, "argon2id");
};
