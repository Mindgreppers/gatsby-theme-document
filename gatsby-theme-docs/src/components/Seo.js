import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import Helmet from 'react-helmet';

/**
 * This react helmt code is adapted from
 * https://themeteorchef.com/tutorials/reusable-seo-with-react-helmet.
 *
 * A great tutorial explaining how to setup a robust version of an
 * SEO friendly react-helmet instance.
 *
 *
 * Use the Helmt on pages to generate SEO and meta content!
 *
 * Usage:
 * <SEO
 *   title={title}
 *   description={description}
 *   image={image}
 * />
 *
 */

const seoQuery = graphql`
  {
    allSite {
      edges {
        node {
          siteMetadata {
            description
            social {
              name
              url
            }
            siteUrl
            title
          }
        }
      }
    }
  }
`;

const SEO = ({ title, description, url, image, published, pathname, timeToRead }) => {
  const results = useStaticQuery(seoQuery);
  const site = results.allSite.edges[0].node.siteMetadata;
  const twitter = site.social.find(option => option.name === 'twitter') || {};

  const fullURL = path => (path ? `${site.siteUrl}${path}` : site.siteUrl);

  // const pageTitle = title ? `${title} | ${site.title}` : site.title;
  const pageTitle = title || site.title;
  const pageDescription = description || site.description;

  const metaTags = [
    { charset: 'utf-8' },
    {
      'http-equiv': 'X-UA-Compatible',
      content: 'IE=edge'
    },
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1'
    },
    {
      name: 'theme-color',
      content: '#fff'
    },
    {
      rel: 'canonical',
      href: fullURL(pathname)
    },
    { itemprop: 'name', content: pageTitle },
    { itemprop: 'description', content: pageDescription },
    { itemprop: 'image', content: fullURL(image) },
    { name: 'description', content: pageDescription },

    { name: 'twitter:card', content: 'summary_large_image' },
    { name: 'twitter:site', content: site.name },
    { name: 'twitter:title', content: pageTitle },
    { name: 'twitter:description', content: pageDescription },
    { name: 'twitter:creator', content: twitter.url },
    {
      name: 'twitter:image',
      content: fullURL(image)
    },

    { property: 'og:title', content: pageTitle },
    { property: 'og:url', content: url },
    { property: 'og:image', content: fullURL(image) },
    { property: 'og:description', content: pageDescription },
    { property: 'og:site_name', content: site.name }
  ];

  if (published) {
    metaTags.push({ name: 'article:published_time', content: published });
  }

  if (timeToRead) {
    metaTags.push({ name: 'twitter:label1', value: 'Reading time' });
    metaTags.push({ name: 'twitter:data1', value: `${timeToRead} min read` });
  }

  return (
    <Helmet title={pageTitle} htmlAttributes={{ lang: 'en' }} meta={metaTags}>
      <link
        href="https://fonts.googleapis.com/css?family=Merriweather:700,700i&display=swap"
        rel="stylesheet"
      />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  published: PropTypes.string,
  pathname: PropTypes.string,
  timeToRead: PropTypes.string
};

SEO.defaultProps = {
  title: '',
  description: '',
  url: '',
  image: '',
  published: null,
  pathname: '',
  timeToRead: null
};

export default SEO;