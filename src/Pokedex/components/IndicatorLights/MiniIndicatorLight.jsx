import useStyles from "../../Pokedex.styles";
import { Circle } from "@mui/icons-material";

function MiniIndicatorLight(props) {
  const classes = useStyles(props);
  return (
    <Circle sx={{ fill: props.color }} className={classes.miniIndicatorLight} />
  );
}

export default MiniIndicatorLight;
