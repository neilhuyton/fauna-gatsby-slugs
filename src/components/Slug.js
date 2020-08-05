import React from "react";
// import PropTypes from "prop-types";
// import { format } from "date-fns";
import {
  Flex,
  Box,
  Text,
  Heading,
  // Button,
  // Link,
  Divider,
} from "@theme-ui/components";

const QUOTE_ICON_SIZE = 32;

const Slug = ({ slugId, slug, slugs }) => {
  console.log("slugId", slugId, "slugs", slugs, "slug", slug, "slugs", slugs);
  return (
    <Box
      as="section"
      sx={{
        borderBottomColor: "darken",
        borderBottomStyle: "solid",
        borderBottomWidth: 1,
      }}
    >
      <Box
        sx={{
          ml: [0, QUOTE_ICON_SIZE * 1.2],
        }}
      >
        <Heading as="h6" variant="styles.h6" sx={{ color: "gray" }}>
          {slug}
        </Heading>
        <Text variant="styles.small" sx={{ color: "highlight", mb: 2 }}>
          {/* {format(new Date(date), "d MMMM u")} */}
        </Text>
      </Box>
      <Flex
        sx={{
          pb: 4,
        }}
      >
        <Text
          as="small"
          variant="styles.small"
          sx={{
            alignSelf: "center",
            color: "gray",
            display: "flex",
            flex: 1,
            fontStyle: "italic",
          }}
        >
          {slug}
        </Text>
      </Flex>
      <Box
        sx={{
          mt: 3,
        }}
      >
        {/* {isAdmin ? (
          <Flex
            sx={{
              justifyContent: "space-between",
              flexWrap: "wrap",
            }}
          >
            <Flex
              sx={{
                flexDirection: "column",
                mb: [4, 0],
              }}
            >
              <Text as="small" variant="styles.small">
                Approved: {isApproved ? "true" : "false"}
              </Text>
              <Text as="small" variant="styles.small">
                Slug Id: {slugId}
              </Text>
              <Flex>
                <Text as="small" variant="styles.small" sx={{ mr: 1 }}>
                  Link:
                </Text>
                <Link href={slug} target="_blank">
                  <Text variant="styles.small">{slug}</Text>
                </Link>
              </Flex>
            </Flex>
            <Flex
              sx={{
                alignItems: "center",
                flex: ["1 0 100%", "1 0 0%"],
                justifyContent: ["space-between", "flex-end"],
              }}
            >
              <Button
                variant="ghost"
                sx={{ color: "error", mr: 3 }}
                onClick={() => onDelete(slugId)}
              >
                <SvgIcon
                  iconPath={DELETE_ICON}
                  sx={{ color: "error", mr: 2 }}
                />
                Delete
              </Button>
              <Button
                variant="secondary"
                sx={{ backgroundColor: "success" }}
                disabled={isApproved}
                onClick={() => onApprove(slugId)}
              >
                {!isApproved && (
                  <SvgIcon
                    iconPath={APPROVE_ICON}
                    sx={{ color: "succes", mr: 2 }}
                  />
                )}
                {isApproved ? "Approved" : "Approve"}
              </Button>
            </Flex>
          </Flex>
        ) : null} */}
        <Divider />
      </Box>
    </Box>
  );
};

Slug.defaultProps = {
  isApproved: false,
  isAdmin: false,
};

// Slug.propTypes = {
//   /** The slug Id */
//   slugId: PropTypes.string.isRequired,
//   /** Status of commnet - only show if isAdmin = true */
//   // isApproved: PropTypes.bool.isRequired,
//   /** The slug of the post the slugs releated to - only show if isAdmin = true */
//   slug: PropTypes.string.isRequired,
//   /** The date the slug was posted */
//   // date: PropTypes.string.isRequired,
//   /** The name of the person who submitted the slug */
//   // name: PropTypes.string.isRequired,
//   /** The slug made by the user */
//   slugs: PropTypes.string.isRequired,
//   /** Is admin logged in */
//   // isAdmin: PropTypes.bool.isRequired,
// };

export default Slug;
