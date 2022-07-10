import React, { lazy, Suspense, useState } from "react";
import "./lazyLoading.css";
interface propText {
  text?: string,
  isLoading? : boolean
}
export const Spinner = ({ text,isLoading }: propText) => {
  const [isUpdate, setIsUpdate] = useState(false || isLoading);
  setTimeout(() => setIsUpdate(true), 10000);
  return (
    <div>
      <div className="SpinnerOverlay">
        {!isUpdate ? (
          <div className="SpinnerContainer"></div>
        ) : (
          <p style={{ color: "red", fontSize: "20px" }}>{text}</p>
        )}
      </div>
    </div>
  );
};

type ImportFunc = () => Promise<{
  default: React.ComponentType<any>;
}>;

const lazyLoading = (importFunc: ImportFunc) => {
  const LazyComponent = lazy(importFunc);
  return (props: React.ComponentProps<typeof LazyComponent>) => (
    <Suspense fallback={<Spinner />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default lazyLoading;
