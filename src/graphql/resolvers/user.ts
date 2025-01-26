const userResolvers = {
  Query: {
    users: async (_parent: any, _args: Record<string, any>, context: any) => {
      return context.prisma.user.findMany({
        include: {
          todo: {
            include: {
              clap: {
                include: {
                  user: true
                }
              }
            }
          },
        },
      });
    },
    user: async (_parent: any, { id }: { id: string }, context: any) => {
      try {
        const user = context.prisma.user.findUnique({
          where: {
            id: parseInt(id),
          },
        });

        if (!user) {
          throw new Error("User not found");
        }

        return user;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
  Mutation: {
    createUser: async (_parent: any, { username }: { username: string }, context: any) => {
      try {
        return context.prisma.user.create({
          data: {
            username: username,
          },
        });
      } catch (error) {
        console.error(error);
        throw new Error("User creation failed");
      }
    },
    deleteUser: async (_parent: any, { id }: { id: string }, context: any) => {
      try {
        return context.prisma.user.delete({
          where: {
            id: parseInt(id),
          },
        });
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
  },
};

export default userResolvers;