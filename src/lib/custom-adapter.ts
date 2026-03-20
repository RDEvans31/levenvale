import { randomUUID } from 'crypto';
import type { Adapter } from 'next-auth/adapters';
import { Pool } from 'pg';

export function CustomPrismaAdapter(pool: Pool): Adapter {
  return {
    async createUser(data) {
      // Ensure email is not null
      if (!data.email) {
        throw new Error('Email is required for user creation');
      }

      // Map NextAuth.js fields to your Prisma schema fields
      const result = await pool.query(
        'INSERT INTO "User" (id, name, email, "emailVerified", image, "updatedAt") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
        [
          data.id || randomUUID(),
          data.name || null,
          data.email,
          data.emailVerified || null,
          data.image || null,
          new Date(),
        ]
      );

      return result.rows[0];
    },

    async getUser(id) {
      const result = await pool.query('SELECT * FROM "User" WHERE id = $1', [
        id,
      ]);
      return result.rows[0] || null;
    },

    async getUserByEmail(email) {
      const result = await pool.query('SELECT * FROM "User" WHERE email = $1', [
        email,
      ]);
      return result.rows[0] || null;
    },

    async getUserByAccount() {
      return null;
    },

    async updateUser(data) {
      const result = await pool.query(
        'UPDATE "User" SET "emailVerified" = $2, "updatedAt" = $3 WHERE id = $1 RETURNING *',
        [data.id, data.emailVerified || new Date(), new Date()]
      );
      return result.rows[0];
    },

    async deleteUser() {
      return null;
    },

    async linkAccount() {
      return undefined;
    },

    async unlinkAccount() {
      return undefined;
    },

    async createSession() {
      return { sessionToken: '', userId: '', expires: new Date() };
    },

    async getSessionAndUser() {
      return null;
    },

    async updateSession() {
      return null;
    },

    async deleteSession() {
      return null;
    },

    async createVerificationToken(data) {
      const result = await pool.query(
        'INSERT INTO "VerificationToken" (identifier, token, expires) VALUES ($1, $2, $3) RETURNING *',
        [data.identifier, data.token, data.expires]
      );
      return result.rows[0];
    },

    async useVerificationToken({ identifier, token }) {
      const result = await pool.query(
        'DELETE FROM "VerificationToken" WHERE identifier = $1 AND token = $2 RETURNING *',
        [identifier, token]
      );
      return result.rows[0] || null;
    },
  };
}
