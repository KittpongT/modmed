//docRegis

import React from "react";
import { FormEvent, useState } from "react";
import { useMultistepForm } from "../../UseMultiForm";
import { PersonalInfoRegis } from "./PersonalInfoRegis";
import { EmergencyRegis } from "./EmergencyRegis";
import { EducationalRegis } from "./EducationalRegis";
import { useNavigate, useLocation } from 'react-router-dom';

type Props = {};

type FormData = {
  fName: string;
  mName: string;
  lName: string;
  idNumber: string;
  DOB: Date;
  sex: string;
  addresses: string;
  tel: string;
  email: string
  pw: string
  nationality: string;
  race : string;
  religion: string;
  bloodType: string;
  department: string;
  license_id: string;
  education: {
    degree: string;
    institute: string;
    year: string;
    sepecificField: string;
  }[];
};

const INITIAL_DATA: FormData = {
  fName: "",
  mName: "",
  lName: "",
  idNumber: "",
  DOB: new Date,
  sex: "",
  addresses: "",
  tel: "",
  email: "",
  pw: "",
  nationality: "",
  race: "",
  religion: "",
  bloodType: "",
  department: "",
  license_id: "",
  education: [{ degree: "", institute: "", year: "", sepecificField: "" }],
};

export default function StaffRegisPage({}: Props) {
  const [data, setData] = React.useState<FormData>(INITIAL_DATA);
  const navigate = useNavigate();

  function goBack(bool) {
    if(bool) {
      alert("Successful Docter Insertion !");
      navigate("/manage_doctor");
    }
  }

  function updateFields(fields: Partial<FormData>) {
    setData((prev) => {
      return { ...prev, ...fields };
    });
  }
  const { step, isFirstStep, isLastStep, back, next } = useMultistepForm([
    <PersonalInfoRegis {...data} updateFields={updateFields} />,
    <EmergencyRegis {...data} updateFields={updateFields} />,
    <EducationalRegis {...data} updateFields={updateFields} />,
  ]);
  function onSubmit(e: FormEvent) {
    e.preventDefault();
    // if(data.pw !== data.confirmPassword){
    //   alert("Password and Confirm Password do not match");
    //   setData((prevData) => ({
    //     ...prevData,
    //     password: "",
    //     confirmPassword: ""
    //   }));
    //   return;
    // }
    if (!isLastStep) return next();
    alert("Successful Account Creation");
  }

  return (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center  px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={onSubmit}
              >
                {step}
                <div className="my-2 flex justify-between">
                  {!isFirstStep && (
                    <button
                      className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 my-2 mx-2"
                      type="button"
                      onClick={() => {
                        back();
                      }}
                    >
                      Back
                    </button>
                  )}
                  <button
                    className={`w-${isFirstStep ? "full" : "1/2"} text-white ${
                      isLastStep
                        ? "bg-green-600 hover:bg-green-700"
                        : "bg-blue-600 hover:bg-blue-700"
                    }  font-medium rounded-lg text-sm px-5 py-2.5 text-center my-2 mx-2`}
                    type="submit"
                    onClick={() => isLastStep ? goBack(1) : goBack(0)}
                  >
                    {isLastStep ? "Finish" : "Next"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
