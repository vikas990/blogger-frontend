import { React, useState } from "react";
import {
  Grid,
  Container,
  Button,
  Typography,
  Card,
  CardContent,
  CardActions,
  CardActionArea,
  CardMedia,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100vw",
    height: "100vh",
    borderRadius: "borderRadius",
    paddingTop: 30,
  },
}));

function Post({ posts }) {
  const PF = "https://blogger1-vikas.herokuapp.com/images/";
  const classes = useStyles();
  const [isTurncated, setIsturncated] = useState(true);
  return (
    <Container className={classes.root}>
      <Grid container spacing={4}>
        {posts.map((p) => (
          <Grid item sm={3}>
            <Card style={{ height: "50vh" }}>
              <CardActionArea>
                {p.photo && (
                  <CardMedia
                    component="img"
                    image={PF + p.photo}
                    style={{ height: 200 }}
                  />
                )}
                <CardContent>
                  <Typography variant="h4">
                    {isTurncated && p.title.slice(0, 10)}
                  </Typography>
                  <Typography>
                    Published - {new Date(p.createdAt).toDateString()}
                  </Typography>
                  <Typography variant="subtitle1">
                    {isTurncated && p.desc.slice(0, 50)}
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography>4 min Read</Typography>
                <Button>
                  <Link to={`/singlePost/${p._id}`}>Read More</Link>
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Post;
