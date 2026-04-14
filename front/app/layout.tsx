import { QueryClientProvider } from '@tanstack/react-query';
import './globals.css';
import { queryClient } from '@/lib/queryClient';
import { Toast } from '@/components/Toast';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <head>
        <link
          rel="stylesheet"
          as="style"
          crossOrigin="anonymous"
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.5/dist/web/variable/pretendardvariable.css"
        />
      </head>
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
          <Toast />
        </QueryClientProvider>
      </body>
    </html>
  );
}
