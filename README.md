# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Setup project

Run `npm install` to install all dependencies
Run `npm start` to start the react.
Run `npm test` to run the tests.


# The project
HR Payroll is a platform that allows authenticated users to create and vote using polls. It shows the answer "Would you rather" and two options.

## Home view

It shows all the questions all users make, and these are categorized as "unanswered" and "answered" depending on whether the authed employee has responded.

Also, the user can open a question, see the two options and select one. This action will update where their question is categorized and their position in the leaderboard.

Questions are sorted by `question.timestamp`.

Relevant components: `Home`, `Question`, `QuestionDetails`.

## Leaderboard

It displays a table with all the users and their scores:
* total answered questions.
* questions created.

Users are sorted by their scores: total answered questions and questions created.

Relevant components: `Leaderboard`.

## Add question

Allows the user to create new questions. It shows the question "Would you rather..." followed by a form to define the two options.

Relevant components: `CreateQuestion`.

## Navbar
Displays the menu and the authed username and avatar.


# The code
There's an action and reducer file for each "model" in the project.
There are three main models:
* authedUser.js
* question.js
* users.js

There's also a shared file for each action and reducer. The purpose of this file is to dispatch all actions that will update two or more models.
* shared.js

# Author
Rogelio Martínez.

# TODOs
* Add a signup interface that allows the creation of new users.