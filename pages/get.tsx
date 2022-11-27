import { useRef, useState, MouseEvent } from "react";

import Main from "components/main";

import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";

import AddLink from "@mui/icons-material/AddLink";
import Link from "@mui/icons-material/Link";

import Layout from "components/layout";
import styles from "styles/Home.module.css";

const Register = () => {
  let requestSlug = useRef<HTMLInputElement>(null);
  let [requestColor, setRequestColor] = useState<
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | undefined
  >(undefined);
  let [requestFocused, setRequestFocused] = useState<boolean | undefined>(
    undefined
  );

  let targetUrl = useRef<HTMLInputElement>(null);
  let [targetColor, setTargetColor] = useState<
    | "error"
    | "primary"
    | "secondary"
    | "info"
    | "success"
    | "warning"
    | undefined
  >(undefined);
  let [targetFocused, setTargetFocused] = useState<boolean | undefined>(
    undefined
  );

  let isRegister: boolean = false;
  const onRegister = () => {
    if (isRegister) {
      return;
    }

    if (!requestSlug.current || !targetUrl.current) {
      return;
    }

    isRegister = true;

    resetRequest();
    resetTarget();

    fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        slug: requestSlug.current.value,
        url: targetUrl.current.value,
      }),
    })
      .then((response) => {
        isRegister = false;
        return response.json();
      })
      .then((data) => {
        console.log(data);
        if (data.status !== 200) {
          if (data.status === 400) {
            if (data.subStatus === 1) {
              setTargetColor("error");
              setTargetFocused(true);
            } else {
              setRequestColor("error");
              setRequestFocused(true);
            }
          }
          throw new Error(data.message);
        }
        setTargetColor("success");
        setTargetFocused(true);
        setRequestColor("success");
        setRequestFocused(true);
      })
      .catch(console.error);
  };

  const resetRequest = () => {
    setRequestColor(undefined);
    setRequestFocused(undefined);

    if (copyRef.current && requestSlug.current) {
      copyRef.current.value = `https://sh.pcode.dev/${requestSlug.current.value}`;
    }
  };

  const resetTarget = () => {
    setTargetColor(undefined);
    setTargetFocused(undefined);
  };

  let copyRef = useRef<HTMLTextAreaElement>(null);
  const copyUrl = (event: MouseEvent<HTMLSpanElement>) => {
    if (!copyRef.current) {
      return;
    }
    console.log("Copy", copyRef.current.value);
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(copyRef.current.value);
    }
    copyRef.current.select();
    document.execCommand("copy");
    event.currentTarget.focus();
  };

  return (
    <Layout>
      <Main className={styles.main}>
        <textarea
          ref={copyRef}
          readOnly
          style={{
            resize: "none",
            position: "fixed",
            top: "-100px",
          }}
          value="https://sh.pcode.dev/"
        />
        <FormControl
          sx={{
            width: {
              xs: "80vw",
              md: "50vw",
              lg: "40vw",
            },
          }}
        >
          <TextField
            hiddenLabel
            id="output-url"
            inputRef={requestSlug}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Tooltip
                    title="Copy"
                    placement="top"
                  >
                    <span
                      className={styles.click_able}
                      onClick={copyUrl}
                    >
                      <Link />
                    </span>
                  </Tooltip>
                  <Typography
                    sx={{
                      ml: "1rem",
                    }}
                  >
                    sh.pcode.dev /
                  </Typography>
                </InputAdornment>
              ),
              readOnly: false,
              autoComplete: "off",
            }}
            placeholder="pcode"
            fullWidth
            variant="filled"
            sx={{
              mb: "2rem",
            }}
            color={requestColor}
            focused={requestFocused}
            onChange={() => {
              resetRequest();
              resetTarget();
            }}
          />

          <TextField
            id="input-url"
            label="Target URL"
            inputRef={targetUrl}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AddLink />
                </InputAdornment>
              ),
              autoComplete: "off",
            }}
            variant="standard"
            sx={{
              mb: "2rem",
            }}
            placeholder="https://pcode.dev"
            color={targetColor}
            focused={targetFocused}
            onChange={() => {
              resetRequest();
              resetTarget();
            }}
          />

          <Button
            onClick={onRegister}
            variant="outlined"
          >
            Get Link
          </Button>
        </FormControl>
      </Main>
    </Layout>
  );
};

export default Register;
