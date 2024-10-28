import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { Input } from "@nextui-org/input";
import { EyeSlashFilledIcon } from "@/Utils/Icon.jsx";
import { EyeFilledIcon } from "@/Utils/Icon.jsx";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "@/Store/userSlice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

export function SignUpForm() {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { isOpen:isNormalRegisterOpen, onOpen:onNormalRegisterOpen, onClose:onNormalRegisterClose } = useDisclosure();
  const { isOpen:isGoogleRegisterOpen, onOpen:onGoogleRegisterOpen, onClose:onGoogleRegisterClose } = useDisclosure();

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const passedEmail = location.state?.email || "";

  const { isLoading, error } = useSelector((state) => state.userData);
  const [isGoogleSignup, setIsGoogleSignup] = useState(false);

  const SignupSchema = Yup.object().shape({
    fullName: isGoogleSignup
      ? Yup.string()
      : Yup.string()
          .min(2, "Too Short!")
          .max(15, "Too Long!")
          .required("Full Name is required"),
    userName: isGoogleSignup
      ? Yup.string()
      : Yup.string()
          .min(3, "Username too short")
          .max(10, "Username too long")
          .required("Username is required"),
    emailId: isGoogleSignup
      ? Yup.string()
      : Yup.string().email("Invalid email").required("Email is required"),
    password: isGoogleSignup
      ? Yup.string()
      : Yup.string()
          .min(8, "Password should be at least 8 characters long")
          .required("Password is required"),
  });

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      const result = await dispatch(registerUser(values)).unwrap();
      if (result?.success) {
        resetForm();
        navigate("/verifyemail");
      } else {
        // Handle errors related to email and username duplication
        if (result.message === "Email already exists") {
          setErrors({ emailId: "Email already exists" });
        } else if (result.message === "Username already exists") {
          setErrors({ userName: "Username already exists" });
        } else {
          onNormalRegisterOpen()
        }
      }
    } catch (error) {
      // Handle unexpected errors
      if (error.response && error.response.data) {
        const { message } = error.response.data;
        if (message === "Email already exists") {
          setErrors({ emailId: "Email already exists" });
        } else if (message === "Username already exists") {
          setErrors({ userName: "Username already exists" });
        } else {
          onNormalRegisterOpen()
        }
      } else {
        onNormalRegisterOpen()
  
      }
    } finally {
      setSubmitting(false);
    }
  };

  // const handleGoogleSignUp = async () => {
  //   try {

  //     setIsGoogleSignup(true);
  //     window.location.href = `${BACKEND_URL}/user/auth/google`;
  //   } catch (error) {
  //     onGoogleRegisterOpen()
  //   }
  // };

  return (
    <div className="sm:rounded-lg sm:border sm:bg-card sm:text-card-foreground sm:shadow-sm">
      <CardHeader>
        <CardTitle className="text-xl font-[NetflixB]">Sign Up</CardTitle>
        <CardDescription className="font-[NetflixL]">
          Enter your information to create an account
        </CardDescription>
      </CardHeader>

      <Formik
        initialValues={{
          fullName: "",
          userName: "",
          emailId: passedEmail,
          password: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
        }) => (
          <Form>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols-2 gap-4 font-[NetflixR]">
                  <div className="grid gap-2">
                    <Input
                      type="text"
                      label="Full Name"
                      placeholder="Full Name"
                      labelPlacement="outside"
                      variant="bordered"
                      name="fullName"
                      value={values.fullName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.fullName && errors.fullName}
                      isDisabled={isGoogleSignup}
                      color={
                        touched.fullName && errors.fullName
                          ? "danger"
                          : "success"
                      }
                      errorMessage={
                        touched.fullName && errors.fullName
                          ? errors.fullName
                          : ""
                      }
                      classNames={{
                        label: "text-[#0a0a0a]",
                      }}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Input
                      type="text"
                      label="Username"
                      placeholder="username"
                      labelPlacement="outside"
                      variant="bordered"
                      name="userName"
                      value={values.userName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.userName && errors.userName}
                      isDisabled={isGoogleSignup}
                      color={
                        touched.userName && errors.userName
                          ? "danger"
                          : "success"
                      }
                      errorMessage={
                        touched.userName && errors.userName
                          ? errors.userName
                          : ""
                      }
                      classNames={{
                        label: "text-[#0a0a0a]",
                      }}
                    />
                  </div>
                </div>

                <div className="grid gap-2 font-[NetflixR]">
                  <Input
                    type="email"
                    label="Email"
                    labelPlacement="outside"
                    placeholder="you@domain.com"
                    variant="bordered"
                    name="emailId"
                    value={values.emailId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.emailId && errors.emailId}
                    color={
                      touched.emailId && errors.emailId ? "danger" : "success"
                    }
                    errorMessage={
                      touched.emailId && errors.emailId ? errors.emailId : ""
                    }
                    classNames={{
                      label: "text-[#0a0a0a]",
                    }}
                    isDisabled={!!passedEmail || isGoogleSignup}
                  />
                </div>

                <div className="grid gap-2 font-[NetflixR]">
                  <Input
                    label="Password"
                    variant="bordered"
                    placeholder="Enter your password"
                    labelPlacement="outside"
                    endContent={
                      <button
                        className="focus:outline-none"
                        type="button"
                        onClick={toggleVisibility}
                        aria-label="toggle password visibility"
                      >
                        {isVisible ? (
                          <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        ) : (
                          <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                        )}
                      </button>
                    }
                    type={isVisible ? "text" : "password"}
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && errors.password}
                    isDisabled={isGoogleSignup}
                    color={
                      touched.password && errors.password ? "danger" : "success"
                    }
                    errorMessage={
                      touched.password && errors.password ? errors.password : ""
                    }
                    classNames={{
                      label: "text-[#0a0a0a]",
                    }}
                  />
                </div>

                <Modal
                  size="sm"
                  isOpen={isNormalRegisterOpen}
                  onClose={onNormalRegisterClose}
                  backdrop="opaque"
                >
                  <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 font-[NetflixB]">
                      Server issue
                    </ModalHeader>
                    <ModalBody className="font-[NetflixL]">
                    <p>Sign-up is temporarily unavailable due to a technical issue. We're working to resolve it. Please try again shortly!
                    </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onNormalRegisterClose} className="font-[NetflixR]">
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Modal
                  size="sm"
                  isOpen={isGoogleRegisterOpen}
                  onClose={onGoogleRegisterClose}
                  backdrop="opaque"
                >
                  <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 font-[NetflixB]">
                      Problem with signup by Google
                    </ModalHeader>
                    <ModalBody className="font-[NetflixL]">
                    <p>Don't worry, You try with normal register and we resolve that problem as soon as possible
                    </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onGoogleRegisterClose} className="font-[NetflixR]">
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Button
                  type="submit"
                  className="w-full font-[NetflixR] text-white bg-[#e50914] hover:bg-[#e64e4e] rounded-[10px]"
                  isLoading={isSubmitting || isLoading} // Update to use isLoading
                  disabled={isSubmitting || isLoading}
                >
                  {isLoading ? "Creating Account..." : "Create an account"}
                </Button>

                <div className="flex items-center gap-4">
                  <hr className="w-full border-gray-300" />
                  <p className="text-sm text-gray-800 text-center font-[NetflixR]">
                    OR
                  </p>
                  <hr className="w-full border-gray-300" />
                </div>

                {/* <Button
                  type="submit"
                  variant="bordered"
                  className="w-full flex items-center justify-center gap-4 font-[NetflixR] rounded-[10px]"
                  onClick={handleGoogleSignUp}
                >
                  {GoogleSVG}
                  Continue with Google
                </Button> */}
              </div>

              <div className="mt-4 text-center text-sm font-[NetflixR]">
                Already have an account?{" "}
                <Link to="/signin" className="underline">
                  Sign in
                </Link>
              </div>
            </CardContent>
          </Form>
        )}
      </Formik>
    </div>
  );
}
