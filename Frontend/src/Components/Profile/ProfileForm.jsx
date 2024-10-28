import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "@nextui-org/input";
import { Avatar } from "@nextui-org/avatar";
import { Select, SelectItem } from "@nextui-org/react";
import { Textarea } from "@nextui-org/react";
import "../../Styles/Profile.css";
import { Gender, Country, myInterests } from "@/Utils/Data.jsx";
import { GalleryIcon } from "@/Utils/Icon";
import { Image } from "@nextui-org/image";
import {
  checkUser,
  updateUserProfile,
  uploadAvatar,
  uploadPhotos,
} from "@/Store/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Spinner } from "@nextui-org/react";
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

const SetProfileSchema = Yup.object().shape({
  gender: Yup.string().required("Gender is required"),
  age: Yup.number().min(18, "Greater then 18").required("Age is required"),
  interest: Yup.array()
    .min(3, "You must select at least 3 interests")
    .required("Interests are required"),
  about: Yup.string()
    .min(10, "About should be at least 10 characters long")
    .max(170, "About is too long")
    .required("About is required"),
  address: Yup.object({
    state: Yup.string()
      .min(2, "State name is too short")
      .max(50, "State name is too long")
      .required("State is required"),

    city: Yup.string()
      .min(2, "City name is too short")
      .max(50, "City name is too long")
      .required("City is required"),

    pincode: Yup.string()
      .matches(/^[1-9][0-9]{5}$/, "Pincode must be a 6-digit number")
      .required("Pincode is required"),
  }),
});

const ProfileForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  const { user, isLoading, error } = useSelector((state) => state.userData);

  const { isOpen, onOpen, onClose } = useDisclosure();


  const name = user?.data?.fullName || user?.data?.user?.fullName || "Your Name";
  const username = user?.data?.userName || user?.data?.user?.userName || "User Name";
  const avatarUrl = user?.data?.avatar || user?.data?.user?.avatar
  const photoUrl =
    user?.data?.photos || user?.data?.user?.photos

  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);

  useEffect(() => {
    if (!user) {
      dispatch(checkUser());
    }
  }, [dispatch, user]);

  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    setIsUploading(true);
    if (file) {
      try {
        await dispatch(uploadAvatar(file));
        setIsUploading(false);
        toast({
          variant: "outline",
          description: "Avatar Upload Successfully",
          className: "text-white font-[NetflixL] bg-[#00c06a]"
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Due to server issue avatar is not upload",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          className: "text-white font-[NetflixL]"
        });
      }
    }
  };

  const triggerFileInput = () => {
    document.getElementById("uploadFile1").click();
  };

  const handlePictureUpload = async (event) => {
    const photofiles = event.target.files[0];
    setIsUploadingPhoto(true);
    if (photofiles) {
      try {
        await dispatch(uploadPhotos(photofiles));
        setIsUploadingPhoto(false);
        toast({
          variant: "outline",
          description: "Photo Upload Successfully",
          className: "text-white font-[NetflixL] bg-[#00c06a]"
        });
      } catch (error) {
        toast({
          variant: "destructive",
          description: "Due to server issue Photo is not upload",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          className: "text-white font-[NetflixL]"
        });
      }
    }
  };

  const triggerPictureInput = () => {
    document.getElementById("uploadPicture").click();
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const result = await dispatch(updateUserProfile(values)).unwrap();
      if (result?.success) {
        resetForm();
        toast({
          variant: "outline",
          title: "Profile",
          description: "Profile Created Successfully",
          className: "text-white font-[NetflixL] bg-[#00c06a]"
        });
        navigate("/home")
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Profile",
        description: "Due to server issue Profile is not created",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        className: "text-white font-[NetflixL]"
      });
      onOpen()
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="sm:rounded-lg sm:border sm:bg-card sm:text-card-foreground sm:shadow-sm ">
      <CardHeader>
        <CardTitle className="text-xl font-[NetflixB]">
          Set up your Profile
        </CardTitle>
        <CardDescription className="font-[NetflixL]">
          Enter your information to display
        </CardDescription>
      </CardHeader>

      <Formik
        initialValues={{
          gender: "",
          age: "",
          interest: [],
          about: "",
          address: {
            state: "",
            city: "",
            pincode: "",
          },
        }}
        validationSchema={SetProfileSchema}
        onSubmit={handleSubmit}
      >
        {({
          isSubmitting,
          handleChange,
          handleBlur,
          values,
          errors,
          touched,
          setFieldValue,
        }) => (
          <Form>
            <CardContent>
              <div className="grid gap-4">
                <div className="grid grid-cols">
                  <div className="grid gap-2 m-auto">
                    <Avatar
                      isBordered
                      color="danger"
                      src={avatarUrl}
                      className="w-20 h-20 text-large"
                    />
                  </div>
                  <div className="grid gap-2 mt-4 font-[NetflixR]">
                    <Button
                      className="bg-[#e50914] text-white"
                      endContent={<GalleryIcon />}
                      onClick={triggerFileInput}
                    >
                      <input
                        type="file"
                        id="uploadFile1"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileUpload}
                      />
                      Choose Profile Pic
                    </Button>
                  </div>
                </div>

                {isUploading && <Spinner size="lg" color="danger" />}

                <div className="grid grid-cols-2 gap-4 font-[NetflixR]">
                  <div className="grid gap-2">
                    <Input
                      type="text"
                      label="Full Name"
                      placeholder="Aditya Arya"
                      labelPlacement="outside"
                      variant="bordered"
                      name="fullName"
                      value={name}
                      isDisabled
                    />
                  </div>

                  <div className="grid gap-2">
                    <Input
                      type="text"
                      label="Username"
                      placeholder="aadii"
                      labelPlacement="outside"
                      variant="bordered"
                      name="username"
                      value={username}
                      isDisabled
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2 font-[NetflixR]">
                    <Input
                      type="number"
                      label="Age"
                      labelPlacement="outside"
                      placeholder="Age"
                      variant="bordered"
                      name="age"
                      isRequired
                      value={values.age}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.age && errors.age}
                      color={touched.age && errors.age ? "danger" : "success"}
                      errorMessage={touched.age && errors.age ? errors.age : ""}
                      classNames={{
                        label: "text-[#0a0a0a]",
                      }}
                    />
                  </div>
                  <div className="grid gap-1 font-[NetflixR]">
                    <label className="text-[14px]" htmlFor="gender">
                      Gender <span className="text-[#ef3535]">*</span>
                    </label>
                    <Field
                      as="select"
                      name="gender"
                      value={values.gender}
                      onChange={handleChange}
                      className="h-[38px] rounded-[10px] border-2 text-sm pl-2 font-[NetflixR]"
                    >
                      <option value="" label="Gender" disabled hidden />
                      {Gender.map((gender) => (
                        <option key={gender.value} value={gender.value}>
                          {gender.label}
                        </option>
                      ))}
                    </Field>
                    {errors.gender && touched.gender && (
                      <div
                        className="font-[NetflixL] text-[13px] ml-[6px]"
                        style={{ color: "red" }}
                      >
                        {errors.gender}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-4">
                  <div className="grid gap-1 font-[NetflixR]">
                    <label className="text-[14px]" htmlFor="interest">
                      Pick an Interest <span className="text-[#ef3535]">*</span>
                    </label>
                    <div className="border-2 rounded-[10px] p-2 h-[80px] overflow-y-auto font-[NetflixL]">
                      {myInterests.map((item) => (
                        <label
                          key={item.key}
                          className="text-sm flex items-center"
                        >
                          <input
                            type="checkbox"
                            name="interest"
                            value={item.key}
                            checked={values.interest.includes(item.key)}
                            onChange={(event) => {
                              const selectedValues = [...values.interest];
                              if (event.target.checked) {
                                selectedValues.push(event.target.value);
                              } else {
                                const index = selectedValues.indexOf(
                                  event.target.value
                                );
                                if (index > -1) {
                                  selectedValues.splice(index, 1);
                                }
                              }
                              setFieldValue("interest", selectedValues);
                            }}
                            className="mr-2"
                          />
                          <span>{item.name}</span>
                        </label>
                      ))}
                    </div>
                    {errors.interest && touched.interest && (
                      <div
                        className="font-[NetflixL] text-[13px] ml-[6px]"
                        style={{ color: "red" }}
                      >
                        {errors.interest}
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid gap-2 font-[NetflixR]">
                  <Textarea
                    type="text"
                    label="About"
                    variant="bordered"
                    labelPlacement="outside"
                    placeholder="Describe Yourself"
                    disableAnimation
                    name="about"
                    isRequired
                    disableAutosize
                    value={values.about}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.about && errors.about}
                    color={
                      touched.agaboute && errors.about ? "danger" : "success"
                    }
                    errorMessage={
                      touched.about && errors.about ? errors.about : ""
                    }
                    classNames={{
                      base: "",
                      input: "resize-y min-h-[40px]",
                      label: "text-[#0a0a0a]",
                    }}
                  />
                </div>

                <hr className="w-full border-gray-300 mt-4 mb-4" />

                <CardTitle className="text-xl font-[NetflixB]">
                  Upload Your Photo
                </CardTitle>
                <CardDescription className="font-[NetflixL] mt-[-8px]">
                  This Photo set on your Card
                </CardDescription>

                <div className="grid gap-4">
                  <div className="grid">
                    <div className="max-w-[240px] h-[320px] rounded-[10px] cursor-pointer mx-auto">
                      <Image
                        isZoomed
                        className="h-[320px] w-[240px] object-cover"
                        alt="NextUI Fruit Image with Zoom"
                        src={photoUrl}
                      />
                    </div>
                  </div>
                  <div className="grid gap-2 mt-2 font-[NetflixR]">
                    <Button
                      className="bg-[#e50914] text-white"
                      endContent={<GalleryIcon />}
                      onClick={triggerPictureInput}
                    >
                      <input
                        type="file"
                        id="uploadPicture"
                        className="hidden"
                        accept="image/*"
                        onChange={handlePictureUpload}
                      />
                      Upload Photo
                    </Button>
                  </div>
                </div>

                {isUploadingPhoto && <Spinner size="lg" color="danger" />}

                <hr className="w-full border-gray-300 mt-4 mb-4" />

                <CardTitle className="text-xl font-[NetflixB]">
                  Additional Information
                </CardTitle>
                <CardDescription className="font-[NetflixL] mt-[-8px]">
                  Enter your Address information
                </CardDescription>

                <div className="grid grid-cols-2 gap-4 mt-4">
                  <div className="grid gap-2 font-[NetflixR]">
                    <Select
                      className=""
                      label="Country"
                      variant="bordered"
                      labelPlacement="outside"
                      placeholder="India"
                      isRequired
                      isDisabled
                    >
                      {Country.map((country) => (
                        <SelectItem
                          key={country.key}
                          startContent={country.startContent}
                        >
                          {country.label}
                        </SelectItem>
                      ))}
                    </Select>
                  </div>
                  <div className="grid gap-2 font-[NetflixR]">
                    <Input
                      label="State"
                      type="text"
                      name="address.state"
                      labelPlacement="outside"
                      variant="bordered"
                      isRequired
                      placeholder="State"
                      className=""
                      value={values.address.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.address?.state && errors.address?.state
                      }
                      color={
                        touched.address?.state && errors.address?.state
                          ? "danger"
                          : "success"
                      }
                      errorMessage={
                        touched.address?.state && errors.address?.state
                          ? errors.address?.state
                          : ""
                      }
                      classNames={{
                        label: "text-[#0a0a0a]",
                      }}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2 font-[NetflixR]">
                    <Input
                      label="City"
                      type="text"
                      name="address.city"
                      labelPlacement="outside"
                      variant="bordered"
                      isRequired
                      placeholder="City"
                      className=""
                      value={values.address.city}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={touched.address?.city && errors.address?.city}
                      color={
                        touched.address?.city && errors.address?.city
                          ? "danger"
                          : "success"
                      }
                      errorMessage={
                        touched.address?.city && errors.address?.city
                          ? errors.address?.city
                          : ""
                      }
                      classNames={{
                        label: "text-[#0a0a0a]",
                      }}
                    />
                  </div>
                  <div className="grid gap-2 font-[NetflixR]">
                    <Input
                      type="number"
                      label="Pin Code"
                      labelPlacement="outside"
                      placeholder="Pin Code"
                      variant="bordered"
                      name="address.pincode"
                      isRequired
                      value={values.address.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      isInvalid={
                        touched.address?.pincode && errors.address?.pincode
                      }
                      color={
                        touched.address?.pincode && errors.address?.pincode
                          ? "danger"
                          : "success"
                      }
                      errorMessage={
                        touched.address?.pincode && errors.address?.pincode
                          ? errors.address?.pincode
                          : ""
                      }
                      classNames={{
                        label: "text-[#0a0a0a]",
                      }}
                    />
                  </div>
                </div>

                <Modal
                  size="sm"
                  isOpen={isOpen}
                  onClose={onClose}
                  backdrop="opaque"
                >
                  <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 font-[NetflixB]">
                      Problem While Setting the profile
                    </ModalHeader>
                    <ModalBody className="font-[NetflixL]">
                    <p>Don't worry try again later and we resolve that problem as soon as possible
                    </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onClose} className="font-[NetflixR]">
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Button
                  type="submit"
                  className="w-full font-[NetflixR] text-white bg-[#e50914] hover:bg-[#e64e4e] rounded-[10px]"
                  isLoading={isSubmitting || isLoading}
                  isDisabled={isSubmitting || isLoading}
                >
                  {isLoading ? "Submit..." : "Submit"}
                </Button>
              </div>
            </CardContent>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ProfileForm;
