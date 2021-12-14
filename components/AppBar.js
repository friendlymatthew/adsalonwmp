//react
import React from "react";

//mui
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import FingerprintIcon from "@material-ui/icons/Fingerprint";
import { IconButton } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
}));

//props passes in query.coder from index.js

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6">
            {props.coder}&apos;s workspace
          </Typography>

          <IconButton>
            <a href="https://github.com/matthewkim0/adsalonwmp" target="_blank">
              <FingerprintIcon
                fontSize="large"
                style={{ color: "#FFFFFF", marginRight: "10px" }}
              />
            </a>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
