import NextAuth, { AuthOptions, SessionStrategy } from "next-auth"
import { authOptions } from '../[...nextauth]';

const handler = NextAuth({
  ...authOptions,
  session: {
    strategy: "jwt" as SessionStrategy,
  },
})

export { handler as GET, handler as POST }