import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AuthDto } from './dto/auth.dto';
import { compareHash, hashData } from '../utils/hashData';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService) {}

  async register(user: AuthDto) {
    const hashedPassword = await hashData(user.password);
    const checkUser = await this.db.user.findFirst({
      where: { username: user.username },
    });

    if (checkUser) {
      throw new HttpException(
        'User with this username already exists',
        HttpStatus.PRECONDITION_FAILED,
      );
    }
    return await this.db.user.create({
      data: { ...user, password: hashedPassword },
    });
  }

  async login(user: AuthDto) {
    const dbUser = await this.db.user.findFirst({
      where: { username: user.username },
    });

    if (!dbUser) {
      throw new HttpException(
        'User with this credentials doesnt exist.',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    const validPassword = compareHash(user.password, dbUser.password);

    if (!validPassword) {
      throw new HttpException(
        'User with this credentials doesnt exist.',
        HttpStatus.PRECONDITION_FAILED,
      );
    }

    return {
      id: dbUser.id,
      username: dbUser.username,
    };
  }
}
