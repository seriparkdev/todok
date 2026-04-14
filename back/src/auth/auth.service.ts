import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import axios from 'axios';
import { UserService } from '../user/user.service';

interface KakaoTokenResponse {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
}

interface KakaoUserResponse {
  id: number;
  kakao_account?: {
    email?: string;
    profile?: {
      nickname?: string;
      profile_image_url?: string;
    };
  };
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async kakaoLogin(code: string) {
    const kakaoToken = await this.getKakaoToken(code);
    const kakaoUser = await this.getKakaoUser(kakaoToken.access_token);

    const user = await this.userService.upsertKakaoUser({
      kakaoId: String(kakaoUser.id),
      nickname: kakaoUser.kakao_account?.profile?.nickname,
      profileImage: kakaoUser.kakao_account?.profile?.profile_image_url,
      email: kakaoUser.kakao_account?.email,
    });

    const payload = { sub: user.id, kakaoId: user.kakaoId };

    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
      refreshToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
      user: {
        id: user.id,
        nickname: user.nickname,
        profileImage: user.profileImage,
      },
    };
  }

  refreshAccessToken(userId: number, kakaoId: string) {
    const payload = { sub: userId, kakaoId };
    return {
      accessToken: this.jwtService.sign(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '15m',
      }),
    };
  }

  private async getKakaoToken(code: string): Promise<KakaoTokenResponse> {
    const params = new URLSearchParams({
      grant_type: 'authorization_code',
      client_id: process.env.KAKAO_REST_API_KEY,
      client_secret: process.env.KAKAO_CLIENT_SECRET,
      redirect_uri: process.env.KAKAO_REDIRECT_URI,
      code,
    });

    console.log('[Kakao] REST_API_KEY:', process.env.KAKAO_REST_API_KEY);
    console.log('[Kakao] REDIRECT_URI:', process.env.KAKAO_REDIRECT_URI);
    console.log('[Kakao] code:', code);

    try {
      const { data } = await axios.post<KakaoTokenResponse>(
        'https://kauth.kakao.com/oauth/token',
        params.toString(),
        { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } },
      );
      return data;
    } catch (e) {
      console.error('[Kakao] 토큰 교환 실패:', e.response?.data);
      throw e;
    }
  }

  private async getKakaoUser(accessToken: string): Promise<KakaoUserResponse> {
    const { data } = await axios.get<KakaoUserResponse>(
      'https://kapi.kakao.com/v2/user/me',
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    return data;
  }
}
