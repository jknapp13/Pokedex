import useStyles from "../../Pokedex.styles";
import MiniIndicatorLight from "./MiniIndicatorLight";
import { Circle } from "@mui/icons-material";

function IndicatorLights(props) {
  const classes = useStyles();
  return (
    <div className={classes.indicatorLightsContainer}>
      <Circle sx={{}} className={classes.mainIndicatorLight} />
      <div className={classes.miniIndicatorLightsContainer}>
        <MiniIndicatorLight color="red" />
        <MiniIndicatorLight color="yellow" />
        <MiniIndicatorLight color="chartreuse" />
      </div>
    </div>
  );
}

export default IndicatorLights;
