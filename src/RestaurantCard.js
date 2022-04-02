import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

export default function RestaurantCard() {
  return (
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image=""
          alt="kosuke restuarant"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Kosuke
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Kosuke is a dedicated ramen joint with an extensive list of ramens
            you can choose to devour. From rich, thick, tonkotsu black garlic,
            to more light, but still savoury shio ramen, there is a choice for
            everyone!
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
