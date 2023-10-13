import React from "react";
import Head from "next/head";

function Meta({ title, keywords, description }) {

    return (
        <Head>
            <meta
                name="viewport"
                content="width=device-width, initial-scale=1"
            />
            <meta name="keywords" content={keywords} />
            <meta name="description" content={description} />
            <meta charSet="utf-8" />
            <link rel="icon" href="/favicon.ico" />
            <title>{title}</title>

            <meta name="author" content="divear" />
        </Head>
    );
}

Meta.defaultProps = {
    title: "Purkiáda úloha 4",
    keywords:
        "purkiada",
    description: "Purkiáda úloha 4",
};

export default Meta;
