import Head from 'next/head'
import Date from '../components/date'
import Layout, { siteTitle } from '../components/layout'
import { getSortedNewsData } from '../lib/news'
import { GetStaticProps } from 'next'

interface Props {
  allNewsData: {
    id: string
    date: string
    title: string
    url: string
  }[]
}

const News: React.FC<Props> = ({ allNewsData }) => {
  return (
    <Layout activeTab="News">
      <Head>
        <title>{`Blog - ${siteTitle}`}</title>
      </Head>
      <div className="hero-body container">
        <section>
          <ul>
            {allNewsData.map(({ id, date, title, url }) => (
              <li key={id} className="mb-2">
                <small>
                  <Date dateString={date} />
                </small>
                <br />
                <a className="has-text-weight-semibold is-size-5 has-text-dark" href={url}>{title}</a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  const allNewsData = await getSortedNewsData()
  return {
    props: {
      allNewsData
    }
  }
}

export default News