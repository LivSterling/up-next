module.exports = {
  getIndex: (req, res) => {
    res.render("index.ejs");
  },
  getAssistant: (req, res) => {
    res.render("assistant.ejs");
  },
};
