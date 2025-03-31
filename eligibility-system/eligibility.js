module.exports = {
  determineEligibility: (answers) => {
    const programs = [];
    const ineligibleNotes = [];

    // Employment-based programs
    if (["a", "b"].includes(answers.employment)) {
      programs.push("Employment Support Program");
      programs.push("Mobility/Relocation Program");
      programs.push("Employment Maintenance Program");
      if (answers.employer === "a") {
        programs.push("Skills Laddering Program");
      } else {
        ineligibleNotes.push("You could qualify for Skills Laddering Program if you find an employer.");
      }
    }

    // Unemployed/underemployed programs
    if (answers.employment === "c" || answers.underemployed === "a") {
      programs.push("Skills Enhancement Program");
      programs.push("Targeted Wage Subsidy Program");
      if (answers.ei === "a" && answers.employer === "a") {
        programs.push("Job Creation Program");
      } else if (answers.ei === "a" && answers.employer === "b") {
        ineligibleNotes.push("You could qualify for Job Creation Program if you find an employer.");
      }
    }

    // Student programs
    if (answers.employment === "d") {
      programs.push("Student Supports");
      if (answers.employer === "a") {
        programs.push("Student Part-Time Job Program");
      } else {
        ineligibleNotes.push("You could qualify for Student Part-Time Job Program if you find an employer.");
      }
    }

    // Age-based education programs
    if (answers.education === "a") {
      if (answers.age === "b") {
        programs.push("Adult education supports through the school board");
      } else if (answers.age === "c") {
        programs.push("Sagamok's own adult education supports");
      }
    }

    return { programs, ineligibleNotes };
  }
};