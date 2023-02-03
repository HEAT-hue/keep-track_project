// jshint esversion:6
import { Project } from "./Project";

const baseUrl = 'http://localhost:4000';
const url = `${baseUrl}/projects`;

function tranlsateStatusToErrorMessage(status: number) {
    switch (status) {
        case 401:
            return 'Please login again.';
            
        case 403:
            return 'You do not have permission to view the project(s).';
            
        default:
            return 'There was an error retrieving the project(s). Please try again.';
    }
}

function checkStatus(response: any) {
    console.log("Checking status");
    // Validate server response
    if (response.ok) return response;

    
    console.log("Skipped error status handler!");

    // Generate error report
    const httpErrorInfo = {
        status: response.status,
        statusText: response.statusText,
        url: response.url
    }

    // Log error report to the console
    console.log(`log server http error: ${JSON.stringify(httpErrorInfo)}`);

    // Get corresponding user friendly error message
    let errorMessage = tranlsateStatusToErrorMessage(httpErrorInfo.status)
    
    // throw the error to be handled by provided error handlers
    throw new Error(errorMessage);
}

// Parse response data in JSON
function parseJsonData(response: any) {
    // Get in json format
    return response.json();
}


// Promise.Resolve('some data');

// // eslint-disable-next-line
// function delay(ms: number) {
//     return function(x: any): Promise<any> {
//         return new Promise((resolve) => {
//             return setTimeout(() => {
//                 resolve(x);
//             }, ms);
//         });
//     }
// }

// Create new instances of Project Class
function convertToProjectModels(data: any[]): Project[] {
    let projects: Project[] = data.map((item: any) => {
        return new Project(item);
    });
    return projects;
}

// Create new instance of Project Class
function convertToProjectModel(data: any[]): Project {
    let project: Project = new Project(data);
    return project;
}

// Fetch the data using a query
const projectAPI = {
    get(page = 1, limit = 20): Promise<any> {
        return fetch(`${url}?_page=${page}&_limit=${limit}&_sort=name`)
        .then(checkStatus)
        .then(parseJsonData)
        .then(convertToProjectModels)
        .catch((e: TypeError) => {
            console.log("Error caught");
            console.log(e);
            console.log(e.message);
            // console.log("net::ERR_CONNECTION_REFUSED");
            throw new Error(e.message)
        })
    },
    put(project: Project): Promise<any> {
        return fetch(`${url}/${project.id}`, {
            method: 'PUT',
            body: JSON.stringify(project),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(checkStatus)
        .then(parseJsonData)
        .catch((e: TypeError) => {
            throw new Error(e.message);
        })
    },
    find(id: number): Promise<any> {
        return fetch(`${url}/${id}`)
        .then(checkStatus)
        .then(parseJsonData)
        .then(convertToProjectModel)
        .catch((e: TypeError) => {
            throw new Error(e.message);
        })
    }
}

export {projectAPI};