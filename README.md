# Quiz(퀴즈)

## How ro run

First create and fill up the `.env` file by using the `.env.example` as a reference

`npm run start` or `yarn start`

## How to test

`npx cypress run`

## Folder Structure

     src/
     |── app		            # contains the Routing of the application
     |── assets                 # contains the images and other medias needed throughout the app
     |── components             # contains the reusable components (Atomic Design Structure)
     |-- constants              # contains all the constants values that are used throughout the app
     |── pages                  # contains all the pages of the app
     |-- services               # contains the business logic of the features
     |-- store                  # contains zustand stores
     |── typings                # contains all the Typescript declaration files
     └── utils                  # contains all the extra helper function that can be used in the app

## Features

- [x] The user starts the quiz by clicking the '퀴즈 풀기' button
- [x] The user can select one of the 4 answers
- [x] The user will be able to see the 'Next' button after selecting an answer

After solving all the questions, the user will see the result details as follows:

- [x] Time Taken to complete the quiz
- [x] Number of correct answers
- [x] Number of incorrect answers
- [x] Chart the percentage of correct and incorrect answers
- [x] Incorrect answer note function
