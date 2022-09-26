import Head from "next/head";

export default function Header() {
  return (
    <>
      <Head>
        <title>Pcode Short</title>
        <meta
          name="description"
          content="A Pcode Website"
        />
        <link
          rel="shortcut icon"
          href="/favicon.ico"
          type="image/x-icon"
        />
      </Head>
    </>
  );
}

// export default Header;
