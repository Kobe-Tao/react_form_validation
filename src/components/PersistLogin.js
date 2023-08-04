import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import useAuth from "../hooks/useAuth";

const PersistLogin = () => {
  const [loading, setIsLoading] = useState(true);
  const refresh = useRefreshToken();
  const { auth, persist } = useAuth();
  useEffect(() => {
    let isMounted = true;
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.err(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };
    !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
    return () => (isMounted = false);
  }, []);
  useEffect(() => {
    console.log(`isLoading:${loading}`);
    console.log(`at:${JSON.stringify(auth?.accessToken)}`);
  }, [loading]);

  return <>{!persist ? <Outlet /> : loading ? <p>Loading</p> : <Outlet />}</>;
};

export default PersistLogin;
