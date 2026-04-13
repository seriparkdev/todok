import { styled } from '@styled/jsx';
import KakaoIcon from '@/assets/logo/kakao.png';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <Main>
      <HeadingSection>
        <Title>토독</Title>
        <Description>초성을 맞춰 문장을 완성하는 게임</Description>
      </HeadingSection>

      <KakaoButton>
        <KakaoIconWrapper>
          <Image src={KakaoIcon} alt="kakao logo" width={20} height={20} />
        </KakaoIconWrapper>
        카카오로 시작하기
      </KakaoButton>
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

const KakaoButton = styled('button', {
  base: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FEE500',
    borderRadius: 'full',
    px: '5',
    py: '3.5',
    width: '20rem',
    fontSize: 'md',
    fontWeight: '600',
    cursor: 'pointer',
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
