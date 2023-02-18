import React, { useEffect, useState } from "react";
import Layout from "./Layout";
import FormDetailJob from "../components/FormDetail";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const DetailJob = () => {
  const navigate = useNavigate();
  const { isError } = useSelector((state) => state.auth);
  const [session, setSession] = useState(window.sessionStorage.getItem("session"));

  useEffect(() => {
    // setSession(window.sessionStorage.getItem("session"));
    if (!session) {
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
