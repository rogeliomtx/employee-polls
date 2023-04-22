/* from: https://redux.js.org/usage/writing-tests */
import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";

import setupStore from "../store";


export function renderWithProviders(
  ui,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in
    store = setupStore(preloadedState),
    ...renderOptions
  } = {}
) {
  function Wrapper({ children }) {
    return (
      <Provider store={store}>{children}</Provider>
    )
  }
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

function getDefaultstate() {
  /* Minimum state possible. No authedUser. */
  return {
    users: {
      sarahedo: {
        id: "sarahedo",  // two question, two answer
        name: "Sarah Edo",
        avatarURL: "/assets/avatar_1.jpg",
        answers: {
          "8xf0y6ziyjabvozdd253nd": "optionOne",
          "6ni6ok3ym7mf1p33lnez": "optionTwo",
        },
        questions: ["8xf0y6ziyjabvozdd253nd", "6ni6ok3ym7mf1p33lnez"]
      },
      tylermcginnis: {  // one answer
        id: "tylermcginnis",
        name: "Tyler McGinnis",
        avatarURL: "/assets/avatar_3.jpg",
        answers: {
          "8xf0y6ziyjabvozdd253nd": "optionOne",
        },
        questions: []
      },
      johndoe: {  // no questions, no answers
        id: "johndoe",
        name: "John Doe",
        avatarURL: "/assets/avatar_2.jpg",
        answers: {},
        questions: []
      }
    },
    questions: {
      "8xf0y6ziyjabvozdd253nd": {
        id: "8xf0y6ziyjabvozdd253nd",
        author: "sarahedo",
        timestamp: 1467166872634,
        optionOne: {
          votes: ["sarahedo"],
          text: "Build our new application with Javascript",
        },
        optionTwo: {
          votes: [],
          text: "Build our new application with Typescript"
        }
      },
      "6ni6ok3ym7mf1p33lnez": {
        id: "6ni6ok3ym7mf1p33lnez",
        author: "sarahedo",
        timestamp: 1468479767190,
        optionOne: {
          votes: [],
          text: "hire more frontend developers",
        },
        optionTwo: {
          votes: ["sarahedo"],
          text: "hire more backend developers"
        }
      }
    },
    authedUser: null,
    loadingBar: {
      default: 0
    }
  }
}

export function getMockState(authedUser = null) {
  const state = getDefaultstate();
  return {
    ...state,
    authedUser
  }
}