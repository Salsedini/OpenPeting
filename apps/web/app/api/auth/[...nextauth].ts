import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import * as jose from 'jose';

async function encode({ secret, token, maxAge }) {
  const decoder = new TextEncoder();

  const jwt = await new jose.SignJWT(token as jose.JWTPayload)
    .setProtectedHeader({ alg: 'HS512' })
    .setExpirationTime(`${maxAge}s`)
    .sign(decoder.encode(secret as string));

  return jwt;
}

export const authOptions: NextAuthOptions = {
  useSecureCookies: false,
  jwt: {
    encode: async ({ secret, token, maxAge }) => {
      const decoder = new TextEncoder();

      const jwt = await new jose.SignJWT(token as jose.JWTPayload)
        .setProtectedHeader({ alg: 'HS512' })
        .setExpirationTime(`${maxAge}s`)
        .sign(decoder.encode(secret as string));

      return jwt;
    },
    decode: async ({ secret, token }) => {
      if (!token) {
        return null;
      }

      const secretKey = new TextEncoder().encode(secret as string); // Ensure secret is in Uint8Array format

      const { payload } = await jose.jwtVerify(token, secretKey, {
        algorithms: ['HS256', 'HS512'],
      });

      return payload;
    },
  },

  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // Here you call your backend API or database to check the credentials

        const res = await fetch('http://api:3333/api/login', {
          method: 'POST',
          body: JSON.stringify(credentials),
          headers: { 'Content-Type': 'application/json' },
        });
        const user = await res.json();

        // If no error and we have user data, return it
        if (res.ok && user) {
          return user;
        }
        // Return null if user data could not be retrieved
        return null;
      },
    }),
  ],
  pages: {
    signIn: '/Login',
  },
  callbacks: {
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token and user id from a provider.
      const maxAge = 30 * 24 * 60 * 60;
      const secret = process.env.JWT_SECRET || 'changeme';

      session.accessToken = await encode({ secret, token, maxAge });

      return session;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
};
