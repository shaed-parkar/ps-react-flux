import * as authorApi from "../api/authorApi";
import dispatcher from "../appDispatcher";
import actionTypes from "./actionTypes";

export function saveAuthor(author) {
  return authorApi.saveAuthor(author).then((savedAuthor) => {
    dispatcher.dispatch({
      actionType: actionTypes.CREATE_AUTHOR,
      author: savedAuthor,
    });
  });
}

export function loadAuthors() {
  return authorApi.getAuthors().then((authors) => {
    dispatcher.dispatch({
      actionType: actionTypes.LOAD_AUTHORS,
      authors,
    });
  });
}

export function deleteAuthor(id) {
  return authorApi.deleteAuthor(id).then(() => {
    dispatcher.dispatch({
      actionType: actionTypes.DELETE_AUTHOR,
      id,
    });
  });
}
