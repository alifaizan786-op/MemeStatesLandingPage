import React from "react";
import data from "./data.json";
import Avatar from '@mui/material/Avatar';
import { margin } from "@mui/system";

export default function Vote() {
  console.log(data.data.users);
  return (
    <div style={{ margin: "15rem 0rem 0rem 2rem" }}>
      <h1 className="banner-one__title">Vote</h1>
      <div style={{ 
            margin: "1rem",
            display: "flex",
            flexWrap: "wrap",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
       }}>
      {data.data.users.map((user)=>(
        <div
        style={{
          minHeight: "250px",
          maxHeight: "250px",
          minWidth: "250px",
          maxWidth: "250px",
          boxShadow:
            "inset -8px -8px 17px #d6d6d6,inset 8px 8px 17px #ffffff",
          borderRadius: "25px",
          background: "#e0e0e0",
          display:"flex",
          flexDirection:"column",
          justifyContent:"space-evenly",
          alignItems:"center",
          flexWrap:"wrap",
          margin:"1rem"

        }}
      >
        <Avatar
          src={user.profilePic}
          sx={{ width: 100, height: 100 }}
        />
        <h1>
          {user.username}
        </h1>
        <a href="#none" className="banner-one__btn thm-btn">
            <span>Vote</span>
          </a>
      </div>

      ))}
        
      </div>
    </div>
  );
}
