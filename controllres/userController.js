const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const createNewUser = async (req, res) => {
  try {
    const newUser = await prisma.user.create({
      data: {
        name: "Rich mqn",
        email: "hello2@prisma.com",
        posts: {
          create: {
            title: "My second post",
            body: "Lots of really interesting stuff",
            slug: "my-second-post",
          },
        },
      },
    });

    // Respond with the newly created user
    return res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = {
  createNewUser,
};
