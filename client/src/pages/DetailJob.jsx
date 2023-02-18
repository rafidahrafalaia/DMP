import React, { useEffect } from "react";
import Layout from "./Layout";
import FormDetailJob from "../components/FormDetail";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DetailJob = () => {
  const navigate = useNavigate();
  const { isError, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isError || !user?.accessToken) {
      navigate("/");
    }
  }, [isError, navigate]);
  return (
    <Layout>
      <FormDetailJob />
    </Layout>
  );
};

export default DetailJob;
