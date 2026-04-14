'use client';

import { styled } from '@styled/jsx';
import { Spinner } from '@/components/Spinner';
import { useRouter, useSearchParams } from 'next/navigation';
import { useToastStore } from '@/components/Toast/toastStore';
import { useEffect } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { authQueryOptions } from './queries/queries';
import { PATHS } from '@/constants/paths';

export default function KakaoCallbackPage() {
  const searchParams = useSearchParams();
  const { showToast } = useToastStore();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: kakaoLogin } = useMutation({
    ...authQueryOptions.kakaoLogin(),
    onSuccess: ({ user }) => {
      queryClient.setQueryData(authQueryOptions.me().queryKey, user);
      router.replace(PATHS.HOME);
    },
  });

  useEffect(() => {
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error || !code) {
      showToast({ message: '카카오 로그인에 실패했습니다.', type: 'warning' });
      router.replace(PATHS.LOGIN);
      return;
    }

    kakaoLogin(code, {
      onError: () => {
        showToast({ message: '로그인 중 오류가 발생했습니다.', type: 'warning' });
        router.replace(PATHS.LOGIN);
      },
    });
  }, []);

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
