import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
  const [isChecked, setIsChecked] = useState(false);
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [session, setSession] = useState(window.sessionStorage.getItem("session"));

  useEffect(() => {
    getJobs();
  }, []);

  const handleOnChange = () => {
    setIsChecked(!isChecked);
  };

  const NextPage = async (e) => {
    setPage(page+1);
    e.preventDefault(); 
    getJobs();
  };

  const PrevPage = async (e) => {
    setPage(page-1);
    e.preventDefault(); 
    getJobs();
  };

  const findJob = async (e) => {
    e.preventDefault(); 
    getJobs();
  };

  const getJobs = async () => {
    const response = await axios.get(`http://localhost:9090/api/jobs?page=${page}&location=${location}&description=${description}&full_time=${isChecked}`,
      {
        headers: {
        'authorization': `Bearer ${session}`
      }
    });
    setJobs(response.data.data);
  };

  return (
    <div>
      <h1 className="title">Jobs</h1>

      <form onSubmit={findJob} className="box">
      <div className="field">
                  <label className="label">Location</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                    />
                  </div>
                </div>
                <div className="field">
                  <label className="label">Description</label>
                  <div className="control">
                    <input
                      type="text"
                      className="input"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
              <input
                type="checkbox"
                id="full_time"
                name="full_time"
                value="full_time"
                checked={isChecked}
                onChange={handleOnChange}
              />
              Full Time
                <div className="field mt-5">
                  <button
                    type="submit"
                    className="button is-success is-fullwidth"
                  > Search
                  </button>
                </div>
              </form>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Title</th>
            <th>Type</th>
            <th>Company</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job, index) => (
            <tr Style="width: 100px;margin:0px 0px 50px;" key={job.id}>
              <td>{job.title}</td>
              <td>{job.type}</td>
              <td>{job.company}</td>
              <td>{job.location}</td><td>
                <Link
                  to={`/jobs/detail/${job.id}`}
                  className="button is-small is-info"
                >
                  Detail
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table><div class="row text-center" center>
    <div class="col-sm-12"  center="true">
        {
          page>1? <button  class="button is-primary center-block" Style="width: 100px;margin:20px;" onClick={PrevPage} >prev</button>:<></>
        }
         <button  class="button is-primary center-block" Style="width: 100px;margin:20px;" onClick={NextPage} >next</button>
     </div>
     </div>
</div>
  );
};

export default JobList;
