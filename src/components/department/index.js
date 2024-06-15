import React, { useEffect, useState } from "react";
import { useUIContext } from "../../context/ui";
import {
  DepartmentContainer,
  DepartmentHeader,
  FullDivider,
  NoStaffText,
  Searchbar,
  StaffContainer,
  StaffScrollContainer,
} from "../../styles/department";
import StaffCard from "./staffCard";
import { Grid } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import RightArrow from "./rightArrow";
import LeftArrow from "./leftArrow";
import { Circle } from "@mui/icons-material";
import { Colors } from "../../styles/theme";

const Department = () => {
  const { staffList, department } = useUIContext();
  const [departmentName, setDepartmentName] = useState("");
  const [name, setName] = useState("");
  const [displayStaff, setDisplayStaff] = useState([]);

  useEffect(() => {
    setDisplayStaff(staffList);
  }, [staffList]);

  const getDepartmentName = () => {
    if (department === "DEIE") {
      setDepartmentName("Department of Electrical and Information Engineering");
    } else if (department === "DCEE") {
      setDepartmentName("Department of Civil and Environmental Engineering");
    } else if (department === "DMME") {
      setDepartmentName(
        "Department of Mechanical and Manufacturing Engineering"
      );
    } else if (department === "MENA") {
      setDepartmentName("Marine Engineering and Naval Architecture");
    } else if (department === "Computer") {
      setDepartmentName("Department of Computer Engineering");
    }
  };

  const filterStaff = (e) => {
    const filteredStaff = staffList.filter((staff) => {
      return `${staff.First_name.toLowerCase()} ${staff.Last_name.toLowerCase()}`.includes(
        name.toLowerCase()
      );
    });
    setDisplayStaff(filteredStaff);
  }


  useEffect(() => {
    filterStaff();
  }, [name]);
  

  useEffect(() => {
    getDepartmentName();
  }, [department]);

  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <Circle sx={{fontSize: 10, mb: 5, color: Colors.dim_grey}}/>
        </a>
      );
    },
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    nextArrow: <RightArrow />,
    prevArrow: <LeftArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <DepartmentContainer>
      <DepartmentHeader variant="h4">{departmentName}</DepartmentHeader>
      <Searchbar onChange={(e) => setName(e.target.value)} value={name} label="Search Staff" placeholder="Enter lecturer's name" />
      {/* <FullDivider /> */}
      {staffList.length === 0 && <NoStaffText>No Staff Found</NoStaffText>}
      <StaffContainer>
        <Slider {...settings}>
          {displayStaff.map((staff) => (
            <StaffScrollContainer style={{}} key={staff.Email}>
              <StaffCard staff={staff} />
            </StaffScrollContainer>
          ))}
        </Slider>
      </StaffContainer>
    </DepartmentContainer>
  );
};

export default Department;
