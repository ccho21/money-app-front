import { JSX } from 'react';

export default function Heading({
  children,
  level = 3,
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4;
}) {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag className='font-heading text-heading leading-snug'>{children}</Tag>
  );
}
