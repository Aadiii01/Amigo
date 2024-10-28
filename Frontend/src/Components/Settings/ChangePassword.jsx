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
import { changePassword } from "@/Store/userSlice";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";

const validationSchema = Yup.object({
  oldpassword: Yup.string().required("Old Password is required"),
  newpassword: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("New Password is required"),
});

const ChangePassword = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { user, isLoading } = useSelector((state) => state.userData);
  const email = user?.data?.emailId || user?.data?.user?.emailId || "you@domain.com";

  const handleSubmit = async (
    values,
    { setSubmitting, resetForm, setErrors }
  ) => {
    try {
      const result = await dispatch(changePassword(values)).unwrap();
      if (result?.success) {
        resetForm();
        toast({
          variant: "outline",
          description: "Password Change Successfully",
          className: "text-white font-[NetflixL] bg-[#00c06a]",
        });
        navigate("/home");
      } else {
        if (result.message === "Invalid old password") {
          setErrors({ oldpassword: "Old Password is wrong" });
        } else if (
          result.message === "Old password and new password not same"
        ) {
          setErrors({
            newpassword: "You can't set new password same as old password",
          });
        } else {
          toast({
            variant: "destructive",
            description: "Due to server issue Password is not change",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
            className: "text-white font-[NetflixL]",
          });
        }
      }
    } catch (error) {
      if (error.message === "Invalid old password") {
        setErrors({ oldpassword: "Old Password is wrong" });
      } else if (error.message === "Old password and new password not same") {
        setErrors({
          newpassword: "You can't set new password same as old password",
        });
      } else {
        toast({
          variant: "destructive",
          description: "Due to server issue Password is not change",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          className: "text-white font-[NetflixL]",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-start sm:items-center justify-center mt-6 sm:my-auto">
      <div className="sm:rounded-lg sm:border sm:bg-card sm:text-card-foreground sm:shadow-sm w-full sm:w-[95%] lg:w-[50%]">
        <CardHeader>
          <CardTitle className="text-xl font-[NetflixB]">
            Change Password
          </CardTitle>
          <CardDescription className="font-[NetflixL]">
            Enter your Old & New Password and Change it
          </CardDescription>
        </CardHeader>
        <Formik
          initialValues={{ oldpassword: "", newpassword: "" }}
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
                      label="Old Password"
                      variant="bordered"
                      placeholder="Old password"
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
                      name="oldpassword"
                      value={values.oldpassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.oldpassword && errors.oldpassword}
                      color={
                        touched.oldpassword && errors.oldpassword
                          ? "danger"
                          : "success"
                      }
                      errorMessage={
                        touched.oldpassword && errors.oldpassword
                          ? errors.oldpassword
                          : ""
                      }
                      classNames={{
                        label: "text-[#0a0a0a]",
                      }}
                    />
                  </div>
                  <div className="grid gap-2 font-[NetflixR]">
                    <Input
                      label="New Password"
                      variant="bordered"
                      placeholder="New password"
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

                  <Button
                    type="submit"
                    className="w-full font-[NetflixR] text-white bg-[#e50914] hover:bg-[#e64e4e] rounded-[10px]"
                    isLoading={isSubmitting || isLoading}
                    isDisabled={isSubmitting || isLoading}
                  >
                    {isLoading ? "Change Password..." : "Change Password"}
                  </Button>
                </div>
              </CardContent>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default ChangePassword;
