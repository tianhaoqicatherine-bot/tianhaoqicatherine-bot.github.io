import type { Metadata } from 'next';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  description: '产品经理 | 浙江大学 | 多份产品经理实习 | AI builder',
};

export default function HomePage() {
  redirect('/about/');
}
