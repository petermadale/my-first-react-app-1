import React, { lazy, Suspense } from "react";

const LazyDashboard = lazy(() => import("./Dashboard"));

const renderLoader = () => <p>Loading</p>;
const Dashboard = (props) => (
  <Suspense fallback={renderLoader}>
    <LazyDashboard {...props} />
  </Suspense>
);

export default Dashboard;
