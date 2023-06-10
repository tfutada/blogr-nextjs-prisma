import React from "react"
import {GetStaticProps} from "next"
import Layout from "../components/Layout"
import Post, {PostProps} from "../components/Post"
import {sql} from "@vercel/postgres";

export const getStaticProps: GetStaticProps = async () => {
    const {rows} = await sql`SELECT *
                             from CARTS`;

    const feed = rows.map(row => ({
        id: row.id,
        user_id: row.user_id,
    }));

    return {
        props: {feed},
        revalidate: 10
    }
}

type Props = {
    feed: PostProps[]
}

const Blog: React.FC<Props> = (props) => {
    return (
        <Layout>
            <div className="page">
                <h1>Public Feed</h1>
                <main>
                    {props.feed.map((post) => (
                        <div key={post.id} className="post">
                            <Post post={post}/>
                        </div>
                    ))}
                </main>
            </div>
            <style jsx>{`
              .post {
                background: white;
                transition: box-shadow 0.1s ease-in;
              }

              .post:hover {
                box-shadow: 1px 1px 3px #aaa;
              }

              .post + .post {
                margin-top: 2rem;
              }
            `}</style>
        </Layout>
    )
}

export default Blog
