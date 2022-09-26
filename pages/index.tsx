import Link from "next/link";

import Typography from "@mui/material/Typography";

import Main from "components/main";

import Layout from "components/layout";
import styles from "styles/Home.module.css";

const Home = () => {
  return (
    <Layout>
      <Main className={styles.main}>
        <Typography
          variant="h1"
          align="center"
          sx={{
            fontWeight: "bold",
          }}
        >
          <Link href="/get">
            <span className={styles.link}>Pcode Short Link</span>
          </Link>
        </Typography>
      </Main>
    </Layout>
  );
};

export default Home;
