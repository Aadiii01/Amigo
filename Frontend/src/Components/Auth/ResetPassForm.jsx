import React, { useState } from "react";
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
import "../../Styles/GlassMorphism.css";
import { useNavigate, useParams } from "react-router-dom";
import { resetPassword } from "@/Store/userSlice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

const ResetPassForm = () => {
  const { id, token } = useParams();
  const { isOpen:isSuccessOpen, onOpen:onSuccessOpen, onClose:onSuccessClose } = useDisclosure();
  const { isOpen:isUsedOpen, onOpen:onUsedOpen, onClose:onUsedClose } = useDisclosure();
  const { isOpen:isExpireOpen, onOpen:onExpireOpen, onClose:onExpireClose } = useDisclosure();
  const { isOpen:isErrorOpen, onOpen:onErrorOpen, onClose:onErrorClose } = useDisclosure();


  const { toast } = useToast();
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    newpassword: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("New Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("newpassword"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });


  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await dispatch(
        resetPassword({ id, token, newpassword: values.newpassword })
      ).unwrap();
      if(response?.success){
        toast({
          variant: "outline",
          title: "Reset Successfully",
          description: "Your Password is reset successfully",
          className: "text-white font-[NetflixL] bg-[#00c06a]"
        });
        onSuccessOpen();
        resetForm()
      }
    } catch (error) {
      if(error.message === "Request failed with status code 400"){
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: "There was a problem with your request due to server issue",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          className: "text-white font-[NetflixL]"
        });
        onExpireOpen();
      }
        else if (error.message ==="Request failed with status code 401"){
          onExpireOpen();
        }else{
          onErrorOpen();
        }
    }
  };

  return (
    <div className="sm:rounded-lg sm:border sm:bg-card sm:text-card-foreground sm:shadow-sm sm:mt-[40px] md:max-w-[500px] md:ml-[140px] lg:max-w-[500px] lg:ml-[220px] ">
      <CardHeader>
        <CardTitle className="text-xl font-[NetflixB]">
          Reset Password
        </CardTitle>
        <CardDescription className="font-[NetflixL]">
          Enter your New Password and Confirm it
        </CardDescription>
      </CardHeader>
      <Formik
        initialValues={{ email: "", newpassword: "", confirmPassword: "" }}
        validationSchema={validationSchema}
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
                <div className="grid gap-2 font-[NetflixR]">
                  <Input
                    label="New Password"
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
                    name="newpassword"
                    value={values.newpassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.newpassword && errors.newpassword}
                    color={
                      touched.newpassword && errors.newpassword
                        ? "danger"
                        : "success"
                    }
                    errorMessage={
                      touched.newpassword && errors.newpassword
                        ? errors.newpassword
                        : ""
                    }
                    classNames={{
                      label: "text-[#0a0a0a]",
                    }}
                  />
                </div>
                <div className="grid gap-2 font-[NetflixR]">
                  <Input
                    label="Confirm Password"
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
                    name="confirmPassword"
                    value={values.confirmPassword}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={
                      touched.confirmPassword && errors.confirmPassword
                    }
                    color={
                      touched.confirmPassword && errors.confirmPassword
                        ? "danger"
                        : "success"
                    }
                    errorMessage={
                      touched.confirmPassword && errors.confirmPassword
                        ? errors.confirmPassword
                        : ""
                    }
                    classNames={{
                      label: "text-[#0a0a0a]",
                    }}
                  />
                </div>

                <Modal
                  size="sm"
                  isOpen={isSuccessOpen}
                  onClose={onSuccessClose}
                  backdrop="opaque"
                >
                  <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 font-[NetflixB]">
                      Reset Password
                    </ModalHeader>
                    <ModalBody className="font-[NetflixL]">
                      <p>
                        Your Password is reset successfully, Now go and login
                        and make connection with Amigo User.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onSuccessClose} className="font-[NetflixR]">
                        GO
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Modal
                  size="sm"
                  isOpen={isUsedOpen}
                  onClose={onUsedClose}
                  backdrop="opaque"
                >
                  <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 font-[NetflixB]">
                      Token Used
                    </ModalHeader>
                    <ModalBody className="font-[NetflixL]">
                      <p>
                        You used your token for reset the password, if you want to again reset your password then go to Forgot Password page.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onUsedClose} className="font-[NetflixR]">
                        GO
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Modal
                  size="sm"
                  isOpen={isExpireOpen}
                  onClose={onExpireClose}
                  backdrop="opaque"
                >
                  <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 font-[NetflixB]">
                      Token is Expire
                    </ModalHeader>
                    <ModalBody className="font-[NetflixL]">
                      <p>
                      Either you have already reset your password, or your token has expired, as it is only valid for 10 minutes. If you want to reset your password again, please go to the Forgot Password page.
                      </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onExpireClose} className="font-[NetflixR]">
                        GO
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Modal
                  size="sm"
                  isOpen={isErrorOpen}
                  onClose={onErrorClose}
                  backdrop="opaque"
                >
                  <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 font-[NetflixB]">
                      Problem
                    </ModalHeader>
                    <ModalBody className="font-[NetflixL]">
                    <p>Due to server issue you face the problem, Don't worry try again later we resolve that issue as soon as possible
                    </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onErrorClose} className="font-[NetflixR]">
                        OK
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Button
                  type="submit"
                  className="w-full font-[NetflixR] text-white bg-[#e50914] hover:bg-[#e64e4e] rounded-[10px]"
                  isLoading={isSubmitting}
                  disabled={isSubmitting}
                >
                  Reset Password
                </Button>
              </div>
            </CardContent>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ResetPassForm;
