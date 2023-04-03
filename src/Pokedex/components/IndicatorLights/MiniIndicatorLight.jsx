import useStyles from "../../Pokedex.styles";
import { Circle } from "@mui/icons-material";

function MiniIndicatorLight(props) {
  const classes = useStyles(props);
  return (
    <Circle
      sx={{}}
      className={classes.miniIndicatorLight}
      color={props.color}
    />
  );
}

export default MiniIndicatorLight;
