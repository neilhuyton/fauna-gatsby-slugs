import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import {
  Flex,
  Box,
  Text,
  Input,
  Textarea,
  Button,
  Divider,
  Label,
  Spinner,
} from "@theme-ui/components";

import { useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { Form, Formik, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";

// const NAME_FIELD = "name";
// const SLUG_FIELD = "slug";

// const initialValues = {
//   name: "",
//   slug: "",
// };

// const schema = Yup.object().shape({
//   name: Yup.string()
//     .min(3, "Name must be at least 3 characters")
//     .required("Please enter your name"),
//   slug: Yup.string()
//     .min(10, "Slug must be at least 10 characters")
//     .required("Please enter a slug"),
// });

const CREATE_SLUG = gql`
  mutation($slug: String!, $slugs: [String!]) {
    createSlug(slug: $slug, slugs: $slugs) {
      slugId
    }
  }
`;

const SlugForm = ({ slug }) => {
  const [isFormSent, setIsFormSent] = useState(false);
  const [isFormError, setIsFormError] = useState(false);

  const [createSlug, { loading, error }] = useMutation(CREATE_SLUG);

  return (
    <Fragment>
      <Text
        sx={{
          color: "secondary",
          mb: 2,
          fontStyle: "italic",
        }}
      >
        Leave a slug
      </Text>

      <Formik
        // initialValues={initialValues}
        isSubmitting={loading}
        errors={error}
        // validationSchema={schema}
        onSubmit={async (values, { resetForm }) => {
          await createSlug({
            variables: {
              slug: slug,
              slugs: values.slugs,
            },
          })
            .then(() => {
              resetForm();
              setIsFormSent(true);
              setTimeout(() => {
                setIsFormSent(false);
              }, 3000);
            })
            .catch(() => {
              setIsFormError(true);
            });
        }}
      >
        {({ isSubmitting, values, errors, dirty, handleChange }) => {
          return (
            <Form>
              <Field name={NAME_FIELD}>
                {({ field }) => (
                  <Box
                    sx={{
                      mb: 4,
                    }}
                  >
                    <Label labelFor={NAME_FIELD}>You name</Label>
                    <Input
                      {...field}
                      name={NAME_FIELD}
                      placeholder="Enter your name"
                      value={values.name}
                      onChange={handleChange}
                      sx={{
                        mb: 2,
                      }}
                    />
                    <ErrorMessage
                      name={NAME_FIELD}
                      render={() => (
                        <Text
                          as="small"
                          variant="styles.small"
                          sx={{ color: "error", position: "absolute" }}
                        >
                          {errors.name}
                        </Text>
                      )}
                    />
                  </Box>
                )}
              </Field>
              <Divider />
              <Field name={SLUG_FIELD}>
                {({ field }) => (
                  <Box
                    sx={{
                      mb: 4,
                    }}
                  >
                    <Label labelFor={SLUG_FIELD}>You slug</Label>
                    <Textarea
                      {...field}
                      name={SLUG_FIELD}
                      placeholder="Enter your slug"
                      value={values.slug}
                      onChange={handleChange}
                      sx={{
                        mb: 2,
                      }}
                    />
                    <ErrorMessage
                      name={SLUG_FIELD}
                      render={() => (
                        <Text
                          as="small"
                          variant="styles.small"
                          sx={{ color: "error", position: "absolute" }}
                        >
                          {errors.slug}
                        </Text>
                      )}
                    />
                  </Box>
                )}
              </Field>

              <Flex
                sx={{
                  alignItems: "center",
                  justifyContent: "flex-end",
                }}
              >
                <Box
                  sx={{
                    mr: 2,
                  }}
                >
                  {isFormSent && (
                    <Text
                      as="small"
                      variant="styles.small"
                      sx={{ color: "success" }}
                    >
                      Slug sent ok!
                    </Text>
                  )}
                  {isFormError && (
                    <Text
                      as="small"
                      variant="styles.small"
                      sx={{ color: "error" }}
                    >
                      Ooops, there's been an error!
                    </Text>
                  )}
                </Box>
                <Button
                  variant="secondary"
                  type="submit"
                  disabled={
                    isSubmitting || !dirty || !!errors.name || !!errors.slug
                  }
                >
                  {isSubmitting ? (
                    <Fragment>
                      Submitting
                      <Spinner variant="styles.spinner" sx={{ ml: 3 }} />
                    </Fragment>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Flex>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

SlugForm.propTypes = {
  /** The slug of the post the slugs releated to - only show if isAdmin = true */
  slug: PropTypes.string.isRequired,
};

export default SlugForm;
