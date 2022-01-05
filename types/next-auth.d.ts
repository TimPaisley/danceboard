import NextAuth from 'next-auth'

declare module 'next-auth' {
  interface Session {
    token: {
      name: string
      email: string
      picture: string
      accessToken: string
      iat: number
      exp: number
      jti: string
    }
  }
}
