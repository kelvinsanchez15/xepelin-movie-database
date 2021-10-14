import { useState } from "react";
import Image from "next/image";
import {
  Box,
  Card,
  CardActionArea,
  Dialog,
  DialogContent,
  Typography,
} from "@mui/material";

function MovieDetailsDialog({ open, onClose, title, overview, backdropPath }) {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogContent sx={{ padding: "40px 30px" }}>
        <Box
          sx={{
            display: "flex",
            flex: "1 1 500px",
            position: "relative",
          }}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              height: 532,
              width: 355,
              borderRadius: "6px",
              boxShadow: "0px 4px 24px rgba(0, 0, 0, 0.4)",
            }}
          >
            <Image
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${backdropPath}`}
              layout="fill"
              objectFit="cover"
              alt={title}
            />
          </Box>

          <Box
            sx={{
              flex: "1 0 500px",
              maxHeight: 532,
              overflow: "auto",
              padding: "30px",
            }}
          >
            <Typography
              variant="h4"
              component="h5"
              sx={{ fontWeight: "bold", mb: 3 }}
            >
              {title}
            </Typography>
            <Typography
              variant="h6"
              component="p"
              sx={{ color: "text.secondary" }}
            >
              {overview}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}

export default function MovieCard({
  title,
  releaseDate,
  backdropPath,
  overview,
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleClickOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <Card sx={{ width: 188, boxShadow: "none" }}>
        <CardActionArea onClick={handleClickOpenDialog}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: 188,
              height: 282,
              borderRadius: "6px",
              mb: 2,
            }}
          >
            <Image
              src={`https://www.themoviedb.org/t/p/w220_and_h330_face${backdropPath}`}
              layout="fill"
              objectFit="cover"
              alt={title}
            />
          </Box>

          <Typography
            component="h5"
            sx={{
              fontWeight: "bold",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
              overflow: "hidden",
            }}
          >
            {title}
          </Typography>
          <Typography component="p" sx={{ color: "text.secondary" }}>
            {releaseDate}
          </Typography>
        </CardActionArea>
      </Card>
      <MovieDetailsDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        title={title}
        overview={overview}
        backdropPath={backdropPath}
      />
    </>
  );
}
