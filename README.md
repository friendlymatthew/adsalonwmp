# About

[`adsalonwmp`](https://adsalonwmp.vercel.app/?market=Portland&station=WPFO&title=DailyMailTV&snippet=be+taking+to+make+the+risks+are+worth+their+rewards+medical+staff+housekeeping+and+that+of+course+--+jesse:+jay+jacobs+the+ceo+of+the+timberlake+family+of+camps+is+talking+about+what+it+takes+to+operate+a+summer+camp+in+the+time+of+covid-19+before+the+recently+announced+new+york+ban+jacobs+had+planned+to+open+some+of+his&coder=eraab&url=covid/xWPFO_20200619_1100PM.mp4&id=4&seek=1357) is an internal video annotation web tool that crowdsources data for the [Wesleyan Media Project](https://mediaproject.wesleyan.edu/).

![release](https://img.shields.io/badge/release-v.0.0.2-blue)

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Usage

For an extensive user guide, please check out the following document:

- [User Guide](https://docs.google.com/document/d/1N5uHkGX4boBQyj82vzMRa_v3SJmHPs_KBj1AEabEao0/edit?usp=sharing)

# Documentation

### Packages

| Package                                                        | NPM                                                                                      |
| -------------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| [`material-ui`](https://mui.com)                               | ![NPM](https://img.shields.io/npm/l/@material-ui/core?label=material-ui%2Fcore&logo=NPM) |
| [`axios`](https://axios-http.com)                              | ![NPM](https://img.shields.io/npm/l/axios?label=axios&logo=NPM)                          |
| [`mongoose`](https://www.npmjs.com/package/mongoose)           | ![NPM](https://img.shields.io/npm/l/mongoose?label=mongoose&logo=NPM)                    |
| [`react-player`](https://www.npmjs.com/package/react-player)   | ![NPM](https://img.shields.io/npm/l/react-player?label=react-player&logo=NPM)            |
| [`typeface-lato`](https://www.npmjs.com/package/typeface-lato) | ![NPM](https://img.shields.io/npm/l/typeface-lato?label=typeface-lato&logo=NPM)          |

### Variables

| Variable    | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| `axios`     | call `axios.post()` to send data to server                                        |
| `query`     | access query params passed through url                                            |
| `reference` | call instance methods on [react-player](https://github.com/cookpete/react-player) |

### States

| State                         | Initial Value | Description                                                    |
| ----------------------------- | ------------- | -------------------------------------------------------------- |
| `start`, `setStart()`         | 00:00:00      | user marked start time in HH:MM:SS                             |
| `startSec`, `setStartSec()`   | 0             | user marked start time in seconds                              |
| `stop`, `setStop()`           | 00:00:00      | user marked stop time in HH:MM:SS                              |
| `stopSec`, `setStopSec()`     | 0             | user marked stop time in seconds                               |
| `pressed`, `setPressed()`     | false         | flag that turns true when user submits data                    |
| `submitted`, `setSubmitted()` | false         | flag that turns true when post request to server is successful |
| `error`, `setError()`         | false         | flag that turns true when server post request to server is bad |
| `resCode`, `setResCode()`     | ""            | server response code                                           |
| `resText, setResText()`       | ""            | server response message                                        |

### Methods

| Method            | Description                                                          |
| ----------------- | -------------------------------------------------------------------- |
| `createClip()`    | async function that posts ClipSchema to server                       |
| `handleSeek()`    | event handler function that seeks to suggested time within video     |
| `handleStart()`   | event handler function that updates `start` and `startSec` variables |
| `handleStop()`    | event handler function that updates `stop` and `stop` variables      |
| `handleSubmit(e)` | event handler function that verifies then calls `createClip()`       |

# Getting Data

We pass in specific values through web parameters within the url. A sample url would be: https://adsalonwmp.vercel.app/?market=Portland&station=WPFO&title=DailyMailTV&snippet=be+taking+to+make+the+risks+are+worth+their+rewards+medical+staff+housekeeping+and+that+of+course+--+jesse:+jay+jacobs+the+ceo+of+the+timberlake+family+of+camps+is+talking+about+what+it+takes+to+operate+a+summer+camp+in+the+time+of+covid-19+before+the+recently+announced+new+york+ban+jacobs+had+planned+to+open+some+of+his&coder=eraab&url=covid/xWPFO_20200619_1100PM.mp4&id=4&seek=1357

Observe each query is organized in a key=value pairing like such:

### Sample

| Key     | Pair                                                   |
| ------- | ------------------------------------------------------ |
| market  | Portland                                               |
| station | WPFO                                                   |
| title   | DailyMailTV                                            |
| snippet | be+taking+to+make+the+risks+are+worth+their+rewards... |
| coder   | eraab                                                  |
| url     | covid/WXPFO_20200619_1100PM.mp4                        |
| id      | 4                                                      |
| seek    | 1357                                                   |

We are able to store each value with our `query.KEY` variable.

### Queries

| Query Key | Variable Name   | Description                                                                                        |
| --------- | --------------- | -------------------------------------------------------------------------------------------------- |
| `market`  | {query.market}  | news market region of specific clip                                                                |
| `station` | {query.station} | news station name airing specific clip                                                             |
| `title`   | {query.title}   | video clip title                                                                                   |
| `snippet` | {query.snippet} | the specific phrase users should be looking to match with video clip and mark start and stop times |
| `coder`   | {query.coder}   | the username of the coder for that specific video assignment                                       |
| `url`     | {query.url}     | video clip url                                                                                     |
| `id`      | {query.id}      | unique video id                                                                                    |
| `seek`    | {query.seek}    | the suggested start time in seconds of where the snippet is said within the video clip             |

# Sending Data

When a coder submits their video assignment, the contents of the submission is stored as a schema with the following variables:

### Clip Schema

| Schema Elements | Type   | Variable         | Source         |
| --------------- | ------ | ---------------- | -------------- |
| `market`        | String | `query.market`   | web url param  |
| `station`       | String | `query.station`  | web url param  |
| `title`         | String | `query.title`    | web url param  |
| `snippet`       | String | `query.snippet`  | web url param  |
| `coder`         | String | `query.coder`    | web url param  |
| `seek`          | String | `query.seek`     | web url param  |
| `dateSubmitted` | String | local variable   | user generated |
| `start`         | Number | `startSec` state | user generated |
| `stop`          | Number | `stopSec` state  | user generated |

### Axios

```javascript
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
```

We call our `axios` variable to post a ClipSchema to our server. We update the `submitted` state if `response.status` is 201. We update the `error` state otherwise.

# HTML Components
<br />
### React Player

React video player component

Props Used
| Prop | Value |
| ---------- | -------------------- |
| `ref` | `reference` variable |
| `url` | `{query.url}` |
| `playing` | true |
| `controls` | true |

```html
<ReactPlayer ref={reference} url={`https://wesmedia.wesleyan.edu/${query.url}`}
playing controls />
```
<br />

### Video Information

Video description component

Variables Used
| Variable |
| ---------- |
| `{query.title}` |
| `{query.station}` |
| `{query.market}` |
| `{query.id}` |
| `{query.snippet}` |

```html
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
```
<br />
### Coder Toolbar
Toolbar for coder actions involving seeking and marking times

Methods Used
| Method |
| ---------- |
| `handleSeek()` |
| `handleStart()` |
| `handleStop()` |

```html
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
```
<br />

### Your Submission
Submission card that presents marked times and submission button

Variables Used
| Variable | 
| -------- |
| `submitted` | 
| `start` | 
| `stop` |

Methods Used
| Method |
| ---------- |
| `handleSeekStart()` |
| `handleSeekStop()` |
| `handleSubmit()` |

```html
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
```

<br />

### Server Response
#### Server response to coder submitting data

Variables Used
| Variable | 
| -------- |
| `pressed` | 
| `submitted` | 
| `error` |
| `resCode` |
| `resText` | 
```html
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
```
