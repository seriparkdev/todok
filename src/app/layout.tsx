import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: '토독이',
  description: '토독이는 초성을 맞춰 문장을 완성하는 게임입니다.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
