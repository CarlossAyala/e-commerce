import _bcrypt from "bcrypt";
import envs from "../config/environments.js";

const { saltRounds } = envs;

const hash = (plain) => {
  return _bcrypt.hash(plain, saltRounds);
};

const compare = (plain, encrypted) => {
  return _bcrypt.compare(plain, encrypted);
};

export const bcrypt = { hash, compare };
