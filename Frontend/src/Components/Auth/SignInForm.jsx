import React,{useState} from 'react'
import {useNavigate } from "react-router-dom";
import { Button } from "@nextui-org/react"
import {Input} from "@nextui-org/input";
import { Link } from 'react-router-dom'
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { EyeSlashFilledIcon } from "@/Utils/Icon.jsx";
import { EyeFilledIcon } from "@/Utils/Icon.jsx";
import { desktopImage } from '@/Utils/Data.jsx';
import { useDispatch, useSelector } from "react-redux";
import { signInUser } from "@/Store/userSlice";
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

const SignInForm = () => {
  
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { toast } = useToast();


  const { isLoading } = useSelector((state) => state.userData);
  const { isOpen:isSignInOpen, onOpen:onSignInOpen, onClose:onSignInClose } = useDisclosure();
  const { isOpen:isEmailVerifyOpen, onOpen:onEmailVerifyOpen, onClose:onEmailVerifyClose } = useDisclosure();

  const [isGoogleSignin, setIsGoogleSignin] = useState(false);


  const validationSchema = Yup.object().shape({
    emailId: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm, setErrors }) => {
    try {
      const result = await dispatch(signInUser(values)).unwrap();
      if (result?.success) {
        resetForm();
        toast({
          variant: "outline",
          description: "Sign in Successfully",
          className: "text-white font-[NetflixL] bg-[#00c06a]"
        });
        navigate("/home")
      } else {
        if(result?.message === "User does not exist"){
          setErrors({ emailId: "User does not exist" });
        }else if(result?.message === "Password is incorrect"){
          setErrors({ password: "Password is incorrect" });
        }else if(result?.message === "Please verify your email to log in"){
          onEmailVerifyOpen()
        }else{
          toast({
            variant: "destructive",
            title: "Problem",
            description: "Due to server issue you can't sign in",
            action: <ToastAction altText="Try again">Try again</ToastAction>,
            className: "text-white font-[NetflixL]"
          });
          onSignInOpen()
        }
      }
    } catch (error) {
      if (error.response && error.response.data){
        const { message } = error.response.data;
        if(message === "User does not exist"){
          setErrors({ emailId: "User does not exist" });
        }else if(message === "Password is incorrect"){
          setErrors({ password: "Password is incorrect" });
        }else if(message === "Please verify your email to log in"){
          onEmailVerifyOpen()
        }
      }else{
        toast({
          variant: "destructive",
          title: "Problem",
          description: "Due to server issue you can't sign in",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
          className: "text-white font-[NetflixL]"
        });
        onSignInOpen()
      }
    } finally {
      setSubmitting(false);
    }
  }

  // const handleGoogleSignIn = async () => {
  //   try {

  //   setIsGoogleSignin(true)
  //     window.location.href = `${BACKEND_URL}/user/auth/google`;
  //   } catch (error) {
  //   }
  // };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px] gradd">
      <div className="flex items-center justify-center py-12">
        <Formik
          initialValues={{emailId: "", password: ""}}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
        {({ isSubmitting, handleChange, handleBlur, values, errors, touched }) => (
          <Form>
            <div className="mx-auto mb-20 grid w-[350px] gap-6 font-[NetflixR] ">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-[NetflixB]">Sign In</h1>
                <p className="text-balance text-muted-foreground">Enter your email below to login to your account</p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Input 
                    type="email" 
                    label="Email" 
                    labelPlacement="outside" 
                    placeholder="you@domain.com" 
                    isDisabled={isGoogleSignin}
                    variant="bordered" 
                    name="emailId"
                    value={values.emailId}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.emailId && errors.emailId} 
                    color={touched.emailId && errors.emailId ? "danger" : "success"} 
                    errorMessage={touched.emailId && errors.emailId ? errors.emailId : ""}
                    classNames={{
                      label: "text-[#0a0a0a]",
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <div className="flex items-center">
                    <Link to="/forgotpassword" className="ml-auto mb-[-28px] inline-block text-sm hover:text-[#e50914]">
                      Forgot your password?
                    </Link>
                  </div>
                  <Input 
                    label="Password" 
                    variant="bordered" 
                    placeholder="Enter your password" 
                    labelPlacement="outside" 
                    isDisabled={isGoogleSignin}
                    endContent={
                      <button 
                        className="focus:outline-none" 
                        type="button" onClick={toggleVisibility} 
                        aria-label="toggle password visibility"
                      >
                      {isVisible ? ( 
                        <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                      ) : (
                        <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />)
                      }
                      </button>
                    } 
                    type={isVisible ? "text" : "password"} 
                    name="password"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.password && errors.password}
                    color={touched.password && errors.password ? "danger" : "success"}
                    errorMessage={touched.password && errors.password ? errors.password : ""}
                    classNames={{
                      label: "text-[#0a0a0a]",
                    }}
                  />
                </div>


                <Modal
                  size="sm"
                  isOpen={isSignInOpen}
                  onClose={onSignInClose}
                  backdrop="opaque"
                >
                  <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 font-[NetflixB]">
                      Problem While Sign In the user
                    </ModalHeader>
                    <ModalBody className="font-[NetflixL]">
                    <p>Don't worry! Please wait for a while and try again later. We're working to resolve the issue as quickly as possible so you can log in soon
                    </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onSignInClose} className="font-[NetflixR]">
                        Close
                      </Button>
                    </ModalFooter>
                  </ModalContent>
                </Modal>

                <Modal
                  size="sm"
                  isOpen={isEmailVerifyOpen}
                  onClose={onEmailVerifyClose}
                  backdrop="opaque"
                >
                  <ModalContent>
                    <ModalHeader className="flex flex-col gap-1 font-[NetflixB]">
                      Email is not Verified
                    </ModalHeader>
                    <ModalBody className="font-[NetflixL]">
                    <p>To sign in, you must verify your email first. You won’t be able to sign in until your email is verified.
                    </p>
                    </ModalBody>
                    <ModalFooter>
                      <Button onClick={onEmailVerifyClose} className="font-[NetflixR]">
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
                    Sign In
                  </Button>
                <div className="flex items-center gap-4">
                  <hr className="w-full border-gray-300" />
                  <p className="text-sm text-gray-800 text-center font-[NetflixR]">OR</p>
                  <hr className="w-full border-gray-300" />
                </div>

                {/* <Button variant="bordered" type='submit' onClick={handleGoogleSignIn} className="w-full flex items-center justify-center gap-4 rounded-[10px]">
                  {GoogleSVG}
                  Sign In with Google
                </Button> */}
              </div>
              <div className=" text-center text-sm">
                Don&apos;t have an account?{" "}
                <Link to="/auth" className="underline">Sign up</Link>
              </div>
            </div>
          </Form>
        )}
        </Formik>
      </div>
      <div className="hidden signinimage bg-muted lg:block">
        <img src={desktopImage} className='h-full w-full object-cover'/>
      </div>
    </div>
  )
}

export default SignInForm