import React from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  Avatar,
  Box,
  CardActions,
  Button,
  Rating,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";

const therapists = [
  {
    id: 1,
    name: "Dr. John Doe",
    rating: 4.5,
    location: "New York, NY",
    contact: "123-456-7890",
    email: "john.doe@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    id: 2,
    name: "Dr. Jane Smith",
    rating: 4.7,
    location: "Los Angeles, CA",
    contact: "987-654-3210",
    email: "jane.smith@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  {
    id: 3,
    name: "Dr. Emily Brown",
    rating: 4.3,
    location: "Chicago, IL",
    contact: "555-123-4567",
    email: "emily.brown@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    id: 4,
    name: "Dr. Michael Johnson",
    rating: 4.6,
    location: "San Francisco, CA",
    contact: "555-987-6543",
    email: "michael.johnson@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 5,
    name: "Dr. Sarah Wilson",
    rating: 4.8,
    location: "Austin, TX",
    contact: "555-234-5678",
    email: "sarah.wilson@example.com",
    profilePicture: "https://randomuser.me/api/portraits/women/8.jpg",
  },
  {
    id: 6,
    name: "Dr. David Lee",
    rating: 4.4,
    location: "Seattle, WA",
    contact: "555-345-6789",
    email: "david.lee@example.com",
    profilePicture: "https://randomuser.me/api/portraits/men/9.jpg",
  },
];

const TherapistCard = ({ therapist }) => (
  <Card
    sx={{
      display: "flex",
      flexDirection: "row",
      marginBottom: "20px",
      overflow: "hidden",
    }}
  >
    <CardMedia>
      <Avatar
        src={therapist.profilePicture}
        alt={therapist.name}
        sx={{ width: 100, height: 100, margin: 2 }}
      />
    </CardMedia>
    <Box sx={{ display: "flex", flexDirection: "column", flex: 1, padding: 2 }}>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6" noWrap>
          {therapist.name}
        </Typography>
        <Rating
          value={therapist.rating}
          readOnly
          precision={0.1}
          sx={{ marginY: 1 }}
        />
        <Typography variant="body2" color="text.secondary" noWrap>
          {therapist.location}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          startIcon={<PhoneIcon />}
          href={`tel:${therapist.contact}`}
          target="_blank"
        >
          Call
        </Button>
        <Button
          size="small"
          startIcon={<EmailIcon />}
          href={`mailto:${therapist.email}`}
          target="_blank"
        >
          Email
        </Button>
      </CardActions>
    </Box>
  </Card>
);

const TherapistProfiles = () => (
  <Box sx={{ padding: "20px" }}>
    <Typography
      variant="h4"
      component="h1"
      gutterBottom
      color="primary.main"
      align="center"
    >
      Reccomended Therapists
    </Typography>
    <Grid container spacing={2}>
      {therapists.map((therapist) => (
        <Grid item xs={12} sm={6} md={4} key={therapist.id}>
          <TherapistCard therapist={therapist} />
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default TherapistProfiles;
