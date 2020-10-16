import {
  GET_PEOPLE_SUGGESTIONS_REQUEST,
  GET_PEOPLE_SUGGESTIONS_SUCCESS,
  GET_PEOPLE_SUGGESTIONS_FAILURE,

  FOLLOW_PEOPLE_SUGGESTIONS_REQUEST,
  FOLLOW_PEOPLE_SUGGESTIONS_SUCCESS,
  FOLLOW_PEOPLE_SUGGESTIONS_FAILURE,

  UNFOLLOW_PEOPLE_SUGGESTIONS_REQUEST,
  UNFOLLOW_PEOPLE_SUGGESTIONS_SUCCESS,
  UNFOLLOW_PEOPLE_SUGGESTIONS_FAILUR,
} from "../actions/suggestion";

export default function suggestionReducer(
  state = { people: [], posts: [] },
  action
) {
  switch (action.type) {
    case GET_PEOPLE_SUGGESTIONS_REQUEST:
      return {
        ...state,
        ...action.payload,
      };
    case GET_PEOPLE_SUGGESTIONS_SUCCESS: 
      return {
        ...state,
        ...action.payload,
        people: action.payload.people.reduce((acc, curr) => ([...acc, { ...curr, isFollowing: false }]), [])
        
      };
    case GET_PEOPLE_SUGGESTIONS_FAILURE:
      return {
        ...state,
        ...action.payload,
      };
    
    case FOLLOW_PEOPLE_SUGGESTIONS_SUCCESS: {
      const { userId, isFollowing } = action.payload.data;
      const personIndex = state.people.findIndex(item => item.id === userId);
      const people = [...state.people];
      people[personIndex].isFollowing = isFollowing;

      return {
        ...state,
        people
      };
    }
    
    case UNFOLLOW_PEOPLE_SUGGESTIONS_SUCCESS: {
      const { userId, isFollowing } = action.payload.data;
      const personIndex = state.people.findIndex(item => item.id === userId);
      const people = [...state.people];
      people[personIndex].isFollowing = isFollowing;
      
      return {
        ...state,
        people
      };
    }

    default:
      return state;
  }
}
