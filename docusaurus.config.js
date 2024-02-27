// @ts-check

// CTRL+F for "set this" to find all the fields with placeholder values.
// For other configuration options,
// see: https://docusaurus.io/docs/api/themes/configuration

import {themes as prismThemes} from 'prism-react-renderer';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Teaching Seminar, Feb 29 2024',  // set this
    tagline: 'Classical Consequences of the Atomic Hypothesis',
    favicon: 'img/favicon.ico',

    // The url for your site: <url>/<baseUrl>/
    url: 'https://gvarnavi.github.io',  // set this
    baseUrl: '/2024-teaching-seminar/',  // set this

    // Author, affiliation, and bit.ly links (and any other custom fields you want)
    customFields: {
      author: "Dr. Georgios Varnavides", // set this
      affiliation: "UCB, LBNL", // set this
      bitly: "bit.ly/atomic-hypothesis", // set this
    },

    // (optional) GitHub pages deployment config.
    organizationName: 'gvarnavi',  // set this – GitHub Org or Username
    projectName: '2024-teaching-seminar',  // set this – repo name
    trailingSlash: false,

    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',

    i18n: {
        defaultLocale: 'en',
        locales: ['en'],
    },

    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
		    path: 'slides/',
          	    routeBasePath: 'slides/',
		    breadcrumbs: false,
                    sidebarPath: './sidebars.js',
                    remarkPlugins: [remarkMath],
                    rehypePlugins: [rehypeKatex],
                },
		blog: false,
                theme: {
                    customCss: './src/css/custom.scss',
                },
            }),
        ],
    ],

    themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            // set this - Replace with your project's social card
            image: 'img/favicon.svg',
            docs: {
                sidebar: {
                    hideable: true,
	  	    autoCollapseCategories: false,
                }
            },
            navbar: {
                title: '2024 Teaching Seminar | bit.ly/atomic-hypothesis',  // set this
                logo: {
                    alt: 'Slides',
                    src: 'img/favicon.svg',
                },
                items: [
                    {
                        to: 'slides/introduction/',
                        position: 'left',
                        label: 'Slides',
                    },
                ],
            },
            footer: {
                style: 'light',
                copyright: `Copyright © ${new Date().getFullYear()} Georgios Varnavides`,
            },
            prism: {
                theme: prismThemes.github,
            },
	    colorMode: {
		defaultMode: 'light',
		disableSwitch: true,
	    },
        }),

    stylesheets: [
        {
            href: 'https://cdn.jsdelivr.net/npm/katex@0.13.24/dist/katex.min.css',
            type: 'text/css',
            integrity:'sha384-odtC+0UGzzFL/6PNoE8rX/SPcQDXBJ+uRepguP4QkPCm2LBxH3FA3y+fKSiJ+AmM',
            crossorigin: 'anonymous',
        },
    ],

    plugins: [
        'docusaurus-plugin-sass',
        async function disableUsedExports() {
            return {
                name: 'disable-used-exports',
                configureWebpack() {
                    return {
                        optimization: {
                            usedExports: false
                        }
                    }
                }
            }
        },
    ],

    themes: ['@docusaurus/theme-live-codeblock'],
    
};

export default config;
