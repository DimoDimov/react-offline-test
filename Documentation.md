# React GB Electricity National Grid Demand and Output

## worth reading

This Documentation describes the solution of the original problem, the main
points of the resolution and the motivation behind going for each particular way.

-   to install the dependencies 'npm i'
-   to run the application 'npm start' and open the browser on localhost:8080
-   to run the automated tests 'npm test'

## Solution of the original problem

## 1. The solution breakdown

A responsive, colorful and user friendly solution has been delivered.

1.1 reusable api service to fetch the data. Using useEffect hook and reducer to
manager one of the following states:

-   fetch loading
-   fetch success
-   fetch failure

In the original solution we can see that every 5 minutes we have a new request to the BE.
In order to have seen any possible updates seen we have to refresh the page manually.

In the provided solution it is possible to send an additional parameter 'minutes' to the api service.
An interval will fetch the data every x minutes. The user will have always up to
date data without the need to refresh the page. The content will rerender automatically.
We can stop the automatic fetching by simply not providing the 'minutes' param to the api service.

The loading is left so that it is easy so see that the automated data refresh happens.

1.2 The main page component

Tt will display any of the following states:

-   loading status
-   failure to connect status
-   success status

On success:

-   Gauge charts
-   Donut charts
-   Puking unicorns

## 2. Technology stack

The latest versions of the following:

-   React - JS library for building user interfaces and SPA
-   Typescript - superset of JavaScript
-   axios - Promise based HTTP client
-   axios-mock-adapter allows to easily mock requests
-   jest - JS testing framework

## 3. Structure

    > pages
        >energy-generation
    > shared
        > constants
        > http-services
        > models

pages - the folder where our page components live e.g. energy-generation page
shared - a folder for shared services, constants, models, components

## 4. Testing - Automated tests:

4.1. http-services - react-hooks, axios-mock-adapter
4.1.1 Success Api call Test
4.1.2 Error Api call Test
4.1.3 Timeout Api call Test

4.2 energy-generation page, mocking the api-service
4.2.1 snapshot
4.2.2 the provided data date and time
4.2.3 the gauge elements and the percentages
4.2.4 the donut chart and percentages
4.2.5 display of the unicorn
4.2.6 the loading state
4.2.7 the erroring state

## 5. Original Requirements

5.1 write a React application that displays the current mix of energy generation in the UK
(i.e. how much nuclear, wind, solar etc.) - checked

5.2 Huge numbers - checked

5.3 Tiled icons and numbers - checked

5.4 A chart of some kind - checked

5.5 Relative sized colour bands - checked

5.6 Unicorn's rainbow puke - checked

5.7 Automated tests - checked

5.8 simple, readable, well-factored code covering the latest react / typescript / testing standards - checked
