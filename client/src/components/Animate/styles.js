import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  shakeX: {
    "&:hover svg": {
      animation: "$headShake 1000ms",
    },
  },
  rotate: {
    "&:hover svg": {
      animation: "$rotateIn 1000ms",
    },
  },

  pulse: {
    "&:hover svg": {
      animation: "$pulse 1000ms",
    },
  },

  rubberBand: {
    "&:hover svg": {
      animation: "$rubberBand 1000ms",
    },
  },

  swing: {
    "&:hover svg": {
      animation: "$swing 1000ms",
    },
  },

  "@keyframes rotateIn": {
    from: {
      transform: "rotate3d(0, 0, 1, -200deg)",
    },

    to: {
      transform: "translate3d(0, 0, 0)",
    },
  },

  "@keyframes headShake": {
    "0%": {
      transform: "translateX(0)",
    },

    "6.5%": {
      transform: " translateX(-6px) rotateY(-9deg)",
    },

    "18.5%": {
      transform: "translateX(5px) rotateY(7deg)",
    },

    "31.5%": {
      transform: "translateX(-3px) rotateY(-5deg)",
    },

    "43.5%": {
      transform: "translateX(2px) rotateY(3deg)",
    },

    "50%": {
      transform: "translateX(0)",
    },
  },
  "@keyframes pulse": {
    from: {
      transform: "scale3d(1, 1, 1)",
    },
    "50%": {
      transform: "scale3d(1.3, 1.3, 1.3)",
    },

    to: {
      transform: "scale3d(1, 1, 1)",
    },
  },

  "@keyframes rubberBand": {
    from: {
      transform: "scale3d(1, 1, 1)",
    },

    "30%": {
      transform: "scale3d(1.25, 0.55, 1)",
    },

    "40%": {
      transform: "scale3d(0.75, 1.25, 1)",
    },

    "50%": {
      transform: "scale3d(1.15, 0.85, 1)",
    },

    "65%": {
      transform: "scale3d(0.95, 1.05, 1)",
    },

    "75%": {
      transform: "scale3d(1.05, 0.95, 1)",
    },

    to: {
      transform: "scale3d(1, 1, 1)",
    },
  },

  "@keyframes swing": {
    "20%": {
      transform: "rotate3d(0, 0, 1, 15deg)",
    },

    "40%": {
      transform: "rotate3d(0, 0, 1, -10deg)",
    },

    "60%": {
      transform: "rotate3d(0, 0, 1, 5deg)",
    },

    "80%": {
      transform: "rotate3d(0, 0, 1, -5deg)",
    },

    to: {
      transform: " rotate3d(0, 0, 1, 0deg)",
    },
  },
}));

export default useStyles;
