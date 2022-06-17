import {
  SET_LOADING,
  SET_STORIES,
  REMOVE_STORY,
  HANDLE_PAGE,
  HANDLE_SEARCH,
} from './actions';

const reducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, isLoading: true };
    case SET_STORIES:
      return {
        ...state,
        isLoading: false,
        hits: action.payload.hits,
        nbPages: action.payload.nbPages,
      };
    case REMOVE_STORY:
      return {
        ...state,
        hits: state.hits.filter((story) => story.objectID !== action.payload),
      };
    case HANDLE_SEARCH:
      return { ...state, query: action.payload, nbPages: 0 };
    case HANDLE_PAGE:
      let goPage;
      if (action.payload === 'inc') {
        goPage = state.page + 1;
        if (goPage > state.nbPages - 1) {
          goPage = 0;
        }
      }
      if (action.payload === 'dec') {
        goPage = state.page - 1;
        if (goPage < 0) {
          goPage = state.nbPages - 1;
        }
      }
      return { ...state, page: goPage };
    default:
      throw new Error(`no matching "${action.type}" action`);
  }
};

export default reducer;
