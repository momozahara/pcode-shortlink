import { useEffect, useRef, useState } from "react";

import { GetServerSideProps } from "next";

import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";

import Router from "next/router";

import Layout from "components/layout";
import styles from "styles/Home.module.css";

interface SlugProps {
  slug: string;
}

const Slug = (props: SlugProps) => {
  let main = useRef<HTMLElement>(null);
  let message = useRef<HTMLSpanElement>(null);

  let slug = props.slug;
  const [loading, setLoading] = useState<"none" | undefined>(undefined);
  useEffect(() => {
    fetch(
      "/api/get?" +
        new URLSearchParams({
          slug: slug ? slug.toString() : "",
        }).toString()
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.status !== 200) {
          if (message.current) {
            message.current.innerText = "Not Found";
            setTimeout(() => {
              setLoading("none");
              if (main.current) {
                main.current.style.display = "inline-block";
              }
            }, 500);
            setTimeout(() => {
              if (main.current) {
                main.current.style.opacity = "1";
              }
            }, 1000);
          }
          throw new Error(data.message);
        }
        Router.push(data.url);
      })
      .catch(console.error);
  }, [slug]);

  return (
    <Layout hideSwitcher={true}>
      <main className={styles.main}>
        <CircularProgress
          color="inherit"
          sx={{
            display: loading,
          }}
          size={80}
        />
        <main
          ref={main}
          style={{
            display: "none",
            opacity: "0",
            transition: "ease-in 0.1s",
          }}
        >
          <Typography variant="h1">
            <span ref={message}></span>
          </Typography>
        </main>
      </main>
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      slug: context.query.slug,
    },
  };
};

export default Slug;
