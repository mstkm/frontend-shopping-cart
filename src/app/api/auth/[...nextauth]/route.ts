import authServices from "@/services/authServices";
import CredentialsProvider from "next-auth/providers/credentials";
import { IToken, IUser } from "@/types/Types";
import NextAuth, { NextAuthOptions, Session } from "next-auth";

const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt",
        maxAge: 60 * 30,
    },
    secret: process.env.NEXTAUTH_SECRET,
    providers: [
        CredentialsProvider({
            id: "Credentials",
            name: "Credentials",
            credentials: {
                Email: { label: "Email", type: "email" },
                Password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials) {
                    throw new Error("Credentials are required");
                }

                const { Email, Password } = credentials;

                const res = await authServices.login({ Email, Password });
                const accessToken = res.data.token;
                const dataUser = await authServices.getUser(accessToken);
                const { data: user } = dataUser.data;

                if (user) {
                    user.accessToken = accessToken;
                    return user;
                } else {
                    return null;
                }
            },
        }),
    ],
    callbacks: {
        async jwt({ token, user }: {
            token: IToken;
            user: IUser;
        }) {
            if (user) {
                token.user = user;
            }

            return token;
        },
        async session({ session, token }: {
            session: Session;
            token: IToken;
        }) {
            if (token) {
                session.user = token.user;
            }

            return session;
        },
    },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
