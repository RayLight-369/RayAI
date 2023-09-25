import { exists, getData, insertData } from "@/app/Supabase/Supabase";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({

  providers: [

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    })

  ],
  callbacks: {

    async session ({ session, user, token }) {

      const sessionUser = await getData({
        table: "users",
        where: {
          email: session.user.email
        }

      }).then(users => users.data[0]);

      session.user.id = sessionUser.id;

      return session;

    },
    async signIn ({ profile }) {

      try {

        const userExist = await exists({
          table: "users",
          where: {
            email: profile.email
          },
          columns: "email"
        });

        if (!userExist) {

          const currentDate = new Date();

          await insertData({
            table: "users",
            object: {
              email: profile.email,
              name: profile.name.toLowerCase(),
              image: profile.picture,
              created_at: `${currentDate.getDate()}-${currentDate.toLocaleString('default', { month: 'long' }).substring(0, 3)} ${currentDate.getFullYear()}`
            }
          });

        }

        return true;

      } catch (e) {

        console.log(e);
        return false;

      }

    }
  }
});

export { handler as GET, handler as POST };