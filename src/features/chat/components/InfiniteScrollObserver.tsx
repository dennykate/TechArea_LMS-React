/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader } from "@mantine/core";
import React, { useEffect, useRef } from "react";

interface PropsType {
  children: React.ReactNode;
  onFetch: () => void;
  isLoading: boolean;
}

const InfiniteScrollObserver: React.FC<PropsType> = ({
  children,
  onFetch,
  isLoading,
}) => {
  const observerRef = useRef<any>(null);

  const handleObserver = (entries: any[]) => {
    const target = entries[0];

    if (target.isIntersecting && !isLoading) {
      onFetch();
    }
  };

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver(handleObserver, options);
    observerRef.current.observe(document.querySelector("#scrollObserver"));

    return () => {
      observerRef.current.disconnect();
    };
  }, [isLoading, onFetch]);

  return (
    <>
      {children}
      <div id="scrollObserver" className="w-full flex justify-center ">
        {isLoading && <Loader size="md" />}
      </div>
    </>
  );
};

export default InfiniteScrollObserver;
