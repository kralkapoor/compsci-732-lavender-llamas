import React from "react";
import styles from "./Heading.module.css";
import { Box } from "@mui/material";

/* This component takes a prop called "title" that will be used as the title
 of all main pages*/
function Heading({ title }) {
  return (
    <React.Fragment>
      <Box >
        <h1 className={styles.title}>{title}</h1>
      </Box>
    </React.Fragment>
  );
}

export default Heading;
