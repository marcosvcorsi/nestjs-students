import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashProvider {
  async generate(value: string, rounds = 10): Promise<string> {
    return bcrypt.hash(value, rounds);
  }

  async compare(value: string, hash: string): Promise<boolean> {
    return bcrypt.compare(value, hash);
  }
}
