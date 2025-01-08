import bcrypt from 'bcryptjs';

class HashService {
  async hashPassword(password: string) {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
  }
  async comparePassword(password: string, hash: string) {
    return await bcrypt.compare(password, hash);
  }
}

export const hashService = new HashService();
