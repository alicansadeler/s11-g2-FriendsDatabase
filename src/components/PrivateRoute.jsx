import { Route, Redirect } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function PrivateRoute({ children, ...rest }) {
  const { isUserLoggedIn } = useAuth();

  return (
    <Route
      {...rest}
      render={({ location }) =>
        isUserLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location },
            }}
          />
        )
      }
    />
  );
}
