// types/next.d.ts
import 'next';

declare module 'next' {
  type PageProps<T = unknown, P = unknown> = {
    params: T;
    searchParams?: P;
  };
}