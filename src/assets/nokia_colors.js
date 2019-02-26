module.exports = () => {
  return {
    nokia_blue: "#124191",
    nokia_gray_1: "#EDF3F5",
    nokia_gray_2: "#BEC8D2",
    nokia_gray_3: "#98A2AE",
    nokia_gray_4: "#4D5766",
    nokia_gray_5: "#273142",
    nokia_light_blue: "#00C9FF",
    nokia_red: "#FF3154",
    nokia_yellow: "#FFFB00",
    nokia_green: "#4BDD33",
    nokia_orange: "#FF9910",
    grafana_grey: "#F6F7F9",

    primary: () => {
      return this.nokia_blue
    },
    secondary: () => {
      return this.nokia_light_blue
    },
    accent: () => {
      return this.nokia_yellow
    },
    error: () => {
      return this.nokia_red
    },
    warning: () => {
      return this.nokia_yellow
    },
    info: () => {
      return this.nokia_gray_2
    },
    success: () => {
      return this.nokia_green
    }
  }
};