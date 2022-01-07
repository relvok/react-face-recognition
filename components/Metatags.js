import Head from "next/head";

export default function Metatags({
	title = "React face recognition demo",
	description = "A simple React.js face recognition app",
	image = "https://ibb.co/h8NQfrS",
}) {
	return (
		<Head>
			<title>{title}</title>
			<meta name="twitter:card" content="summary" />
			<meta name="twitter:site" content="@relvok_dev" />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />

			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
		</Head>
	);
}
