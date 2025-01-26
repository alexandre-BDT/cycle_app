const clapResolvers = {
  Query: {
    claps: async (_parent: any, _args: any, context: any) => {
      return context.prisma.clap.findMany({
        include: {
          todo: {
            include: {
              clap: true
            }
          },
        }
      });
    },
  },
  Mutation: {
    clapTodo: async (_parents: any, { todoId, userId }: { todoId: string, userId: string }, context: any) => {
      try {
        const todoOwner = await context.prisma.todo.findUnique({
          where: {
            id: parseInt(todoId),
          },
          select: {
            userId: true,
          },
        })

        if (todoOwner.userId === parseInt(userId)) {
          throw new Error("You can't clap your own todo");
        }

        const clap = await context.prisma.clap.create({
          data: {
            todoId: parseInt(todoId),
            userId: parseInt(userId),
          },
        });

        return clap;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
    unclap: async (_parent: any, { todoId, userId }: { todoId: string, userId: string }, context: any) => {
      try {
        const clap = await context.prisma.clap.findUnique({
          where: {
            todoId_userId: {
              todoId: parseInt(todoId),
              userId: parseInt(userId),
            },
          },
        });

        if (!clap) {
          throw new Error("Clap not found");
        }

        await context.prisma.clap.delete({
          where: {
            todoId_userId: {
              todoId: parseInt(todoId),
              userId: parseInt(userId),
            },
          },
        });

        return clap;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
};

export default clapResolvers;