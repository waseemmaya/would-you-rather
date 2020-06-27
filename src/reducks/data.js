import * as _API from "../utils/_DATA";

const { _getQuestions, _getUsers, _saveQuestionAnswer, _saveQuestion } = _API;

// action types
const DATA_RECEIVED = "DATA_RECEIVED";
const ERROR_OCCURED = "ERROR_OCCURED";
const API_CALLED = "API_CALLED";

//  effect/thunk
export const get_initial_data = () => async (dispatch, getState) => {
  let { auth } = getState();
  const { authUser } = auth;

  dispatch({
    type: API_CALLED,
  });

  try {
    const usersRes = await _getUsers();
    const questionsRes = await _getQuestions();
    let users = [];
    let questions = [];
    let unAnsweredQuestion = null;
    let answeredQuestion = null;

    for (const key in usersRes) {
      if (usersRes.hasOwnProperty(key)) {
        const element = usersRes[key];

        users.push(element);
      }
    }

    for (const key in questionsRes) {
      if (questionsRes.hasOwnProperty(key)) {
        const element = questionsRes[key];
        questions.push(element);
      }
    }

    if (authUser) {
      unAnsweredQuestion = questions
        .filter(
          (q) =>
            !users.find((u) => u.id === authUser).answers.hasOwnProperty(q.id)
        )
        .sort((a, b) => b.timestamp - a.timestamp);

      answeredQuestion = questions
        .filter((q) =>
          users.find((u) => u.id === authUser).answers.hasOwnProperty(q.id)
        )
        .sort((a, b) => b.timestamp - a.timestamp);
    }

    dispatch({
      type: DATA_RECEIVED,
      payload: {
        users,
        questions,
        unAnsweredQuestion,
        answeredQuestion,
      },
    });
  } catch (error) {
    dispatch({
      type: ERROR_OCCURED,
      payload: error,
    });
  }
};

export const save_answer = ({ authedUser, qid, answer }) => async (
  dispatch
) => {
  dispatch({
    type: API_CALLED,
  });

  try {
    const saveRes = await _saveQuestionAnswer({ authedUser, qid, answer });
    console.log("saveRes: ", saveRes);

    dispatch({
      type: DATA_RECEIVED,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: ERROR_OCCURED,
      payload: error,
    });
  }
};

export const add_question = ({
  optionOneText,
  optionTwoText,
  author,
}) => async (dispatch) => {
  dispatch({
    type: API_CALLED,
  });

  try {
    const questionSaveRes = await _saveQuestion({
      optionOneText,
      optionTwoText,
      author,
    });
    console.log("questionSaveRes: ", questionSaveRes);

    dispatch({
      type: DATA_RECEIVED,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: ERROR_OCCURED,
      payload: error,
    });
  }
};
// reducer

const defaultState = {
  loading: false,
  users: null,
  questions: null,
  unAnsweredQuestion: null,
  answeredQuestion: null,
};
function dataReducer(state = defaultState, action) {
  switch (action.type) {
    case API_CALLED:
      return { ...state, loading: true };
    case ERROR_OCCURED:
      return { ...state, loading: false, error: action.payload };
    case DATA_RECEIVED:
      return { ...state, loading: false, ...action.payload };
    default:
      return state;
  }
}

export default dataReducer;

// const delay = (time) => new Promise((res) => setTimeout(res, time));
