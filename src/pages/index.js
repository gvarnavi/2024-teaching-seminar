import React from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import styles from './index.module.css';
import LennardJonesSandbox from '@site/src/components/LennardJonesSandbox.js';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <h2 className="hero__subtitle">{siteConfig.tagline}</h2>
        <h3 className="hero__subsubtitle">{siteConfig.customFields.author} | {siteConfig.customFields.affiliation}</h3>
        <div className={clsx(styles.heroInteractive)}>
	  <LennardJonesSandbox />
        </div>
        <div className={styles.buttons}>
          <Link
            className="button button--secondary button--lg"
            to="/slides/introduction">
            Get Started!
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title}`}
      description={`${siteConfig.title}`}>
      <HomepageHeader />
    </Layout>
  );
}
