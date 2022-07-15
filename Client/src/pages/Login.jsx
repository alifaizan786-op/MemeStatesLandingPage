import React from "react";
import LoginForm from "../components/LoginForm";
import {Box, TextField, FormControlLabel, Checkbox  } from "@mui/material";

export default function Login() {
  return (
    <section
      className="cta-one"
      style={{ height: "100vh", width: "100vw", display: "flex" }}
    >
      <span className="banner-one__shape-1">Meme</span>
      <span className="banner-one__shape-2">Meme</span>
      <span className="banner-one__shape-3">Meme</span>
      <span className="banner-one__shape-4">Meme</span>
      <span className="banner-one__shape-5">Meme</span>
      <Box sx={{ width:"100vw",height:"60vh", display:"flex", justifyContent:"space-evenly"}}>
        <Box sx={{width:"40%", margin:"275px 0px", height: "75vh" }}>
          <div className="banner-one__content">
            <h3 className="banner-one__title">
              Tired Of Personal <br />
              Posts .... <br />
              <span>Why not !?</span> <br /> Just Memes !
            </h3>
            <p className="banner-one__text">
              We are committed to providing you with just <br />{" "}
              <strong>Just High Quality Memes</strong> <br /> From the Best
              Memers Out There.
            </p>
          </div>
        </Box>
        <Box sx={{width:"25%", margin:"175px 0px", height: "50vh"}}>
          <div style={{backgroundColor:"#FAFAFA", display:"flex",flexDirection:"column", justifyContent:"center", borderRadius:"2rem", padding:"2rem 5rem", zIndex:3, alignItems:"center"}}>
            <h3 style={{color:"#2a2833", fontWeight:"200", fontSize:"75px", letterSpacing:"-0.06em", textAlign:"center"}}>
              Sign Up
            </h3>
            <TextField id="demo-helper-text-misaligned-no-helper" label="Username*" sx={{marginTop:"1rem",height:"50px",width:"400px", backgroundColor:"White", backgroundColor:"White"}}/>
            <TextField id="demo-helper-text-misaligned-no-helper" label="Email*" sx={{marginTop:"1rem",height:"50px",width:"400px", backgroundColor:"White"}}/>
            <TextField id="demo-helper-text-misaligned-no-helper" label="Password*" sx={{marginTop:"1rem",height:"50px",width:"400px", backgroundColor:"White"}}/>
            <TextField id="demo-helper-text-misaligned-no-helper" label="First Name*" sx={{marginTop:"1rem",height:"50px",width:"400px", backgroundColor:"White"}}/>
            <TextField id="demo-helper-text-misaligned-no-helper" label="Last Name*" sx={{marginTop:"1rem",height:"50px",width:"400px", backgroundColor:"White"}}/>
            <TextField id="demo-helper-text-misaligned-no-helper" label="Date Of Birth*" sx={{marginTop:"1rem",height:"50px",width:"400px", backgroundColor:"White"}}/>
            <FormControlLabel control={<Checkbox defaultChecked />} label="By signing up, you agree to our Terms , Data Policy and Cookies Policy ." sx={{marginTop:"0.5rem"}}/>
            <a href="#none" className="banner-one__btn thm-btn" style={{margin:"auto", marginTop:"0.5rem"}}>
              <span>Sign Up !</span>
            </a>
          </div>
        </Box>
      </Box>
    </section>
  );
}

// username
// email
// password
// profilePic
// firstName
// lastName
// dateOfBirth
// description
// followers
// score
