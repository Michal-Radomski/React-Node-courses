import React from "react";

const LazyLoader = ({ show = false, delay = 0 }): JSX.Element => {
  const [showLoader, setShowLoader] = React.useState<boolean>(false);

  React.useEffect(() => {
    let timeout: number;

    if (!show) {
      setShowLoader(false);
      return;
    }
    if (delay === 0) {
      setShowLoader(true);
    } else {
      timeout = setTimeout(() => setShowLoader(true), delay);
    }
    return () => {
      clearInterval(timeout);
    };
  }, [show, delay]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return showLoader ? <h3>Loading...</h3> : (null as any);
};

export default LazyLoader;
