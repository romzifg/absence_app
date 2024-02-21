import { useState } from "react";
import Navbar from "../components/Navbar";
import dayjs from "dayjs";
import { useQuery } from "react-query";
import { fetchReportAbsence, onClickReport } from "../fetching/Report/Report";
import { toast, ToastContainer } from "react-toastify";

const Report = () => {
  const [date, setDate] = useState(dayjs(Date.now()).format("YYYY-MM-DD"));
  const {
    data: dataReport,
    isError: isErrorDataReport,
    isLoading: isLoadingDataReport,
  } = useQuery("report", fetchReportAbsence);

  if (isLoadingDataReport) {
    return <div>Loading...</div>;
  }

  if (isErrorDataReport) {
    return toast.error(err.response.data.message, {
      position: "top-center",
    });
  }

  const onChangeDate = (v) => {
    setDate(v.target.value);
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
            {dataReport.data.map((el, key) => (
              <tr key={key}>
                <td>{key + 1}</td>
                <td>{el.user.name}</td>
                <td>{dayjs(el.absence_date).format("DD MMMM YYYY")}</td>
                <td>{el.absence_time}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </>
  );
};

export default Report;
