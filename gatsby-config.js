module.exports = {
  siteMetadata: {
    name: "Slugs App",
    description: "Roll your own slugs with Gatsby and FaunaDB",
    keywords: [
      "React",
      "Gatsby",
      "FaunaDB",
      "Netlify Continuous Deployment",
      "Netlify Identity Widget",
      "Netlify Serverless functions",
      "Apollo",
      "GraphQL",
    ],
    siteUrl: "https://fauna-gatsby-slugs.netlify.com",
    siteImage: "images/slugs-app-open-graph-image.jpg",
    profileImage: ``,
    lang: `en`,
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `posts`,
        path: `${__dirname}/src/posts/`,
      },
    },
    {
      resolve: `gatsby-plugin-layout`,
      options: {
        component: require.resolve(`./src/layouts/PagesLayout.js`),
      },
    },
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        extensions: [`.mdx`, `.md`],
      },
    },
    `gatsby-plugin-theme-ui`,
    `gatsby-plugin-react-helmet`,
  ],
};
