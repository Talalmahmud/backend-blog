const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createNewUser = async (req, res) => {
  const { email } = req.body;

  const existUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!existUser) {
    try {
      const newUser = await prisma.user.create({ data: req.body });

      // Respond with the newly created user
      return res.json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Failed to create user" });
    }
  } else {
    res.status(500).json({ error: "User already registered." });
  }
};

const getUser = async (req, res) => {
  const params = req.params;
  console.log(params);
  try {
    const allUser = await prisma.user.findMany({});

    // Respond with the newly created user
    return res.json(allUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

module.exports = {
  createNewUser,
  getUser,
};
