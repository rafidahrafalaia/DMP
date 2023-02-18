import React, { useEffect } from "react";
import Layout from "./Layout";
import JobList from "../components/JobList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError || !user?.accessToken) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <JobList />
    </Layout>
  );
};

export default Jobs;
