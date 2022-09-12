# Project Name

[Project Instructions](./INSTRUCTIONS.md), this line may be removed once you have updated the README.md

## Description

Duration: 2.5 Days

Do you struggle with task prioritization, or are you looking to breathe new life into your boring old "To Do" list? This application is based on the Eisenhower Matrix, prioritizing tasks based on urgency and importance. This easy-to-use interface allows you to enter in a task and quickly select whether or not it is urgent or important. Based on those attributes, your task will be added to the appropriate quadrant, helping you focus your time and attention on the tasks that need to be done now, versus ones that can wait until later.

## Screen Shot
[Screenshot](/server/public/images/screenshot.png)

## Prerequisites
Node.js
Postico

## Installation
1. Fork and clone this repository to your local computer
2. Open the project folder using VSCode
3. In terminal, type npm install
4. Install dependencies through the terminal (express, body-parser, pg)
5. Create database in Postico called "weekend-to-do-app"
6. In Postico, use the information provided in the database.sql file to create a table and insert example data
7. Start the server
8. In a browser window, go to localhost:5000
9. Begin using the application

## Usage
1. Enter your task in the text input field
2. If the task is urgent or important, check the corresponding box
3. Click the "Add Task" button. Based on the boxes you checked in step 2, the task will be displayed in one of four quadrants:
    Urgent and Important
    Important, Not Urgent
    Urgent, Not Important
    Not Important or Urgent
4. In each quadrant, click the check box to the left of the task when completed.
5. In each quadrant, click the 🗑 button to delete the item from the list.
6. Focus on what needs to be done now, instead of being slowed down by focusing on the wrong tasks
7. Watch your life improve as you get things done like never before!

## Built With
HTML
CSS
JavaScript
jQuery
Express
Body Parser
PG
Postico
Sql
Bootstrap

## Acknowledgement
Countless thanks to Prime Digital Academy and the l'Engle cohort for helping me develop the skills necessary to build this application. For more information on the Eisenhower Matrix, please visit https://www.eisenhower.me/eisenhower-matrix/.

## Support
Issues? Suggestions? Feedback? I'm all ears! Please email me at maggie.whitlock@gmail.com