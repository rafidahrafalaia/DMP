import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import JobList from "../components/JobList";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Jobs = () => {
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [session, setSession] = useState(window.sessionStorage.getItem("session"));

  useEffect(() => {
    if (!session) {
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
