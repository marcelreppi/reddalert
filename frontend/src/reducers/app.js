const SET_LOADING = "app/SET_LOADING"

// Actions
export function setLoading(loading) {
  return {
    type: SET_LOADING,
    loading,
  }
}

const initialState = {
  backendUrl: "http://localhost:3001",
  loading: true,
}

// Reducer
function app(state = initialState, action) {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: action.loading,
      }

    default:
      return state
  }
}

export default app
