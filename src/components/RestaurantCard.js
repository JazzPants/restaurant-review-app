import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import { Rating } from "@mui/material";
import { CardActionArea } from "@mui/material";
import { Restaurant } from "@mui/icons-material";

//pass props and display Card based on those props
export default function RestaurantCard(props) {
  return (
    <Card sx={{ maxWidth: 500, minHeight: 400, bgcolor: "#F3DC9E" }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image="https://cdn.cafeata.com/photos/photo_0x6b12a5a93f0bbe85_0x3e0c6206b2661e00_1625287217108523.jpg"
          alt={props.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name} ({props.category})
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {props.description}
          </Typography>
          <Divider />
          <Typography>Rating</Typography>
          <Rating name="read-only" value={props.rating} readOnly />
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
