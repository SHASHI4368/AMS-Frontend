import React from "react";
import { useUIContext } from "../../context/ui";
import StudentProfile from "./student/studentProfile";
import StaffProfile from "./staff/staffProfile";
import { ProfileContainer, ProfilePaper } from "../../styles/profile";

const Profile = () => {
  const { userType } = useUIContext();
  return (
    <ProfileContainer>
      <ProfilePaper>
        {userType === "Student" ? <StudentProfile /> : <StaffProfile />}
      </ProfilePaper>
    </ProfileContainer>
  );
};

export default Profile;
