import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import dayjs from "dayjs";
import axios from "axios";

const Report = () => {
  const [limit, setLimit] = useState(10);
  const [reportData, setReportData] = useState([]);
  const [date, setDate] = useState(dayjs(Date.now()).format("YYYY-MM-DD"));

  const fetchReportAbsence = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/absence`, {
        headers: { Authorization: import.meta.env.VITE_API_TOKEN },
      })
      .then((res) => {
        setReportData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchReportAbsence();
  }, []);

  const onChangeDate = (v) => {
    setDate(v.target.value);
  };

  const onClickReport = () => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/absence/generate-report`, {
        headers: { Authorization: import.meta.env.VITE_API_TOKEN },
      })
      .then((res) => {
        window.open(res.data.path);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-center gap-3">
        <div className="flex justify-end">
          <div className="flex justify-between gap-5">
            <input
              className="border-[1px] border-gray-300 px-3 py-1 rounded-md"
              type="date"
              defaultValue={date}
              onChange={onChangeDate}
            />
            <button
              onClick={onClickReport}
              className="bg-blue-400 hover:bg-blue-500 p-2 text-white rounded-md"
            >
              Generate Report
            </button>
          </div>
        </div>
        <table className="custom-table">
          <thead>
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Date</th>
              <th>Absence Time</th>
            </tr>
          </thead>
          <tbody>
            {reportData.map((el, key) => (
              <tr>
                <td>{key + 1}</td>
                <td>{el.user.name}</td>
                <td>{dayjs(el.absence_date).format("DD MMMM YYYY")}</td>
                <td>{el.absence_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Report;
