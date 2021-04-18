import React, {Fragment} from 'react';

interface AuthGuardProps {
  children?: any,
  roles?: [],
}

const AuthGuard: React.FunctionComponent<AuthGuardProps> = (props: AuthGuardProps) => {
  const {children} = props;

  return <Fragment>{children}</Fragment>;
};

export default AuthGuard;
