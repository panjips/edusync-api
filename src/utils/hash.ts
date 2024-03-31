import bcrypt from "bcrypt";

async function hash(params: string) {
  const hash = await bcrypt.hash(params, 10);
  return hash;
}

async function unhash(params: string, hash: string) {
  const compare = await bcrypt.compare(params, hash);
  return compare;
}

export default {
  hash,
  unhash,
};
