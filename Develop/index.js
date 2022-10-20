const inquirer = require("inquirer");
const fs = require("fs");
const generateMarkdown = require("./utils/generateMarkdown");

// Writes readme
function writeToFile(fileName, data) {
    fs.writeFile(fileName + ".md", data, (err) => {
        if (err) {
            console.log("Error")
        } else {
            console.log("Success!")
        }
    })
}

// Starts the app.
function init() {
    inquirer.prompt([
        {
            name: "projName",
            message: "What is the name of this project? ",
            type: "input"
        },
        {
            name: "projDesc",
            message: "What is a good description of this project? ",
            type: "input"
        },
        {
            name: "projInst",
            message: "What is the installation process for new users? ",
            type: "input"
        },
        {
            name: "projUse",
            message: "How should users use this app? ",
            type: "input"
        },
        {
            name: "projLicen",
            message: "How is this project licensed? ",
            type: "list",
            choices: ["MIT", "Apache 2.0", "GPL 3.0", "Unlicensed", "Other"],
            default: "Unlicensed"
        },
        {
            name: "projIssue",
            message: "What should users do when they encounter an issue? ",
            type: "input"
        },
        {
            name: "projCont",
            message: "How can users contribute to your project? ",
            type: "input"
        },
        {
            name: "projTest",
            message: "What tests have been implemented for your project? ",
            type: "input"
        },
        {
            name: "projQue",
            message: "Where can users direct their questions? ",
            type: "input"
        },
]).then((response) => {
    // Determines appropriate license badge.
    let badgeURL;
    switch (response.projLicen) {
        case "MIT":
            badgeURL = "https://img.shields.io/badge/License-MIT-red"
            licenseURL = "https://opensource.org/licenses/MIT"
            break;
        case "Apache 2.0":
            badgeURL = "https://img.shields.io/badge/License-Apache%202.0-red"
            licenseURL = "https://opensource.org/licenses/Apache-2.0"
            break;
        case "GPL 3.0":
            badgeURL = "https://img.shields.io/badge/License-GPL%203.0-red"
            licenseURL = "https://opensource.org/licenses/GPL-3.0"
            break;
        case "Unlicensesd":
            badgeURL = "https://img.shields.io/badge/-Unlicensed-red"
            licenseURL = "https://opensource.org/licenses"
            break;
        case "Other":
            badgeURL = "https://img.shields.io/badge/-See%20License%20Section-red"
            licenseURL = "https://opensource.org/licenses"
            break;
    }
    // Creates README
    writeToFile("README-" + response.projName, `
# ${response.projName}

![license badge](${badgeURL})

## Description
    
${response.projDesc}

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [License](#license) 
- [Reporting Issues](#issues) 
- [Contributions](#contributions) 
- [Tests](#tests) 
- [Questions](#questions) 

## Installation
    
${response.projInst}

## Usage
    
${response.projUse}

## License

This program is covered under the [${response.projLicen}](${licenseURL}) license.
    
## Issues
    
${response.projIssue}
    
## Contributions
    
${response.projCont}

## Tests

${response.projTest}

## Questions

${response.projQue}`
);});}

// Function call to initialize app
init();
