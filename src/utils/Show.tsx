import { Children, PropsWithChildren, ReactNode, isValidElement } from 'react';

interface WhenProps extends PropsWithChildren {
  condition: boolean;
}

function Show({ children }: PropsWithChildren) {
  let when: ReactNode = null;
  let otherwise: ReactNode = null;

  Children.forEach<ReactNode>(children, (child) => {
    if (!isValidElement(child)) return;
    if (child.props.condition === undefined) { otherwise = child; }
    else if (!when && child.props.condition === true) { when = child; }
  });

  return when || otherwise;
}

Show.When = ({ condition, children }: WhenProps) => condition && children;
Show.Else = ({ children }: PropsWithChildren) => children;
export default Show;
