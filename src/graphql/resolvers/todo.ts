const todoResolvers = {
  Query: {
    todo: async (_parent: any, { id }: { id: string }, context: any) => {
      try {
        const todo = await context.prisma.todo.findUnique({
          where: {
            id: parseInt(id)
          },
          include: {
            clap: {
              include: {
                user: true
              }
            }
          },
        });

        if (!todo) {
          throw new Error("Todo not found");
        }
        Object.assign(todo, { totalClaps: todo.clap.length })
        Object.assign(todo, {
          clapCounts: [...new Set(todo.clap.map((clap: { userId: number; }) => clap.userId))].map(userId => ({
            userId,
            clapCount: todo.clap.filter((clap: { userId: unknown; }) => clap.userId === userId).length,
          }))
        });

        return todo;
      } catch (error) {
        console.error(error);
        throw error;
      }
    },
    todos: async (_parent: unknown, _args: Record<string, any>, context: any) => {
      try {
        let result = await context.prisma.todo.findMany({
          include: {
            clap: {
              include: {
                user: true
              }
            },
          }
        });
        const formatedResult = result?.map((todo: any) => {
          Object.assign(todo, { totalClaps: todo.clap.length })
          Object.assign(todo, {
            clapCounts: [...new Set(todo.clap.map((clap: { userId: number; }) => clap.userId))].map(userId => ({
              userId,
              clapCount: todo.clap.filter((clap: { userId: unknown; }) => clap.userId === userId).length,
            }))
          });
          return todo;
        });
        return formatedResult;
      } catch (error) {
        console.error(error);
        throw new Error("Todos not found");
      }
    },
  },
  Mutation: {
    createTodo: async (_parent: unknown, args: Record<string, any>, context: any) => {
      const { title, userId, description } = args;

      return context.prisma.todo.create({
        data: {
          title: title,
          description: description ?? "",
          User: {
            connect: {
              id: parseInt(userId),
            },
          },
        },
      });
    },
    deleteTodo: async (_parent: unknown, { id }: { id: string }, context: any) => {
      try {
        return context.prisma.todo.delete({
          where: {
            id: parseInt(id),
          },
        });
      } catch (error) {
        console.error(error);
        throw new Error("Todo not found");
      }
    },
  },
};

export default todoResolvers;