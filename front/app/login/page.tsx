'use client';

import { styled } from '@styled/jsx';
import { css } from '@styled/css';
import { Button } from '@/components/Button';
import KakaoIcon from '@/assets/logo/kakao.png';
import Image from 'next/image';

const getKakaoAuthUrl = () => {
  const params = new URLSearchParams({
    client_id: process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY!,
    redirect_uri: process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI!,
    response_type: 'code',
  });

  const AUTHORIZE_URL = 'https://kauth.kakao.com/oauth/authorize?';

  return `${AUTHORIZE_URL}${params.toString()}`;
};

export default function LoginPage() {
  const handleKakaoLogin = () => {
    window.location.href = getKakaoAuthUrl();
  };

  return (
    <Main>
      <HeadingSection>
        <Title>토독</Title>
        <Description>초성을 맞춰 문장을 완성하는 게임</Description>
      </HeadingSection>

      <Button
        onClick={handleKakaoLogin}
        size="lg"
        className={css({
          position: 'relative',
          backgroundColor: '#FEE500',
          borderRadius: 'full',
          width: '20rem',
          color: 'black',
        })}
      >
        <KakaoIconWrapper>
          <Image src={KakaoIcon} alt="kakao logo" width={20} height={20} />
        </KakaoIconWrapper>
        카카오로 시작하기
      </Button>
    </Main>
  );
}

const Main = styled('main', {
  base: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    gap: '8',
  },
});

const HeadingSection = styled('div', {
  base: {
    textAlign: 'center',
  },
});

const Title = styled('h1', {
  base: {
    fontSize: '2xl',
    fontWeight: 'bold',
    mb: '2',
  },
});

const Description = styled('p', {
  base: {
    color: 'gray.500',
    fontSize: 'sm',
  },
});

const KakaoIconWrapper = styled('div', {
  base: {
    position: 'absolute',
    left: '5',
    display: 'flex',
    alignItems: 'center',
  },
});
