import {
  Modal,
  Dialog,
  TextField,
  Box,
  Typography,
  FormHelperText,
  TextareaAutosize,
} from "@mui/material";
import { useState } from "react";

export default function AddRestaurantModal() {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <button type="button" onClick={handleOpen}>
        Add Restaurant
      </button>
      <Dialog open={open}>
        <Box>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleClose();
            }}
          >
            <div>
              <Typography>Restaurant</Typography>
              <TextField
                name="restaurant"
                helperText="restaurant"
                placeholder="restaurant"
              />
              <FormHelperText>your restaurant</FormHelperText>
            </div>
            <div>
              {/* <Typography>Description</Typography> */}
              {/* <TextareaAutosize minRows={3} name="restaurant" /> */}
              <Typography>Description</Typography>
              <TextField
                label="description"
                InputProps={{ style: { fontSize: 40 } }}
                InputLabelProps={{ style: { fontSize: 20 } }}
                name="description"
                multiline
                rows={3}
              />
            </div>
            <div>
              <button type="submit">Submit</button>
              <button>Save</button>
              <button onClick={handleOpen}>Close</button>
            </div>
          </form>
        </Box>
      </Dialog>
    </div>
  );
}
