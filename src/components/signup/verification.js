import React from "react";
import { DescriptionText, MyLink, FieldContainer } from "../../styles/signup";
import { CodeContainer, CodeInput } from "../../styles/signup/verification";
import { Colors } from "../../styles/theme";

const Verification = () => {
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
        />
      </CodeContainer>
      <MyLink href="#" color={Colors.dim_grey} underline="hover">
        Didn't receive a code? Resend
      </MyLink>
    </FieldContainer>
  );
};

export default Verification;
