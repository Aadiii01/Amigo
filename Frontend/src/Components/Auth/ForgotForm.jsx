import React, { useState } from "react";
import { Formik, Form } from "formik";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import * as Yup from "yup";
import { Input } from "@nextui-org/input";
import "../../Styles/GlassMorphism.css";
import { useDispatch } from "react-redux";
import { forgetPassword } from "@/Store/userSlice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useToast } from "@/hooks/use-toast"
import { ToastAction } from "@/components/ui/toast"

const ForgotForm = () => {
  const { toast } = useToast();
  const dispatch = useDispatch()

  const { isOpen:issendEmailOpen, onOpen:onsendEmailOpen, onClose:onsendEmailClose } = useDisclosure();
  const { isOpen:isNoACCOpen, onOpen:onNoACCOpen, onClose:onNoACCClose } = useDisclosure();
  const { isOpen:isErrorOpen, onOpen:onErrorOpen, onClose:onErrorClose } = useDisclosure();
  const [responseMessage, setResponseMessage] = useState("");

  const validationSchema = Yup.object({
    emailId: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      const response = await dispatch(forgetPassword(values)).unwrap();
      setResponseMessage(response.message);
      toast({
        variant: "outline",
        title: "Email Sent",
        description: "Now go and check your email for password reset instructions.",
        className: "text-white font-[NetflixL] bg-[#00c06a]"
      });
      onsendEmailOpen()
      resetForm();
    } catch (error) {
      if(error.message === "User with this email does not exist"){
        setErrors({ emailId: "User with this email does not exist" })
        onNoACCOpen();
      }else{
        toast({
          variant: "destructive",
          title: "Something went wrong.",
          description: "There was a problem with your request due to server issue",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          className: "text-white font-[NetflixL]"
        });
        onErrorOpen();
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center mt-8 sm:mt-20 glassmorphism">
      <Formik
        initialValues={{ emailId: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
          <Form>
            <div className="mx-auto mb-20 grid w-[350px] gap-6 font-[NetflixR] ">
              <div className="grid gap-2 text-center ">
                <h1
                  className="font-[NetflixB] bg-gradient-to-r from-sky-500 via-purple-800 to-red-600 bg-clip-text 
                  text-4xl font-bold text-transparent">
                  Forgot Password
                </h1>
                <p className="text-balance text-muted-foreground text-white">
                  We will send you an email with instructions on how to reset your password.
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
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
                    color={touched.emailId && errors.emailId ? "danger" : "success"} 
                    errorMessage={touched.emailId && errors.emailId ? errors.emailId : ""}
                    classNames={{
                      label: "text-white", 
                    }}
                    className="custom-email-input"
                  />
                </div>

                <Modal
                  size="sm"
                  isOpen={issendEmailOpen}
                  onClose={onsendEmailClose}
                  backdrop="opaque"
                >
                  <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 font-[NetflixB]">
                      Forgot Password
                    </ModalHeader>
                    <ModalBody className="font-[NetflixL]">
                    <p>{responseMessage ? responseMessage : "We send the link to your email to reset the password go and check your email"}
                    </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onsendEmailClose} className="font-[NetflixR]">
                        OK
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Modal
                  size="sm"
                  isOpen={isNoACCOpen}
                  onClose={onNoACCClose}
                  backdrop="opaque"
                >
                  <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 font-[NetflixB]">
                      Account not exist
                    </ModalHeader>
                    <ModalBody className="font-[NetflixL]">
                    <p>{`No Account exist with that email Id ${values.emailId}`}
                    </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onNoACCClose} className="font-[NetflixR]">
                        OK
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
                  className="w-full bg-[#e50914] hover:bg-[#e64e4e] rounded-[10px]"
                  disabled={isSubmitting}
                >
                  Email Me
                </Button>
              </div>
              <div className="mt-1 text-center text-sm text-white">
                Don&apos;t have an account?{" "}
                <Link to="/auth" className="underline">Sign Up</Link>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ForgotForm;
