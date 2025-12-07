module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#6B21A8", // Purple
        secondary: "#D6C7A1", // Chacus/Earthy
      },
    },
  },
  plugins: [require("daisyui")],
};
