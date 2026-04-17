'use client';

import { Button } from '@/components/Button';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { homeQueryOptions } from './queries/auth';
import { useToastStore } from '@/components/Toast/toastStore';
import { PATHS } from '@/constants/paths';

export default function HomePage() {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { showToast } = useToastStore();

  const { mutate: logout } = useMutation({
    ...homeQueryOptions.logout(),
    onSuccess: () => {
      queryClient.clear();
      router.replace(PATHS.LOGIN);
    },
    onError: () => {
      showToast({ message: '로그아웃 중 오류가 발생했습니다.', type: 'warning' });
    },
  });

  return <Button onClick={() => logout()}>로그아웃</Button>;
}
