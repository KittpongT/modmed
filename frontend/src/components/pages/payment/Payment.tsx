import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

type Props = {};

export default function Payment({}: Props) {
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState("");

  const navigate = useNavigate();

  const [patientList, setPatientList] = useState([]);

  // .

  async function SearchClick() {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/getPatientPayment/${searching}`
      );
      setPatientList(response.data);
    } catch (error) {
      console.error("Error fetching data from API:", error);
    }
  }
  return (
    <>
      <div>
        <div className="bg-gray-50 dark:bg-gray-900 p-3 sm:p-5 antialiased">
          <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
            <div className="bg-white dark:bg-gray-800 relative shadow-md sm:rounded-lg overflow-hidden">
              <div className="card mx-auto my-3 w-4/6 py-3 bg-white dark:bg-gray-800 relative sm:rounded-lg">
                <div className="input w-4/6 input-bordered flex items-center mx-auto gap-2">
                  <input
                    type="text"
                    className="grow"
                    placeholder="Search"
                    value={searching}
                    onChange={(e) => setSearching(e.target.value)}
                  />
                  <button
                    className="btn bg-blue-500 w-16 text-xs text-white mx-2"
                    onClick={SearchClick}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 16 16"
                      fill="currentColor"
                      className="w-4 h-4 opacity-70"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <table className="table table-xs">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                  {/* item */}

                  <tr>
                    <th scope="col" className="p-4">
                      ID card
                    </th>
                    <th scope="col" className="p-4">
                      FirstName
                    </th>
                    <th scope="col" className="p-4">
                      MiddleName
                    </th>
                    <th scope="col" className="p-4">
                      LastName
                    </th>
                    <th scope="col" className="p-4">
                      Phone Number
                    </th>
                    <th scope="col" className="p-4">
                      view
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {patientList.map((val) => (
                    <tr
                      key={val.p_id}
                      className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      {/* Data for each column */}
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <th>{val.idNumber}</th>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <td>{val.fName}</td>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <td>{val.mName ? val.mName : "-"}</td>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <td>{val.lName}</td>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center">
                          <td>{val.tel}</td>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                        <div className="flex items-center space-x-4">
                          <button
                            className="btn btn-outline btn-accent"
                            onClick={() =>
                              document.getElementById(val.p_id).showModal()
                            }
                          >
                            Accent
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {patientList.map((val) => (
                <dialog
                  id={val.p_id}
                  className="modal"
                  style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
                >
                  <div className="modal-box">
                    <h3 className="font-bold text-lg">
                      Name: {val.fName} {val.mName} {val.lName}
                    </h3>
                    <p className="py-4">Blood Type: {val.bloodType}</p>
                    <div className="modal-action">
                      <button
                        className="btn"
                        onClick={() => {
                          document.getElementById(val.p_id).close();
                        }}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </dialog>
              ))}
            </div>
            <br />
          </div>
        </div>
      </div>
    </>
  );
}