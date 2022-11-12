import * as bcrypt from 'bcrypt'

export const bcryptHash = async (
  stringHash: string,
  hashLength: number = 10
): Promise<string> => {
  return await bcrypt.hash(stringHash, hashLength)
}

export const compareHashString = async (
  compareString: string,
  stringHash: string
) => await bcrypt.compare(compareString, stringHash)
