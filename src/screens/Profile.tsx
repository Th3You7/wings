import { useContext, useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Card } from "../components";
import { Navigate } from "react-router-dom";
import { MainContext } from "../providers/MainProvider";
import { DataContext } from "../providers/DataProvider";
import { fetchData } from "../apis/fetchData";
import { DATA_FETCH } from "../utils/constants";

function Profile(): JSX.Element {
  const {
    state: { user },
  } = useContext(MainContext);
  const {
    dataState: { loading, error, data },
    dataDispatch,
  } = useContext(DataContext);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dataDispatch({ type: DATA_FETCH.DATA_LOADING, payload: [] });

    try {
      const fetchIt = async () => {
        const res: any = await fetchData(page);
        const result = res.data.map(
          (x: { userId: 1; id: number; title: string; body: string }) => {
            const { id, title, body } = x;
            return { id, title, body };
          }
        );
        return result;
      };

      fetchIt().then((res) => {
        dataDispatch({ type: DATA_FETCH.DATA_SUCCESS, payload: res });
      });
    } catch (error) {
      dataDispatch({ type: DATA_FETCH.DATA_ERROR, payload: [] });
    }
  }, [page, dataDispatch]);

  //* if the user not logged in redirect him to login page
  if (!user.token) return <Navigate to="/login" replace={true} />;

  if (error)
    return (
      <Typography variant={"h2"} component={"h2"}>
        Oops!! something went wrong
      </Typography>
    );

  if (loading)
    return (
      <Grid container spacing={2} rowSpacing={2} columnSpacing={2}>
        {Array.from({ length: 5 }, (_, i) => i).map((_, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
            <Card />
          </Grid>
        ))}
      </Grid>
    );

  return (
    <>
      <Grid container spacing={2} rowSpacing={2} columnSpacing={2}>
        {data.map((x, i) => (
          <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
            <Card title={x.title} body={x.body} />
          </Grid>
        ))}
      </Grid>
      <Grid
        container
        flexDirection={"row"}
        spacing={2}
        rowSpacing={2}
        columnSpacing={2}
        sx={{ marginTop: 4 }}
      >
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => setPage(page - 1)}
            disabled={!!(page === 1)}
          >
            PREV
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Typography>Page: {page}</Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            onClick={() => setPage(page + 1)}
            disabled={!!(page === 10)}
          >
            NEXT
          </Button>
        </Grid>
      </Grid>
    </>
  );
}

export default Profile;
