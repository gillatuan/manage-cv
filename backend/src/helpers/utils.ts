const bcrypt = require('bcrypt');

const saltRounds = 10;

export const setHashPassword = async (plainPassword: string) => {
  try {
    return await bcrypt.hash(plainPassword, saltRounds);
  } catch (error) {
    console.log(`Error`, error);
  }
};

export const compare2Password = async (plainPassword: string, hashPassword: string) => {
  try {
    return await bcrypt.compare(plainPassword, hashPassword);
  } catch (error) {
    console.log(`Error`, error);
  }
};