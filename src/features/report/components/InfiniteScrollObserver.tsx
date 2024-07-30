/* eslint-disable @typescript-eslint/no-explicit-any */
import { Loader } from "@mantine/core";
import React, { useEffect, useRef } from "react";

interface PropsType {
  children: React.ReactNode;
  onFetch: () => void;
  isLoading: boolean;
  onLoad: () => void;
}

const InfiniteScrollObserver: React.FC<PropsType> = ({
  children,
  onFetch,
  isLoading,
  onLoad,
}) => {
  const observerRef = useRef<any>(null);

  const handleObserver = (entries: any[]) => {
    const target = entries[0];

    if (target.isIntersecting && !isLoading) {
      onLoad();
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
      {isLoading && (
        <div className="w-full flex justify-center mb-4 mt-4">
          <Loader size="md" />
        </div>
      )}
      <div id="scrollObserver" />
    </>
  );
};

export default InfiniteScrollObserver;
