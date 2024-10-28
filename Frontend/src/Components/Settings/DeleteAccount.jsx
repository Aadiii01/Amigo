import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useDispatch, useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { deleteProfile } from "@/Store/userSlice";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

const validationSchema = Yup.object({
  password: Yup.string().required("Password is required"),
});

const DeleteAccount = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { user, isLoading } = useSelector((state) => state.userData);
  const email = user?.data?.emailId || user?.data?.user?.emailId  || "you@domain.com";

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      const result = await dispatch(deleteProfile(values)).unwrap();
      if (result?.success) {
        resetForm();
        toast({
          variant: "outline",
          title: "Account Delete",
          description: "Your Account has delete Successfully",
          className: "text-white font-[NetflixL] bg-[#00c06a]",
        });
        navigate("/auth");
      } else {
        if (result.message === "Password is wrong") {
          setErrors({ password: "Password is wrong" });
          toast({
            variant: "destructive",
            description: "Password is Wrong",
            className: "text-white font-[NetflixL]",
          });
        } else {
          toast({
            variant: "destructive",
            title: "Account Delete",
            description: "Due to server issue your account is not delete",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
            className: "text-white font-[NetflixL]",
          });
        }
      }
    } catch (error) {
      if (error.message === "Password is wrong") {
        setErrors({ password: "Password is wrong" });
        toast({
          variant: "destructive",
          description: "Password is Wrong",
          className: "text-white font-[NetflixL]",
        });
      } else {
        toast({
          variant: "destructive",
          title: "Account Delete",
          description: "Due to server issue your account is not delete",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          className: "text-white font-[NetflixL]",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col items-start sm:items-center justify-center">
      <div className="flex flex-col w-full sm:w-[95%] lg:w-[54%]">
        <CardHeader>
          <CardTitle className="text-sm sm:text-xl font-[NetflixB]">
            Delete Your Account? Let's Talk First! 💔
          </CardTitle>
          <CardDescription className="font-[NetflixL]">
            We’re sad to see you go! Before you make the final decision, we
            would like to say that
            <span className="italic text-black">
              {" "}
              If you ever wish to return, we’ll be here waiting!{" "}
            </span>
            🌟
          </CardDescription>
        </CardHeader>
      </div>
      <div className="sm:rounded-lg sm:border sm:bg-card sm:text-card-foreground sm:shadow-sm w-full sm:w-[95%] lg:w-[50%] lg:mt-[20px]">
        <CardHeader>
          <CardTitle className="text-xl font-[NetflixB]">
            Delete Account
          </CardTitle>
          <CardDescription className="font-[NetflixL]">
            This will permanently delete your account
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={{ password: "" }}
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
            validateForm,
            submitForm
          }) => (
            <Form>
              <CardContent>
                <div className="grid gap-4">
                  <div className="grid gap-2 font-[NetflixR]">
                    <Input
                      type="email"
                      label="Email"
                      labelPlacement="outside"
                      placeholder="you@domain.com"
                      variant="bordered"
                      name="email"
                      isDisabled
                      value={email}
                    />
                  </div>
                  <div className="grid gap-2 font-[NetflixR]">
                    <Input
                      label="Password"
                      variant="bordered"
                      placeholder="Enter password"
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
                      color={
                        touched.password && errors.password
                          ? "danger"
                          : "success"
                      }
                      errorMessage={
                        touched.password && errors.password
                          ? errors.password
                          : ""
                      }
                      classNames={{
                        label: "text-[#0a0a0a]",
                      }}
                    />
                  </div>

                  <Button
                    type="button"
                    className="w-full font-[NetflixR] text-white bg-[#e50914] hover:bg-[#e64e4e] rounded-[10px]"
                    isLoading={isSubmitting || isLoading}
                    isDisabled={isSubmitting || isLoading}
                    onClick={async () => {
                      const validationResult = await validateForm();
                      const passwordError = validationResult.password;
                      if (Object.keys(validationResult).length === 0) {
                        onOpen();
                      }
                    }}
                  >
                    {isLoading ? "Delete Account..." : "Delete Account"}
                  </Button>

                  <Modal
                    size="md"
                    isOpen={isOpen}
                    onClose={onClose}
                    backdrop="opaque"
                    placement="auto"
                  >
                    <ModalContent>
                      <ModalHeader className="flex flex-col gap-1 font-[NetflixB]">
                        Are you absolutely sure?
                      </ModalHeader>
                      <ModalBody>
                        <p className="font-[NetflixL]">
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          className="font-[NetflixR] rounded-[10px]"
                          color="default"
                          variant="light"
                          onPress={onClose}
                        >
                          No
                        </Button>
                        <Button
                          className="font-[NetflixR] text-white rounded-[10px]"
                          color="primary"
                          onPress={() => {
                            onClose();  
                            submitForm();
                          }}
                        >
                          Yes
                        </Button>
                      </ModalFooter>
                    </ModalContent>
                  </Modal>
                </div>
              </CardContent>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default DeleteAccount;
