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
    <Card sx={{ maxWidth: 500 }}>
      <CardActionArea>
        <CardMedia component="img" height="140" image="" alt={props.name} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {props.name}
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

// {
//   name: "Ramen Zundo",
//   description:
//     "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent urna ex, porttitor vel libero vitae, elementum condimentum elit. Nam quis nisi fringilla, posuere purus nec, ultrices ante. Phasellus consequat sapien a erat tempor, scelerisque tempor odio ultrices. Etiam at ipsum dapibus, blandit ipsum sit amet, euismod elit. Curabitur posuere rhoncus.",
//   rating: 4,
//   category: "Ramen",
//   location: "Sydney",
//   pricing: "low",
// },
