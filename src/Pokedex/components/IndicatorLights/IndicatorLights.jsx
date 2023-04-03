// import React, { useState, useEffect } from "react";
import useStyles from "../../Pokedex.styles";
import MiniIndicatorLight from "./MiniIndicatorLight";
import { Circle } from "@mui/icons-material";

function IndicatorLights({ shouldFlashIndicator }) {
  const classes = useStyles();

  return (
    <div className={classes.indicatorLightsContainer}>
      <Circle
        sx={{}}
        className={classes.mainIndicatorLight}
        style={{
          color: shouldFlashIndicator ? "#99FFFF" : "#00BFFF",
          transition: "color 0.25s ease-in-out",
        }}
      />

      <div className={classes.miniIndicatorLightsContainer}>
        <MiniIndicatorLight color="red" />
        <MiniIndicatorLight color="yellow" />
        <MiniIndicatorLight color="chartreuse" />
      </div>
    </div>
  );
}

export default IndicatorLights;
