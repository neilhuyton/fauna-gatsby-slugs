import React, { Fragment, useContext } from "react";
import { Heading, Text, Divider, Spinner } from "@theme-ui/components";

import { useQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { AppContext } from "../components/AppContext";

import Slug from "../components/Slug";

const GET_ALL_COMMENTS = gql`
  query {
    getAllSlugs {
      slugId
      isApproved
      slug
      date
      name
      slug
    }
  }
`;

const DELETE_COMMENT_BY_ID = gql`
  mutation($slugId: String!) {
    deleteSlugById(slugId: $slugId) {
      slugId
    }
  }
`;

const APPROVE_COMMENT_BY_ID = gql`
  mutation($slugId: String!) {
    approveSlugById(slugId: $slugId) {
      isApproved
    }
  }
`;

const AdminPage = () => {
  const {
    state: { admin },
  } = useContext(AppContext);

  const isAdmin = () => admin && admin.id === process.env.GATSBY_ADMIN_ID;

  const { loading, error, data } = useQuery(GET_ALL_COMMENTS);
  const [deleteSlugById] = useMutation(DELETE_COMMENT_BY_ID);
  const [approveSlugById] = useMutation(APPROVE_COMMENT_BY_ID);

  return (
    <Fragment>
      <Heading as="h1" variant="styles.h1">
        Admin{" "}
        {isAdmin() ? (
          <span role="img" aria-label="admin">
            😃
          </span>
        ) : (
          <span role="img" aria-label="not-admin">
            😔
          </span>
        )}
      </Heading>
      <Text>
        {isAdmin()
          ? "Hooray! You are the administrator"
          : "You have to be the administrator to view this page"}
      </Text>
      <Divider />

      <Divider />
      {isAdmin() && loading && <Spinner />}
      {isAdmin() && error && <Text>{`${error}`}</Text>}

      {isAdmin() &&
        data &&
        data.getAllSlugs.map((slug, index) => {
          console.log("slug", slug);
          const { slugId } = slug;
          return (
            <Fragment key={index}>
              <Slug
                {...slug}
                isAdmin={isAdmin()}
                onApprove={() =>
                  approveSlugById({
                    variables: {
                      slugId,
                    },
                    refetchQueries: [{ query: GET_ALL_COMMENTS }],
                  })
                }
                onDelete={() =>
                  deleteSlugById({
                    variables: {
                      slugId,
                    },
                    refetchQueries: [{ query: GET_ALL_COMMENTS }],
                  })
                }
              />
              <Divider />
            </Fragment>
          );
        })}
      <Divider />
    </Fragment>
  );
};

export default AdminPage;
