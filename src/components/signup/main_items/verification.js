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

const Verification = () => {
  const { message, one, setOne, two, setTwo, three, setThree, four, setFour, progressOpen } =
    useSignupContext();

  const handleInputChange = (event) => {
    const value = event.target.value;
    // Allow only numeric values and limit to 1 character
    if (!/^\d$/.test(value)) {
      event.target.value = value.slice(0, -1);
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
      <MyLink href="#" color={Colors.dim_grey} underline="hover">
        Didn't receive a code? Resend
      </MyLink>
    </FieldContainer>
  );
};

export default Verification;
