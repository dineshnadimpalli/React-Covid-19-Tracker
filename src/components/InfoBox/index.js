import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";
import "./InfoBox.css";

export default function InfoBox(props) {
  const { title, cases, total, onClick, active, isRed, isBlue, isGreen, theme } = props;
  // console.log("theme in infobox", props.theme)
  return (
    <Card
      onClick={onClick}
      style={{
        backgroundColor: theme.cardBackground
      }}
      className={`infoBox ${active && "infoBox_selected"} ${
        isRed && "infoBox_red"
      } ${isBlue && "infoBox_blue"} ${isGreen && 'infoBox_green'}`}
    >
      <CardContent>
        <Typography
          className={`infoBox_title ${isRed && "infoBox_red_title"} ${
            isBlue && "infoBox_blue_title"
          } ${isGreen && 'infoBox_green_title'}`}
          // color="textSecondary"
        >
          {title}
        </Typography>

        <h2
          className={`infoBox_cases ${isRed && "infoBox_red_title"} ${
            isBlue && "infoBox_blue_title"
          } ${isGreen && 'infoBox_green_title'}`}
        >
          {cases}
        </h2>

        <Typography
          className={`infoBox_total ${isRed && "infoBox_red_title"} ${
            isBlue && "infoBox_blue_title"
          } ${isGreen && 'infoBox_green_title'}`}
          // color="textSecondary"
        >
          {total} Total
        </Typography>
      </CardContent>
    </Card>
  );
}
