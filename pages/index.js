//init
import Head from "next/head";
import styles from "../styles/Home.module.css";

//data
import React, { useState, useEffect, Component, useRef } from "react";
import { useRouter } from "next/router";
import fetch from "isomorphic-unfetch";

//components
import AppBar from "../components/AppBar";
import ReactPlayer from "react-player";

//css
import "typeface-lato";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import PostIcon from "@material-ui/icons/Backup";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";

//loading in custom font
const lato = createTheme({
  typography: {
    fontFamily: ["Lato", "sans-serif"].join(","),
    button: {
      textTransform: "none",
    },
  },
  palette: {
    primary: {
      main: "#1B1811",
    },
    secondary: {
      main: "#2064f4",
    },
  },
});

export default function Home() {
  const axios = require("axios");

  //query variable to get url params
  const { query } = useRouter();

  //state for coder inputted start time in HH:MM:SS
  const [start, setStart] = useState("00:00:00");
  //state for start time in seconds
  const [startSec, setStartSec] = useState(0);

  //state for coder inputted stop time in HH:MM:SS
  const [stop, setStop] = useState("00:00:00");
  //state for stop time in seconds
  const [stopSec, setStopSec] = useState(0);

  //submitted flag
  const [submitted, setSubmitted] = useState(false);
  const [repeat, setRepeat] = useState(false);

  //error flag
  const [resCode, setResCode] = useState(0);
  const [resText, setResText] = useState("");


  const [errorFlag, setErrorFlag] = useState("");

  const reference = useRef();

  useEffect(() => {
    if (submitted) {
      createClip();
    }
  }, [submitted]);

  //function that gets called when pressing the seek button
  const handleSeek = () => {
    reference.current.seekTo(Number(query.seek));
  };

  //function that gets called when pressing the start button
  const handleStart = () => {
    let seconds = reference.current.getCurrentTime();
    setStartSec(seconds);
    var dateStart = new Date(seconds * 1000).toISOString().substr(11, 8);
    setStart(dateStart);
  };

  //function that gets called when pressing the stop button
  const handleStop = () => {
    let seconds = reference.current.getCurrentTime();
    setStopSec(seconds);
    var dateStop = new Date(seconds * 1000).toISOString().substr(11, 8);

    setStop(dateStop);
  };

  const handleSeekStart = () => {
    reference.current.seekTo(Number(startSec));
  };

  const handleSeekStop = () => {
    reference.current.seekTo(Number(stopSec));
  };

  //function that gets called when pressing the submit button
  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(submitted);

    if (submitted) {
      setRepeat(true);
      return;
    }

    createClip();

  };

  //an asynchronous function that posts a ClipSchema to mongoDB
  const createClip = async () => {
    //creating the time of submission
    const today = new Date();

    let date =
      today.getFullYear() +
      "-" +
      (today.getMonth() + 1) +
      "-" +
      today.getDate();

    let time =
      today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

    let dateplusTime = date + " " + time;

    axios.post("/api/clips", {
      videoSrc: `https://wesmedia.wesleyan.edu/${query.url}`,
      market: query.market,
      station: query.station,
      title: query.title,
      snippet: query.snippet,
      coder: query.coder,
      seek: query.seek,
      start: startSec,
      stop: stopSec,
      dateSubmitted: dateplusTime,
    }).then(function (response) {
      console.log(response);

      if(response.status === 201) {
        console.log("Created!!!");
      }
      setResCode(response.status);
      setResText(response.statusText);

    });
  };

  //html
  return (
    <ThemeProvider theme={lato}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={12}>
          <AppBar coder={query.coder} />
        </Grid>

        <Grid item xs={1} md={2}></Grid>
        <Grid item xs={10} md={8} container spacing={0}>
          <Grid item align="center" xs={12}>
            {errorFlag ? (
              <div
                style={{
                  backgroundColor: "#aa3232",
                  padding: "10px",
                  marginTop: "35px",
                  marginBottom: "35px",
                }}
              >
                <Typography
                  variant="h4"
                  style={{
                    color: "#FFFFFF",
                    fontWeight: 600,
                  }}
                >
                  <div
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <span>
                      <div>
                        ERROR! Bad response to server for{" "}
                        {`video_id: ${query.id}`}
                      </div>
                      <div></div>
                    </span>
                    <span>
                      <Button
                        variant="outlined"
                        href="https://forms.gle/YnhqokHVsY9SLB1H8"
                      >
                        <Typography
                          variant="h6"
                          style={{
                            color: "#FFFFFF",
                            fontWeight: 600,
                          }}
                        >
                          Report Issue
                        </Typography>
                      </Button>
                    </span>
                  </div>
                </Typography>
              </div>
            ) : (
              ""
            )}
          </Grid>

          <Grid
            item
            xs={12}
            md={12}
            style={{ marginTop: "0px" }}
            container
            spacing={0}
          >
            <Grid item xs={7}>
              <ReactPlayer
                ref={reference}
                url={`https://wesmedia.wesleyan.edu/${query.url}`}
                playing
                controls
              />
            </Grid>

            <Grid item xs={5}>
              <div>
                <Typography
                  variant="h6"
                  style={{ color: "#FFFFFF", fontWeight: 600 }}
                >
                  From {query.title}, {query.station}, {query.market}
                </Typography>
                <Typography style={{ color: "#FFFFFF" }}>
                  video_id: {query.id}
                </Typography>
                <Typography
                  variant="h6"
                  style={{ marginTop: "15px", color: "#FFFFFF" }}
                >
                  {query.snippet}
                </Typography>
              </div>

              <div
                style={{
                  padding: "10px",
                  justifyContent: "space-between",
                  maxWidth: "500px",
                  display: "flex",
                  marginTop: "10px",
                }}
              >
                <span>
                  <Button
                    style={{ backgroundColor: "#04dbfb" }}
                    onClick={handleSeek}
                  >
                    <VisibilityIcon style={{ marginRight: "8px" }} />
                    <Typography
                      variant="h5"
                      style={{ fontWeight: 600, color: "#000000" }}
                    >
                      Seek
                    </Typography>
                  </Button>
                </span>

                <span>
                  <Button
                    style={{ backgroundColor: "#ee76da" }}
                    onClick={handleStart}
                  >
                    <PlayArrowIcon style={{ marginRight: "8px" }} />
                    <Typography
                      variant="h5"
                      style={{ fontWeight: 600, color: "#000000" }}
                    >
                      Mark Start
                    </Typography>
                  </Button>
                </span>

                <span>
                  <Button
                    style={{ backgroundColor: "#b88dfd" }}
                    onClick={handleStop}
                  >
                    <StopIcon style={{ marginRight: "8px" }} />
                    <Typography
                      variant="h5"
                      style={{ fontWeight: 600, color: "#000000" }}
                    >
                      Mark Stop
                    </Typography>
                  </Button>
                </span>
              </div>
            </Grid>
          </Grid>

          <Grid
            item
            align="center"
            xs={12}
            md={12}
            style={{ marginTop: "20px" }}
          >
            <div
              style={{
                height: "300px",
                borderRadius: "10px",
                border: "1px solid white",
                padding: "20px",
                maxWidth: "600px",
              }}
            >
              <Typography
                variant="h6"
                style={{
                  fontWeight: 600,
                  color: "#FFFFFF",
                  marginBottom: "50px",
                  textAlign: "left",
                }}
              >
                Status
              </Typography>

              <div style={{ justifyContent: "space-between", display: "flex" }}>
                <span>
                  <Button
                    style={{
                      backgroundColor: "#ee76da",
                      padding: "5px",
                      marginBottom: "8px",
                      width: "200px",
                    }}
                    onClick={handleSeekStart}
                  >
                    <Typography variant="h5" style={{ fontWeight: 600 }}>
                      Start: {start}
                    </Typography>
                  </Button>
                </span>
                <span></span>
              </div>

              <div
                style={{
                  justifyContent: "space-between",
                  display: "flex",
                  marginBottom: "8px",
                }}
              >
                <span>
                  <Button
                    style={{
                      width: "200px",
                      backgroundColor: "#b88dfd",
                      padding: "5px",
                    }}
                    onClick={handleSeekStop}
                  >
                    <Typography variant="h5" style={{ fontWeight: 600 }}>
                      Stop: {stop}
                    </Typography>
                  </Button>
                </span>
                <span>
                  <div>
                    {" "}
                    <Button
                      style={{ backgroundColor: "#fce2a1" }}
                      onClick={handleSubmit}
                    >
                      {submitted ? (
                        <DoneOutlineIcon
                          fontSize="large"
                          style={{ color: "#000000", marginRight: "10px" }}
                        />
                      ) : (
                        <PostIcon
                          fontSize="large"
                          style={{ color: "#000000", marginRight: "10px" }}
                        />
                      )}
                      <Typography
                        variant="h5"
                        style={{ color: "#000000", fontWeight: 600 }}
                      >
                        {submitted ? "Done!" : "Submit"}
                      </Typography>
                    </Button>
                  </div>
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: submitted ? "#3bd16f" : "#000000",
                opacity: 1,
                padding: "10px",
                minWidth: "900px",
              }}
            >
              <div
                style={{
                  padding: "10px",
                  borderRadius: "10px",
                  maxWidth: "500px",
                }}
              >
                <Typography
                  variant="h4"
                  style={{ color: "#000000", fontWeight: 600 }}
                ></Typography>
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid item xs={1} md={2}></Grid>
      </Grid>
    </ThemeProvider>
  );
}
