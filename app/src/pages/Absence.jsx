import { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import QrImage from "../assets/qr-code-scan.png";

const Absence = () => {
  const [isFailed, setIsFailed] = useState(false);
  const [isHide, setIsHide] = useState(true);
  const scanValueRef = useRef(null);

  useEffect(() => {
    scanValueRef?.current?.focus();
    localStorage.clear();
  }, []);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      axios
        .post(
          `${import.meta.env.VITE_API_URL}/absence/testing`,
          {
            qr: event?.target?.value,
          },
          { headers: { Authorization: import.meta.env.VITE_API_TOKEN } }
        )
        .then((res) => {
          setTimeout(() => {
            scanValueRef.current.value = null;
            scanValueRef?.current?.focus();
          }, 2000);
          setIsFailed(false);
          setIsHide(false);
          setTimeout(() => {
            setIsHide(true);
          }, 2000);
        })
        .catch((err) => {
          setTimeout(() => {
            scanValueRef.current.value = null;
            scanValueRef?.current?.focus();
          }, 2000);
          setIsFailed(true);
          setTimeout(() => {
            setIsFailed(false);
          }, 2000);
        });
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center gap-3">
        <h1 className="text-2xl font-bold mb-3">Participant Absence</h1>
        <img className="w-24 mb-3" src={QrImage} alt="qr-image" />
        <input
          className="border-[1px] border-gray-200 focus:border-gray-200 rounded-lg text-center p-3"
          type="text"
          ref={scanValueRef}
          onKeyDown={handleKeyDown}
          autoFocus
          placeholder="Scan Your QR"
        />
        {isFailed ? (
          <div className="bg-red-600 border-red-600 p-3 rounded-lg">
            <p className="text-white">Failed Absence</p>
          </div>
        ) : null}
        {!isHide ? (
          <div className="bg-green-600 border-green-600 p-3 rounded-lg">
            <p className="text-white">Success Absence</p>
          </div>
        ) : null}
      </div>
    </>
  );
};

export default Absence;
