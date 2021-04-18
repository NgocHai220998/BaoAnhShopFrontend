import { gql } from "@apollo/client";

export const SINGLE_CONTENT = gql`
    query fetchContent($id: Int!) {
      fetchContent(id: $id) {
        title
        content
        audio
        image
        lesson_id
      }
    }
`;

export const PAGINATE_CONTENT = gql`
  query fetchContents($page: Int!, $limit: Int!, $filter: String!) {
    fetchContents(page: $page, filter: $filter, limit: $limit) {
      totalCount
      edges {
        node {
          id
          title
          content
          lesson {
            title
          }
        }
      }
    }
  }
`;
