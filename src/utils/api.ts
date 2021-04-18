const ROOT_API = "http://localhost:3000"

export const API = {
  CREATE_COURSE: `${ROOT_API}/courses`,
  DELETE_COURSE: `${ROOT_API}/courses`,
  UPDATE_COURSE: `${ROOT_API}/courses`,

  CREATE_LESSON: `${ROOT_API}/lessons`,
  DELETE_LESSON: `${ROOT_API}/lessons`,
  UPDATE_LESSON: `${ROOT_API}/lessons`,

  CREATE_VOCABULARY: `${ROOT_API}/vocabularies`,
  DELETE_VOCABULARY: `${ROOT_API}/vocabularies`,
  UPDATE_VOCABULARY: `${ROOT_API}/vocabularies`,
  GET_ALL_VOCABULARY_BY_LESSON_ID: `${ROOT_API}/vocabularies`,

  CREATE_CONTENT: `${ROOT_API}/contents`,
  DELETE_CONTENT: `${ROOT_API}/contents`,
  UPDATE_CONTENT: `${ROOT_API}/contents`,

  CREATE_QUESTION: `${ROOT_API}/questions`,
  DELETE_QUESTION: `${ROOT_API}/questions`,
  UPDATE_QUESTION: `${ROOT_API}/questions`,
}

export const headers = {
  "Content-Type": "application/json",
  "Accept": "application/json"
}
