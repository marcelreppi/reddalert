const LOGIN = "user/LOGIN"
const LOGOUT = "user/LOGOUT"
const SET_REMEMBER_USER = "user/SET_REMEMBER_USER"
const SET_SUBREDDITS = "user/SET_SUBREDDITS"

// Actions
export function login(email) {
  return {
    type: LOGIN,
    email,
  }
}

export function logout() {
  return {
    type: LOGOUT,
  }
}

export function setSubreddits(subreddits) {
  return {
    type: SET_SUBREDDITS,
    subreddits,
  }
}

export function setRememberUser(rememberUser) {
  return {
    type: SET_REMEMBER_USER,
    rememberUser,
  }
}

const initialState = {
  email: null,
  subreddits: null,
  loggedIn: false,
  rememberUser: false,
}

// Reducer
function app(state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        email: action.email,
        loggedIn: true,
      }
    case LOGOUT:
      return {
        ...state,
        email: null,
        subreddits: null,
        loggedIn: false,
        rememberUser: false,
      }
    case SET_REMEMBER_USER:
      return {
        ...state,
        rememberUser: action.rememberUser,
      }
    case SET_SUBREDDITS:
      return {
        ...state,
        subreddits: action.subreddits,
      }

    default:
      return state
  }
}

export default app
