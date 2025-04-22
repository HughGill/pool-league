"use client";
import BarLoader from "react-spinners/BarLoader";

const override = {
  display: "block",
  margin: "100px auto",
};
const LoadingPage = ({ loading }) => {
  return (
    <BarLoader
      color="#3b82f6"
      loading={loading}
      cssOverride={override}
      height={16}
      aria-label="Loading Spinner"
      data-testid="loader"
    />
  );
};

export default LoadingPage;
