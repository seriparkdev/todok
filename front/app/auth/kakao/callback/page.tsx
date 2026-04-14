import { styled } from '@styled/jsx';
import { Spinner } from '@/components/Spinner';

export default function KakaoCallbackPage() {
  return (
    <Main>
      <Spinner size="lg" />
      <Message>로그인 처리 중...</Message>
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
    gap: '4',
  },
});

const Message = styled('p', {
  base: {
    color: 'gray.500',
    fontSize: 'sm',
  },
});
