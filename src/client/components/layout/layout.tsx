import { FC, PropsWithChildren } from 'react';
import { layout } from './styles';

export const Layout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={layout}>{children}</div>;
};
