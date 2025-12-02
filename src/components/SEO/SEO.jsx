import { Helmet } from "react-helmet-async";

function SEO({
    title = "Default Title",
    description = "Default description",
    keywords = "default, keywords",
    ogImage = "/images/logo/sias.svg",
}) {
    return (
        <Helmet>
            <title>{title}</title>

            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />

            {/* Open Graph */}
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />
            <meta property="og:type" content="website" />

            {/* Twitter */}
            <meta name="twitter:title" content={title} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={ogImage} />

            <link rel="canonical" href={window.location.href} />
        </Helmet>
    );
}

export default SEO;
