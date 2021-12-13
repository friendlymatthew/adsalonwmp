## About

`adsalonwmp` is an internal video annotation web tool that crowdsources data for the [Wesleyan Media Project](https://mediaproject.wesleyan.edu/).



This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Usage

For an extensive user guide, please check out the following documents:

- [User Guide](https://docs.google.com/document/d/1N5uHkGX4boBQyj82vzMRa_v3SJmHPs_KBj1AEabEao0/edit?usp=sharing) - learn how to navigate the tool



## Documentation

- [For Devs](https://docs.google.com/document/d/1z_uooKfthy-TI4LMEwd2Sj5CkCwCkRZJSUHF08o2_3E/edit?usp=sharing) - learn more about AdSalon features

### Packages
[material-ui]

| Package     |                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| [`material-ui`](https://mui.com) | - /core - /icons - /lab                   |
| `axios`     |                                            |
| `mongoose` | |
| `react-player` | |
| `typeface-lato` | | 


### Variables

| Variable    | Description                                                                       |
| ----------- | --------------------------------------------------------------------------------- |
| `axios`     | call instance method `axios.post()` to send data to server                        |
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

## HTML Components

### React Player

```html
<ReactPlayer ref={reference} url={`https://wesmedia.wesleyan.edu/${query.url}`}
playing controls />
```

### Video Information

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

### Coder Toolbar

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

### Your Submission

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

### Server Response

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
