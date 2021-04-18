import { gql } from '@apollo/client';

export const PAGINATE_PRODUCTS = gql`
  query fetchProducts ($page: Int!, $limit: Int!, $filter: String!) {
    fetchProducts (page: $page, filter: $filter, limit: $limit) {
      edges {
        node {
          id
          name
          distributor
          discount
          price
          image
        }
      }
      totalCount
    }
  }
`;

export const SINGLE_PRODUCT = gql`
  query fetchProduct ($id: Int!) {
    fetchProduct (id: $id) {
      id
      name
      distributor
      discount
      price
      image
    }
  }
`;
