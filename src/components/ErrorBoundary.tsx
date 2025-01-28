import React, { useLayoutEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

const ErrorBoundary = ({ children }: Props) => {
  const [hasError, setHasError] = useState(false);

  useLayoutEffect(() => {
    const handleUncaughtError = (event: ErrorEvent) => {
      console.error("Uncaught error:", event.error);
      setHasError(true);
    };

    window.addEventListener("error", handleUncaughtError);

    return () => {
      window.removeEventListener("error", handleUncaughtError);
    };
  }, []);

  if (hasError) {
    return <h1>Something went wrong.</h1>;
  }

  return children;
};

export { ErrorBoundary };
