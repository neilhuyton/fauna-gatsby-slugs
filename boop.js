require("dotenv").config();
const faunadb = require("faunadb");
const q = faunadb.query;

const client = new faunadb.Client({ secret: process.env.GATSBY_FAUNA_DB });

const COLLECTION_NAME = process.env.GATSBY_FAUNA_COLLECTION;

module.exports = {
  // CREATE SLUG
  createSlug: async () => {
    const slug = "/posts/2020/04/post-five/";
    const slugs = ["/cool-slug3/", "/gross-slug3/"];
    const results = await client.query(
      q.Create(q.Collection(COLLECTION_NAME), {
        data: {
          slug,
          slugs,
        },
      })
    );
    console.log(JSON.stringify(results, null, 2));
    return {
      slugId: results.ref.id,
    };
  },
  // DELETE SLUG BY ID
  deleteSlugId: async () => {
    const slugId = "272925693917004293";
    const results = await client.query(
      q.Delete(q.Ref(q.Collection(COLLECTION_NAME), slugId))
    );
    console.log(JSON.stringify(results, null, 2));
    return {
      slugId: results.ref.id,
    };
  },
  // GET ALL SLUGS
  getAllSlugs: async () => {
    const results = await client.query(
      q.Paginate(q.Match(q.Index("get-all-slugs")))
    );
    console.log(JSON.stringify(results, null, 2));
    return results.data.map(([ref, slug, slugs]) => ({
      slugId: ref.id,
      slug,
      slugs,
    }));
  },
  // GET SLUGS BY SLUG
  getSlugsBySlug: async () => {
    const slug = "/posts/some-post";
    const results = await client.query(
      q.Paginate(q.Match(q.Index("get-slugs-by-slug"), slug))
    );
    console.log(JSON.stringify(results, null, 2));
    return results.data.map(([ref, slug, slugs]) => ({
      // slugId: ref.id,
      slug,
      slugs,
    }));
  },
  // APPROVE COMMENT BY ID
  // approveSlugId: async () => {
  //   const slugId = "272926628106994181";
  //   const results = await client.query(
  //     q.Update(q.Ref(q.Collection(COLLECTION_NAME), slugId), {
  //       data: {
  //         isApproved: true,
  //       },
  //     })
  //   );
  //   console.log(JSON.stringify(results, null, 2));
  //   return {
  //     isApproved: results.isApproved,
  //   };
  // },
};

require("make-runnable/custom")({
  printOutputFrame: false,
});
