import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

interface KakaoUserInfo {
  kakaoId: string;
  nickname?: string;
  profileImage?: string;
  email?: string;
}

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async findByKakaoId(kakaoId: string) {
    return this.prisma.user.findUnique({ where: { kakaoId } });
  }

  async upsertKakaoUser(info: KakaoUserInfo) {
    return this.prisma.user.upsert({
      where: { kakaoId: info.kakaoId },
      update: {
        nickname: info.nickname,
        profileImage: info.profileImage,
        email: info.email,
      },
      create: {
        kakaoId: info.kakaoId,
        nickname: info.nickname,
        profileImage: info.profileImage,
        email: info.email,
      },
    });
  }
}
