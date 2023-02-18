import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const FormDetailJob = () => {
  const [title, setTitle] = useState("");
  const [company, setCompany] = useState("");
  const [companyurl, setCompanyurl] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [msg, setMsg] = useState("");
  const { id } = useParams();
  const { user } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const getJobById = async () => {
      try {
        const response = await axios.get(
          `http://localhost:9090/api/job/${id}`,
          {
            headers: {
            'authorization': `Bearer ${user?.accessToken}`
          }
        }
        );
        setTitle(response.data.data.title);
        setCompany(response.data.data.company);
        setCompanyurl(response.data.data.company_url);
        setDescription(response.data.data.description);
        setLocation(response.data.data.location);
      } catch (error) {
        if (error.response) {
          setMsg(error.response.data.message);
        }
      }
    };
    getJobById();
  }, [id]);

  return (
    <div>
      <h1 className="title">Detail Job</h1>
      <div className="card is-shadowless">
        <div className="card-content">
          <div className="content">
            <p className="has-text-centered">{msg}</p>
            <form>
              <div className="field">
                <label className="label">Title</label>
                <p className="has-text">{title}</p>
                <label className="label">Company</label>
                <p className="has-text">{company}</p>
                <label className="label">Location </label>
                <p className="has-text">{location}</p>
                <label className="label">Company URL</label>
                <a href={companyurl} target="_blank">{companyurl}</a>
                <label className="label" >Description </label>
               <div dangerouslySetInnerHTML={{__html: description}} />
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormDetailJob;
