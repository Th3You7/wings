import { Paper, Skeleton, Typography } from "@mui/material";
import { useContext } from "react";
import { DataContext } from "../providers/DataProvider";

type Props = {
  title?: string;
  body?: string;
};

const Card = ({ title, body }: Props): JSX.Element => {
  const {
    dataState: { loading },
  } = useContext(DataContext);

  if (loading) {
    return <Skeleton variant="rectangular" height={150} />;
  }
  return (
    <Paper elevation={2} sx={{ p: 2 }}>
      <Typography variant="h6" component={"h2"}>
        {title}
      </Typography>
      <Typography variant="body2" component={"p"}>
        {body}
      </Typography>
    </Paper>
  );
};

export default Card;
