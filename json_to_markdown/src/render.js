mustache = require([process.cwd(), 'node_modules', 'mustache'].join('/'));

fs = require('fs');

var readedFileCount = 0;
var TOTAL_FILES_TO_READ = 5;

var dataTemplateProject;
var dataTemplateEducation;
var dataTemplateLanguage;
var dataTemplateOthers;
var dataJsonStr;
var dataJson;

fs.readFile('src/others.html', 'utf8', function (err, fileContent) {
    
    if (err) {
        return console.log(err);
    }
    readedFileCount++;
    dataTemplateOthers = fileContent;

    compilePages();
});

fs.readFile('src/projects.html', 'utf8', function (err, fileContent) {
    
    if (err) {
        return console.log(err);
    }
    readedFileCount++;
    dataTemplateProject = fileContent;

    compilePages();
});

fs.readFile('src/education.html', 'utf8', function (err, fileContent) {
    
    if (err) {
        return console.log(err);
    }
    readedFileCount++;
    dataTemplateEducation = fileContent;

    compilePages();
});

fs.readFile('src/languages.html', 'utf8', function (err, fileContent) {
    
    if (err) {
        return console.log(err);
    }
    readedFileCount++;
    dataTemplateLanguage = fileContent;

    compilePages();
});

fs.readFile('src/data.json', 'utf8', function (err, fileContent) {
    
    if (err) {
        return console.log(err);
    }
    readedFileCount++;
    dataJsonStr = fileContent;

    compilePages();
});

function compilePages(){

    if(readedFileCount != TOTAL_FILES_TO_READ){
        return;
    }

    dataJson = JSON.parse(dataJsonStr);

    // adding indexes for projects and companies
    for (let companyIndex = 0; companyIndex < dataJson.companyList.length; companyIndex++) {
        let company = dataJson.companyList[companyIndex];
        let humanReadableCompanyIndex = companyIndex+1
        company.index = humanReadableCompanyIndex;
        for (let projectIndex = 0; projectIndex < company.projectList.length; projectIndex++) {
            let project = company.projectList[projectIndex];
            let humanReadableProjectIndex = projectIndex+1;
            project.index = humanReadableCompanyIndex + "." + humanReadableProjectIndex;
        }
    }

    mustache.escape = function (text) { return text; };

    renderPage(dataTemplateProject, "projects");
    renderPage(dataTemplateEducation, "education");
    renderPage(dataTemplateLanguage, "languages");
    renderPage(dataTemplateOthers, "others");
}

function renderPage(dataTemplate, file){

    var renderedPage = mustache.render(dataTemplate, dataJson);

    fs.writeFile('./../docs/' + file + '.md', renderedPage, function (err) {
        if (err) return console.log(err);
    });
}
