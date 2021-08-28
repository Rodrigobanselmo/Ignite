import { compare, hash } from 'bcryptjs';
import { IHashProvider } from '../models/IHashProvider';

class BCryptProvider implements IHashProvider {
  async createHash(password: string): Promise<string> {
    const passwordHash = await hash(password, 8);
    return passwordHash;
  }
  async compare(password: string, hash_password: string): Promise<boolean> {
    return compare(password, hash_password);
  }
}

export { BCryptProvider };
