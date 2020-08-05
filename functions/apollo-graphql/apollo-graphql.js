require("dotenv").config();
const faunadb = require("faunadb");
const { ApolloServer, gql } = require("apollo-server-lambda");

const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.GATSBY_FAUNA_DB });

const COLLECTION_NAME = process.env.GATSBY_FAUNA_COLLECTION;

const typeDefs = gql`
  type Query {
    getAllSlugs: [SlugObject]
    getSlugsBySlug(slug: String!): [SlugObject]
  }

  type Mutation {
    createSlug(slug: String!, slug: [String!]: CreatedSlug
    deleteSlugById(slugId: String!): DeletedSlug
  }

  type DeletedSlug {
    slugId: String
  }

  type CreatedSlug {
    slugId: String
  }

  type SlugObject {
    slug: String
  }
`;

const resolvers = {
  Query: {
    // GET ALL SLUGS
    getAllSlugs: async () => {
      const results = await client.query(
        q.Paginate(q.Match(q.Index("get-all-slugs")))
      );
      return results.data.map(([ref, slug, slugs]) => ({
        slugId: ref.id,
        slug,
        slugs,
      }));
    },

    // GET SLUG BY SLUG
    getSlugsBySlug: async (root, args, context) => {
      const results = await client.query(
        q.Paginate(
          q.Match(q.Index("get-slugs-by-slug"), "/posts/2020/04/post-five/")
        )
      );

      console.log("results", results);

      return results.data.map(([ref, slug, slugs]) => ({
        // slugId: ref.id,
        slug,
        // slugs,
      }));
    },
  },

  Mutation: {
    // CREATE SLUG
    createSlug: async (root, args, context) => {
      const results = await client.query(
        q.Create(q.Collection(COLLECTION_NAME), {
          data: {
            slug: args.slug,
            slugs: args.slugs,
          },
        })
      );

      return {
        slugId: results.ref.id,
      };
    },

    // DELETE SLUG BY ID
    deleteSlugById: async (root, args, context) => {
      const results = await client.query(
        q.Delete(q.Ref(q.Collection(COLLECTION_NAME), args.slugId))
      );

      return {
        slugId: results.ref.id,
      };
    },

    // APPROVE SLUG BY ID
    // approveSlugById: async (root, args, context) => {
    //   const results = await client.query(
    //     q.Update(q.Ref(q.Collection(COLLECTION_NAME), args.slugId), {
    //       data: {
    //         isApproved: true,
    //       },
    //     })
    //   );

    //   return {
    //     isApproved: results.isApproved,
    //   };
    // },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: true,
  introspection: true,
});

exports.handler = server.createHandler({
  cors: {
    origin: "*",
    credentials: true,
  },
});
