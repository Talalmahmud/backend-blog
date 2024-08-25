const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const createNewUser = async (req, res) => {
  const { email, password, name } = req.body;

  // Check if the user already exists
  const existUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (existUser) {
    // Return with 409 Conflict if user already exists
    return res.status(409).json({ error: "User already registered." });
  }

  try {
    // Hash the password and create the new user
    const hashPassword = await bcrypt.hash(password, 10);
    const bodyData = {
      name: name,
      email: email,
      password: hashPassword,
    };

    const newUser = await prisma.user.create({ data: bodyData });

    // Respond with the newly created user
    return res.json(newUser);
  } catch (error) {
    // Catch any error during user creation and respond with a 500 status code
    console.error(error);
    return res.status(500).json({ error: "Failed to create user" });
  }
};

const getUser = async (req, res) => {
  const params = req.params;
  console.log(params);
  try {
    const allUser = await prisma.user.findMany({
      select: {
        name: true,
        email: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Respond with the newly created user
    return res.json(allUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

const deleteUser = async (req, res) => {
  const params = req.params;
  console.log(params);
  try {
    const allUser = await prisma.user.delete({ where: { id: params.id } });

    // Respond with the newly created user
    return res.json(allUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create user" });
  }
};

const updateUser = async (req, res) => {
  const params = req.params;
  const name = req.query.name;
  const email = req.query.email;

  try {
    const allUser = await prisma.user.update({
      where: { id: params?.id },
      data: {
        name: name,
        email: email,
      },
    });

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
  deleteUser,
  updateUser,
};
