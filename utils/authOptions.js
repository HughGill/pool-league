import fs from "fs";
import path from "path";
import bcrypt from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

const getUsers = () => {
  const filePath = path.join(process.cwd(), "data", "application_users.json");
  const fileData = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(fileData).users || [];
};

export const authOptions = {
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        const { email, password } = credentials;

        const users = getUsers();
        const user = users.find((u) => u.email === email);

        if (!user) {
          console.log("User not found:", email);
          return null;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
          console.log("Incorrect password for:", email);
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          firstname: user["given-name"],
          lastname: user["surname"],
          fullname: user["full-name"],
          isAdmin: user.isAdmin,
          isMod: user.isMod,
          isUser: user.isUser,
          isBlocked: user.isBlocked,
        };
      },
    }),
  ],
  debug: true,
  session: {
    strategy: "jwt",
    maxAge: 1 * 24 * 60 * 60,
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl; // Customize if needed
    },

    async signIn({ user }) {
      const users = getUsers();
      const foundUser = users.find((u) => u.email === user.email);
      if (!foundUser) return false;

      // You could add additional checks here like isBlocked, isVerified, etc.
      if (foundUser.isBlocked) return false;

      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.firstname = user.firstname;
        token.lastname = user.lastname;
        token.fullname = user.fullname;
        token.isAdmin = user.isAdmin;
        token.isMod = user.isMod;
        token.isUser = user.isUser;
        token.isBlocked = user.isBlocked;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.firstname = token.firstname;
        session.user.lastname = token.lastname;
        session.user.fullname = token.fullname;
        session.user.isAdmin = token.isAdmin;
        session.user.isMod = token.isMod;
        session.user.isUser = token.isUser;
        session.user.isBlocked = token.isBlocked;
      }
      return session;
    },
  },
};

export default authOptions;
