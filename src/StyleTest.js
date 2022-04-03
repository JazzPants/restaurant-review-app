import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import DeleteSharpIcon from "@mui/icons-material/DeleteSharp";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import DeleteForeverRoundedIcon from "@mui/icons-material/DeleteForeverRounded";
import DeleteForeverTwoToneIcon from "@mui/icons-material/DeleteForeverTwoTone";
import DeleteForeverSharpIcon from "@mui/icons-material/DeleteForeverSharp";
import ThreeDRotationIcon from "@mui/icons-material/ThreeDRotation";
import FourKIcon from "@mui/icons-material/FourK";
import ThreeSixtyIcon from "@mui/icons-material/ThreeSixty";
import styled, { css } from "styled-components";

const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0.5em 1em;
  padding: 0.25em 1em;

  ${(props) =>
    props.primary &&
    css`
      background: palevioletred;
      color: white;
    `}
`;

const Container = styled.div`
  text-align: center;
`;

export default function StyleTest() {
  return (
    <>
      <Button>Normal Button</Button>
      <Button primary>Primary Button</Button>
      <Grid container sx={{ color: "text.primary" }}>
        <Grid item xs={4}>
          <Typography>Filled</Typography>
        </Grid>
        <Grid item xs={8}>
          <DeleteIcon />
          <DeleteForeverIcon />
        </Grid>
        <Grid item xs={4}>
          <Typography>Outlined</Typography>
        </Grid>
        <Grid item xs={8}>
          <DeleteOutlinedIcon />
          <DeleteForeverOutlinedIcon />
        </Grid>
        <Grid item xs={4}>
          <Typography>Rounded</Typography>
        </Grid>
        <Grid item xs={8}>
          <DeleteRoundedIcon />
          <DeleteForeverRoundedIcon />
        </Grid>
        <Grid item xs={4}>
          <Typography>Two Tone</Typography>
        </Grid>
        <Grid item xs={8}>
          <DeleteTwoToneIcon />
          <DeleteForeverTwoToneIcon />
        </Grid>
        <Grid item xs={4}>
          <Typography>Sharp</Typography>
        </Grid>
        <Grid item xs={8}>
          <DeleteSharpIcon />
          <DeleteForeverSharpIcon />
        </Grid>
        <Grid item xs={4}>
          <Typography>Edge-cases</Typography>
        </Grid>
        <Grid item xs={8}>
          <ThreeDRotationIcon />
          <FourKIcon />
          <ThreeSixtyIcon />
        </Grid>
      </Grid>
    </>
  );
}
