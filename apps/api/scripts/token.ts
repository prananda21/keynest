import crypto from "node:crypto";

// Generate a 256-bit (32-byte) hex key
const key = crypto.randomBytes(32).toString("hex");
console.log(`ENCRYPTION_KEY='${key}'`);
