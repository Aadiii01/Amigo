import React from "react";
import { Input } from "@nextui-org/react";
import {languageStrings} from "../../Utils/language.js"
import { Formik, Form, } from "formik";
import * as Yup from "yup";
import { useLanguage } from "@/context/LanguageContext.jsx";
import "../../Styles/SectionFooterEmial.css";
import { useNavigate } from "react-router-dom"; 

const SectionFooterEmail = () => {

  const emailValidationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Please enter a valid email address")
      .required("Email is required"),
  });

  const { selectedLanguage } = useLanguage();
  const navigate = useNavigate();

  return (
    <div className="SectionBlock SectionFooterEmail">
      <div className="mailboxSection">
        <div className="mailsection mailsection1">
          <Formik
            initialValues={{ email: "" }}
            validationSchema={emailValidationSchema}
            onSubmit={(values, { setSubmitting }) => {
              navigate("auth", { state: { email: values.email } });
              setSubmitting(false); 
            }}
          >
          {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
          <Form className="formmail">
            <h3 className="mailheading mailheading1 font-[NetflixR] ">
              {languageStrings[selectedLanguage].emialHeading}
            </h3>
            <div data-issplitform="false" className="divmailbox divmailbox1">
              <Input 
                type="email" 
                label={languageStrings[selectedLanguage].emaillabel} 
                variant="bordered" 
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                isInvalid={touched.email && errors.email} 
                color={touched.email && errors.email ? "danger" : "success"} 
                errorMessage={touched.email && errors.email ? errors.email : ""}
                className="text-white tou" 
                autoComplete="email"
              />
              <button type="submit" disabled={isSubmitting} className="butdiv">{languageStrings[selectedLanguage].emailbutton}
                <div className="svgdiv">
                  <svg
                    xmlns="http://www.w3.org/2000/svg" fill="none" role="img" viewBox="0 0 24 24" width="24" height="24" data-icon="ChevronRightStandard" aria-hidden="true">
                    <path
                      fillRule="evenodd" clipRule="evenodd" d="M15.5859 12L8.29303 19.2928L9.70725 20.7071L17.7072 12.7071C17.8948 12.5195 18.0001 12.2652 18.0001 12C18.0001 11.7347 17.8948 11.4804 17.7072 11.2928L9.70724 3.29285L8.29303 4.70706L15.5859 12Z" fill="currentColor"></path>
                  </svg>
                </div>
              </button>
            </div>
          </Form>
          )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SectionFooterEmail;
