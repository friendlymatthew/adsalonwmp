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
import { Grid, Paper, Typography, Button, Snackbar } from "@material-ui/core";
import MuiAlert from "@material-ui/lab/Alert";
import PostIcon from "@material-ui/icons/Backup";
import DoneIcon from "@material-ui/icons/Done";
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
  const [error, setError] = useState(false);

  //error flag
  const [resCode, setResCode] = useState("");
  const [resText, setResText] = useState("");

  const [pressed, setPressed] = useState(false);

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
    setPressed(true);

    console.log(submitted);

    if (submitted) {
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

    axios
      .post("/api/clips", {
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
      })
      .then(function (response) {
        console.log(response);

        setResCode(response.status);
        setResText(response.statusText);

        if (response.status === 201) {
          console.log("Created!!!");
          setSubmitted(true);
        }

        setError(true);
      });
  };

  //html
  return (
    <ThemeProvider theme={lato}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={12} style={{ marginBottom: "40px" }}>
          <AppBar coder={query.coder} />
        </Grid>

        <Grid item xs={1} md={2}></Grid>
        <Grid item xs={10} md={8} container spacing={0}>
          <Grid
            item
            xs={12}
            md={12}
            style={{ marginTop: "0px", marginBottom: "30px" }}
            container
            spacing={0}
          >
            <Grid item xs={12} md={7}>
              <ReactPlayer
                ref={reference}
                url={`https://wesmedia.wesleyan.edu/${query.url}`}
                playing
                controls
              />
            </Grid>

            <Grid item xs={12} md={5}>
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
                <Paper
                  style={{ marginTop: "15px", backgroundColor: "#252526", padding: "15px"}}
                  elevation={3}
                >
                  <Typography
                    variant="h6"
                    style={{ color: "#FFFFFF" }}
                  >
                    {query.snippet}
                  </Typography>
                </Paper>
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
                borderRadius: "10px",
                border: "1px solid white",
                padding: "25px",
                maxWidth: "600px",
              }}
            >
              <Typography
                variant="h5"
                style={{
                  fontWeight: 600,
                  color: "#FFFFFF",
                  marginBottom: "10px",
                  textAlign: "left",
                }}
              >
                Your Submission
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
                        <DoneIcon
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
                        {submitted ? "Posted" : "Post"}
                      </Typography>
                    </Button>
                  </div>
                </span>
              </div>

              {pressed ? (
                <div style={{ marginTop: "60px" }}>
                  <Typography
                    variant="h5"
                    style={{
                      textAlign: "left",
                      color: "#FFFFFF",
                      fontWeight: 600,
                      marginBottom: "10px",
                    }}
                  >
                    Server Response
                  </Typography>

                  <div>
                    <Typography
                      variant="h6"
                      style={{
                        textAlign: "left",
                        color: submitted
                          ? "#00FF00"
                          : error
                          ? "#EE4B2B"
                          : "#FFFFFF",
                      }}
                    >
                      <div>Status Code: {resCode}</div>
                    </Typography>
                  </div>

                  <div
                    style={{
                      justifyContent: "space-between",
                      display: "flex",
                    }}
                  >
                    <span>
                      <Typography
                        variant="h6"
                        style={{
                          textAlign: "left",
                          color: submitted
                            ? "#00FF00"
                            : error
                            ? "#EE4B2B"
                            : "#FFFFFF",
                        }}
                      >
                        <div>Message: {resText}</div>
                      </Typography>
                    </span>

                    <span>
                      <Typography variant="h6" style={{ color: "#FFFFFF" }}>
                        <a
                          href="https://forms.gle/RVMkHNG8uhqkTvZH6"
                          target="_blank"
                        >
                          Report Issue
                        </a>
                      </Typography>
                    </span>
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>
          </Grid>
        </Grid>

        <Grid item xs={1} md={2}></Grid>
      </Grid>
    </ThemeProvider>
  );
}
