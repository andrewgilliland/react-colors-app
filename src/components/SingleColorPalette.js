import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/styles";

import ColorBox from "./ColorBox";
import Navbar from "./Navbar";
import PaletteFooter from "./PaletteFooter";

import styles from "../styles/PaletteStyles";

const gatherShades = (palette, colorToFilterBy) => {
  let shades = [];
  let allColors = palette.colors;

  for (let key in allColors) {
    shades = shades.concat(
      allColors[key].filter((color) => color.id === colorToFilterBy),
    );
  }

  return shades.slice(1);
};

function SingleColorPalette(props) {
  const { palette, colorId, classes } = props;
  const [format, setFormat] = useState("hex");
  const shades = useMemo(
    () => gatherShades(palette, colorId),
    [palette, colorId],
  );
  const { paletteName, emoji, id } = palette;

  const changeFormat = (val) => {
    setFormat(val);
  };

  const colorBoxes = shades.map((color) => (
    <ColorBox
      key={color.name}
      name={color.name}
      background={color[format]}
      showingFullPalette={false}
    />
  ));

  return (
    <div className={classes.Palette}>
      <Navbar handleChange={changeFormat} showingAllColors={false} />
      <div className={classes.colors}>
        {colorBoxes}
        <div className={classes.goBack}>
          <Link to={`/palette/${id}`}>Go Back</Link>
        </div>
      </div>
      <PaletteFooter paletteName={paletteName} emoji={emoji} />
    </div>
  );
}

export default withStyles(styles)(SingleColorPalette);
