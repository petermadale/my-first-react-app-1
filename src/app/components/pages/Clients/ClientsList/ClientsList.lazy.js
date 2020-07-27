import React, { lazy, Suspense } from "react";

const LazyClientList = lazy(() => import("./ClientList"));

const renderLoader = () => <p>Loading</p>;

const ClientList = (props) => (
  <Suspense fallback={renderLoader}>
    <LazyClientList {...props} />
  </Suspense>
);

export default ClientList;
