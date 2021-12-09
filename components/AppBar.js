import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

//props passes in query.coder from index.js

export default function ButtonAppBar(props) {
  const classes = useStyles();

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Grid container spacing={0}>
            <Grid item xs={6} align="left">
              <div
                style={{
                  justifyContent: "space-between",
                  display:"flex",
                }}
              >
                <span>
                <Typography variant="h6">
                  {props.coder}&apos;s workspace
                </Typography>
                </span>
              </div>
            </Grid>
            <Grid item xs={6} align="right">
              <a href="https://7qt38cvfvcr.typeform.com/to/YczHqonc">
                <Button style={{ backgroundColor: "#b680f3" }}>
                  <Typography variant="h6" style={{ fontWeight: 600 }}>
                    Offer Feedback
                  </Typography>
                </Button>
              </a>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </div>
  );
}
