import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    token: {
      email: string
    }
  }
}
