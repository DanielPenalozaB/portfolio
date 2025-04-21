/* eslint-disable @typescript-eslint/no-explicit-any */

import 'next/types';

declare module 'next' {
  interface PageProps {
    params: any;
  }
}