const express = require("express");
const path = require("path");
const eligibility = require("./eligibility");

const app = express();
app.use(express.urlencoded({ extended: true }));

// Configure view engine
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

// Routes
app.get("/", (req, res) => res.render("index"));
app.post("/submit", (req, res) => {
  const { employment, age, education, ei, underemployed, employer } = req.body;
  const results = eligibility.determineEligibility({
    employment,
    age,
    education,
    ei,
    underemployed,
    employer,
  });
  // Pass only the results object with default empty arrays
  // Ensure results has proper structure
  if (!results.programs) results.programs = [];
  if (!results.ineligibleNotes) results.ineligibleNotes = [];
  
  res.render("results", { results });
});

app.listen(8000, () => console.log("Server running on port 8000"));