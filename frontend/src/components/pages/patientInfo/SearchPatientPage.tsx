import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function SearchPatientPage() {
  const [data, setData] = useState([]);
  const [searching, setSearching] = useState("");
  const [dummy_data, setDummyData] = useState([]);

  const navigate = useNavigate();

  function detailClick(val : any) {
    navigate("/search_patient/details", { replace: true, state: { val } });
  }

  async function SearchClick(searching: string) {
    setSearching(searching);
    if (searching === "") {} else {
            try {
              const response = await axios.get(`http://localhost:3000/api/getPatient/${searching}`);
              setDummyData(response.data);
            } catch (error) {
              console.error("Error fetching data from API:", error);
            }

    }
  }

return (
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
                onChange={(e) => { SearchClick(e.target.value) }}
              />
            </div>
          </div>
          <table className="table table-xs">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              {/* item */}
              <tr>
                <th scope="col" className="p-4"></th>
                <th scope="col" className="p-4">
                  ID Number
                </th>
                <th scope="col" className="p-4">
                  Name
                </th>
                <th scope="col" className="p-4">
                  MiddleName
                </th>
                <th scope="col" className="p-4">
                  LastName
                </th>
                <th scope="col" className="p-4">
                  Blood Type
                </th>
                <th scope="col" className="p-4">
                  Sex
                </th>
              </tr>
            </thead>
            <tbody>{dummy_data.map((val) => (
              <tr
                key={val.p_id}
                className="border-b dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() => detailClick(val.p_id)}
                      className="py-2 px-3 flex items-center text-sm font-medium text-center text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 mr-2 -ml-0.5"
                      >
                        <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z"
                        />
                      </svg>
                      Details
                    </button>
                  </div>
                </td>

                {/* Data for each column */}
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center">
                    <td>{val.idNumber}</td>
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
                    <td>{val.bloodType}</td>
                  </div>
                </td>
                <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  <div className="flex items-center">
                    <td>{val.sex}</td>
                  </div>
                </td>
              </tr>
            ))}
            </tbody>
          </table>
        </div>
        <br />
      </div>
    </div>
  </div>
);
}
