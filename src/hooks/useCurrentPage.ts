import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const useCurrentPage = () => {
  const location = useLocation();
  const [isAuthPage, setIsAuthPage] = useState(false);

  useEffect(() => {
    setIsAuthPage(location.pathname.includes('registration'));
  }, [location.pathname]);

  return isAuthPage;
};

export default useCurrentPage;
