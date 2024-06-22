import React from "react";
import {
  DescriptionText,
  MyLink,
  FieldContainer,
} from "../../../styles/signup";
import { CodeContainer, CodeInput } from "../../../styles/signup/verification";
import { Colors } from "../../../styles/theme";
import { useSignupContext } from "../../../context/signup";
import Loader from "../other/loader";
import { ErrorMessage, ErrorMessageContainer } from "../../../styles/login";
import axios from "axios";
import { useUIContext } from "../../../context/ui";

const Verification = () => {
  const {
    email,
    message,
    setMessage,
    one,
    setOne,
    two,
    setTwo,
    three,
    setThree,
    four,
    setFour,
    progressOpen,
    activateLoader,
    

  } = useSignupContext();

  const {setUserType} = useUIContext();

  const handleInputChange = (event) => {
    const value = event.target.value;
    // Allow only numeric values and limit to 1 character
    if (!/^\d$/.test(value)) {
      event.target.value = value.slice(0, -1);
    }
  };

  const sendVerificationMail = async (email, code) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/mail/student/verify`;
      const { data } = await axios.post(url, { email, code });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const updateVerificationCode = async (Email, Verification_Code) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/db/tempUser`;
      const { data } = await axios.put(url, { Email, Verification_Code });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const addTempUser = async (Email, Verification_Code) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/db/tempUser`;
      const { data } = await axios.post(url, { Email, Verification_Code });
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getTempUser = async (Email) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/db/tempUser/${Email}`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getStudent = async (Email) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/db/student/${Email}`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const getStaff = async (Email) => {
    try {
      const url = `${process.env.REACT_APP_BACKEND_URL}/db/staff/${Email}`;
      const { data } = await axios.get(url);
      return data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleResendVerification = async () => {
    if (email.includes("engug.ruh.ac.lk")) {
      setUserType("Student");
      const code = `${Math.floor(Math.random() * 10)}${Math.floor(
        Math.random() * 10
      )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
      const student = await getStudent(email);
      const tempUser = await getTempUser(email);
      if (!student.length && (!tempUser.length || !tempUser.Verified)) {
        if (!tempUser.length) {
          addTempUser(email, code);
          sendVerificationMail(email, code);
        } else if (tempUser.length && !tempUser.Verified) {
          updateVerificationCode(email, code);
          sendVerificationMail(email, code);
        }
        setMessage("Please check your email for the verification code");
      } else {
        setMessage("Email already exists");
      }
    } else {
      setUserType("Staff");
      const code = `${Math.floor(Math.random() * 10)}${Math.floor(
        Math.random() * 10
      )}${Math.floor(Math.random() * 10)}${Math.floor(Math.random() * 10)}`;
      const staff = await getStaff(email);
      const tempUser = await getTempUser(email);
      if (!staff.length && (!tempUser.length || !tempUser.Verified)) {
        if (!tempUser.length) {
          addTempUser(email, code);
          sendVerificationMail(email, code);
        } else if (tempUser.length && !tempUser.Verified) {
          updateVerificationCode(email, code);
          sendVerificationMail(email, code);
        }
        setMessage("Please check your email for the verification code");
      } else {
        setMessage("Email already exists");
      }
    }
  };

  return (
    <FieldContainer>
      <DescriptionText>
        Please enter the 4-digit code sent to your university email
      </DescriptionText>
      <CodeContainer>
        <CodeInput
          inputProps={{
            style: { fontSize: 30, textAlign: "center" },
            maxLength: 1,
            onInput: handleInputChange,
          }}
          variant="outlined"
          label=""
          sx={{ lineHeight: "1px" }}
          value={one}
          onChange={(e) => setOne(e.target.value)}
        />
        <CodeInput
          inputProps={{
            style: { fontSize: 30, textAlign: "center" },
            maxLength: 1,
            onInput: handleInputChange,
          }}
          variant="outlined"
          label=""
          sx={{ lineHeight: "1px" }}
          value={two}
          onChange={(e) => setTwo(e.target.value)}
        />
        <CodeInput
          inputProps={{
            style: { fontSize: 30, textAlign: "center" },
            maxLength: 1,
            onInput: handleInputChange,
          }}
          variant="outlined"
          label=""
          sx={{ lineHeight: "1px" }}
          value={three}
          onChange={(e) => setThree(e.target.value)}
        />
        <CodeInput
          inputProps={{
            style: { fontSize: 30, textAlign: "center" },
            maxLength: 1,
            onInput: handleInputChange,
          }}
          variant="outlined"
          label=""
          sx={{ lineHeight: "1px" }}
          value={four}
          onChange={(e) => setFour(e.target.value)}
        />
      </CodeContainer>
      <ErrorMessageContainer sx={{ mt: 6, mb: -4 }}>
        {message && <ErrorMessage severity="error">{message}</ErrorMessage>}
      </ErrorMessageContainer>
      <MyLink
        onClick={() => handleResendVerification()}
        color={Colors.dim_grey}
        underline="hover"
      >
        Didn't receive a code? Resend
      </MyLink>
    </FieldContainer>
  );
};

export default Verification;
