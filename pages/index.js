import Head from "next/head";
import React, { useState, useEffect, Component, useRef } from "react";
import styles from "../styles/Home.module.css";
import "typeface-lato";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import { Grid, Paper, Typography, Button } from "@material-ui/core";
import AppBar from "../components/AppBar";
import ReactPlayer from "react-player";
import { useRouter } from "next/router";
import VisibilityIcon from "@material-ui/icons/Visibility";
import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import StopIcon from "@material-ui/icons/Stop";
import PostIcon from "@material-ui/icons/Backup";
import DoneOutlineIcon from "@material-ui/icons/DoneOutline";
import fetch from "isomorphic-unfetch";

const scaffold = createTheme({
  palette: {
    primary: {
      main: "#FFFFFF",
    },
    secondary: {
      main: "#000000",
    },
  },
});

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
  const { query } = useRouter();

  const [start, setStart] = useState("00:00:00");
  const [stop, setStop] = useState("00:00:00");
  const [startSec, setStartSec] = useState(0);
  const [stopSec, setStopSec] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitFlag, setSubmitFlag] = useState(false);
  const [errorFlag, setErrorFlag] = useState(false);

  const createClip = async () => {
    if (submitFlag == false) {
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

      console.log(typeof query.market);
      console.log(typeof query.station);
      console.log(typeof query.title);
      console.log(typeof query.snippet);
      console.log(typeof query.coder);
      console.log(typeof query.seek);
      console.log(typeof startSec);
      console.log(dateplusTime);
      console.log(typeof cleanurl);

      try {
        const res = await fetch('/api/clips', {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            videoSrc: cleanurl,
            market: query.market,
            station: query.station,
            title: query.title,
            snippet: query.snippet,
            coder: query.coder,
            seek: query.seek,
            start: { startSec },
            stop: { stopSec },
            dateSubmitted: dateplusTime,
          }),
        });

        setSubmitFlag(true);
        console.log("IT WORKED!")
        console.log(res);
      } catch (error) {
        console.log(error);
        console.log(error);
        setErrorFlag(true);
      }
    } else {
      
    }
  };

  const cleanurl = `https://wesmedia.wesleyan.edu/${query.url}`;

  const reference = useRef();

  const handleStart = () => {
    let seconds = reference.current.getCurrentTime();
    setStartSec(seconds);
    var dateStart = new Date(seconds * 1000).toISOString().substr(11, 8);
    setStart(dateStart);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if(submitFlag) {
      setSubmitted(false);
      return
    }
    setSubmitted(true);
  };

  useEffect(() => {
    if(submitted) {
      createClip();
    }
  })

  const handleStop = () => {
    let seconds = reference.current.getCurrentTime();
    setStopSec(seconds);
    var dateStop = new Date(seconds * 1000).toISOString().substr(11, 8);

    setStop(dateStop);
  };

  const handleSeek = () => {
    reference.current.seekTo(Number(query.seek));
  };

  console.log(query.seek);

  return (
    <ThemeProvider theme={lato}>
      <Grid container spacing={0}>
        <Grid item xs={12} md={12}>
          <AppBar coder={query.coder} />
        </Grid>

        <Grid item xs={1} md={2}></Grid>
        <Grid item xs={10} md={8} container spacing={0}>
          <Grid align="center" xs={12}>
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
                    </span>
                    <span>
                      <Button 
                        variant="outlined"
                        href="https://forms.gle/YnhqokHVsY9SLB1H8"
                      >
                        <Typography variant="h6" style={{ color: "#FFFFFF"}}>Report Issue</Typography>
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
            align="center"
            item
            xs={12}
            md={12}
            style={{ marginTop: "0px" }}
          >
            <div style={{ borderRadius: "10px", padding: "10px" }}>
              <div style={{}}>
                <Typography
                  variant="h4"
                  style={{
                    color: "#FFFFFF",
                    textAlign: "center",
                    fontWeight: 600,
                    marginBottom: "20px",
                  }}
                >
                  <div>
                    From {query.title}, {query.station}, {query.market}
                  </div>
                </Typography>
              </div>

              <div style={{}}>
                <ReactPlayer ref={reference} url={cleanurl} playing controls />
              </div>

              <div
                style={{
                  padding: "10px",
                  maxWidth: "500px",
                  borderRadius: "10px",
                  justifyContent: "space-between",
                  display: "flex",
                }}
              >
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
              </div>
            </div>
          </Grid>

          <Grid
            align="center"
            item
            xs={12}
            md={12}
            style={{ marginTop: "20px" }}
          >
            <div
              style={{
                backgroundColor: submitFlag ? "#3bd16f" : "#000000",
                opacity: 1,
                padding: "10px",
                minWidth: "900px",
              }}
            >
              <div style={{}}>
                <Typography
                  variant="h5"
                  style={{
                    alignText: "left",
                    fontWeight: 600,
                    color: submitFlag ? "#000000" : "#FFFFFF",
                  }}
                >
                  <div style={{ marginTop: "10px", marginBottom: "30px" }}>
                    &quot;{query.snippet}&quot;
                  </div>
                </Typography>
              </div>

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
                >
                  <div
                    style={{ justifyContent: "space-between", display: "flex" }}
                  >
                    <span>
                      <div
                        style={{
                          backgroundColor: "#ee76da",
                          padding: "5px",
                          marginBottom: "8px",
                          width: "250px",
                          maxWidth: "400px",
                        }}
                      >
                        Start: {start}
                      </div>
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
                      <div
                        style={{
                          width: "250px",
                          maxWidth: "400px",
                          backgroundColor: "#b88dfd",
                          padding: "5px",
                        }}
                      >
                        Stop: {stop}
                      </div>
                    </span>
                    <span>
                      <div>
                        {" "}
                        <Button
                          style={{ backgroundColor: "#fce2a1" }}
                          onClick={handleSubmit}
                        >
                          {submitFlag ? (
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
                            variant="h4"
                            style={{ color: "#000000", fontWeight: 600 }}
                          >
                            {submitFlag ? "Done!" : "Submit"}
                          </Typography>
                        </Button>
                      </div>
                    </span>
                  </div>
                </Typography>
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid item xs={1} md={2}></Grid>
      </Grid>
    </ThemeProvider>
  );
}
