const colors = {
  primary: "#a6d1ff",
  secondary: "#ff4f64",
  tertiary: "#fff29d",
  accent: "#a4e4b6",
  darkRed: "#C0404F"
};

const button = {
  color: colors.tertiary,
  stroke: colors.secondary,
  strokeWeight: 3,
  textFont: "Pixelify Sans",
  textColor: colors.secondary
}

const buttonL = {
  ...button,
  width: 300,
  height: 75,
  textSize: 32,
};


const buttonS = {
  ...button,
  width: 100,
  height: 40,
  textSize: 20,
  strokeWeight: 3,
};

export { colors, buttonL, buttonS };
