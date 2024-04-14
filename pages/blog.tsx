import Head from 'next/head';
import { useState } from 'react';
import Link from 'next/link';
import { Date } from '../components/date';
import Layout, { siteTitle } from '../components/layout';
import { getSortedPostsData } from '../lib/blog';
import type { GetStaticProps } from 'next';
import type { BlogProps } from '../additional';

export default function Blog({ allPostsData, years }: BlogProps) {
  const [currentYear, setCurrentYear] = useState<string>(years[0]);

  return (
    <Layout activeTab="Blog">
      <Head>
        <title>{`Blog - ${siteTitle}`}</title>
        <meta name="og:title" content={`Blog - ${siteTitle}`} />
      </Head>
      <div className="hero-body container is-block">
        <section>
          <nav className="pagination" role="navigation">
            <ul className="pagination-list">
              {years.map((year) => (
                <div
                  key={year}
                  className={`pagination-link ${currentYear === year ? 'is-current' : ''}`}
                  onClick={() => {
                    setCurrentYear(year);
                  }}
                >
                  {year}
                </div>
              ))}
            </ul>
          </nav>
          <ul>
            {allPostsData[currentYear].map(({ id, date, title }) => (
              <li key={id} className="mb-2">
                <small>
                  <Date dateString={date} />
                </small>
                <br />
                <Link
                  href={`/blog/${id}`}
                  className="has-text-weight-semibold is-size-5 has-text-dark"
                >
                  {title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps<BlogProps> = async () => {
  const allPostsData = await getSortedPostsData();
  return {
    props: {
      allPostsData,
      years: Object.keys(allPostsData).sort((a, b) => {
        if (a < b) {
          return 1;
        }

        return -1;
      }),
    },
  };
};
