import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { verifyEmail } from "@/Store/userSlice";
import { Link } from "react-router-dom";
import SmallFooter from "./SmallFooter";
import { Button } from "@nextui-org/react";
import { Logo } from "@/Utils/Data";
import { EmailIcon } from "@/Utils/Data";
import "../../Styles/VerifyEmail.css";
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

const VerifyEmail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();


  const { isOpen:isverifyfirstOpen, onOpen:onverifyfirstOpen, onClose:onverifyfirstClose } = useDisclosure();

  const { isEmailVerified, isLoading, user } = useSelector(
    (state) => state.userData
  );
  const emaill = user?.data?.user?.emailId || user?.data?.emailId || "you@domain.com";

  const handleSubmit = async () => {
    try {
      const result = await dispatch(verifyEmail()).unwrap();
      if (result?.success && result.isEmailVerified) {
        navigate("/setprofile");
      } else {
        onverifyfirstOpen()
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Something went wrong.",
        description: "There was a problem with your request due to server issue",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
        className: "text-white font-[NetflixL]"
      });
    }
  };

  useEffect(() => {
    if (isEmailVerified) {
      navigate("/setprofile");
    }
  }, [isEmailVerified, navigate]);

  return (
    <div className="basicLayout notMobile modernInApp hasLargeTypography signupSimplicity-registration simplicity">
      <div className="nfHeader noBorderHeader signupBasicHeader onboarding-header">
        <Link className="svg-nfLogo signupBasicHeader onboarding-header" to="/">
          <img className="svg-icon svg-icon-netflix-logo" src={Logo} />
        </Link>
        <Link
          className="authLinks signupBasicHeader onboarding-header]"
          to="/signin"
        >
          <Button
            className="h-[30px] rounded-[8px] sm:h-[40px] border-1 border-solid border-white bg-[#e50914] hover:bg-[#e64e4e]
       text-white font-[NetflixR]"
          >
            Sign In
          </Button>
        </Link>
      </div>
      <div className="simpleContainer gradd">
        <div className="centerContainer emailVerified firstLoad">
          <div className="emailVerificationContainer">
            <div>
              <div className="emailVerificationLogo">{EmailIcon}</div>
            </div>
            <div>
              <div className="stepHeader">
                <span className="stepIndicator font-[NetflixL] text-[#888]">
                  MANDATORY PROCESS
                </span>
              </div>
            </div>
            <h1 className="verifiedHeader font-[NetflixM]">
              Great! Now verify your email
            </h1>

            <div className="subheader">
              <span className="font-[NetflixR]">
                Click the link we sent to <b>{emaill}</b> to verify.
                <br></br>
                <br></br>
                Verifying your email is neccessary otherwise you can't access
                Amigo user it's important for Amigo Inc.
              </span>
            </div>

            {!isEmailVerified && (
              <Modal
                size="sm"
                isOpen={isverifyfirstOpen}
                onClose={onverifyfirstClose}
                backdrop="opaque"
              >
                <ModalContent>
                  <ModalHeader className="flex flex-col gap-1 font-[NetflixB]">
                    Verify your Email
                  </ModalHeader>
                  <ModalBody className="font-[NetflixL]">
                    <p>
                      We have sent you an email to your <b>{emaill}</b>. Please
                      verify it first before proceeding to the next step. Verify link is only active for 10 minutes.
                    </p>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onverifyfirstClose} className="font-[NetflixR]">
                      Close
                    </Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
            )}

            <div className="btnContainer">
              <Button
                color="primary"
                onClick={handleSubmit}
                isDisabled={isLoading}
                className="h-[50px] font-[NetflixR] bg-[#e50914] cursor-pointer"
              >
                {isLoading ? "Verifying..." : "Next"}
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-24">
        <SmallFooter
          colorfooter={"bg-[#f3f3f3]"}
          coptextcol={"text-black"}
          acol={"text-[#888]"}
          hacol={"hover:text-[#111]"}
        />
      </div>
    </div>
  );
};

export default VerifyEmail;
