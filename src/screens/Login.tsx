import { Box, Button, TextField } from "@mui/material";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import generateToken from "../utils/generateToken";
import { USER_ACTION } from "../utils/constants";
import { useContext } from "react";
import { MainContext } from "../providers/MainProvider";
import { Navigate, useNavigate } from "react-router-dom";

type FormValues = {
  //email: string;
  username: string;
  password: string;
};

//* Schema validation using yup
const schema = z.object({
  // email: z.string().email(),
  username: z.string().email({ message: "Enter a valid E-mail or username" }),
  password: z.string().min(6, { message: "Password be at least 6 chars" }),
});

const form = {
  "& .MuiTextField-root": {
    m: 1,
    // width: "100%",
  },
  "& .MuiButton-root": {
    m: 1,
    // width: "100%",
  },
};

function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      //email: "",
      username: "",
      password: "",
    },
    resolver: zodResolver(schema),

    mode: "onChange",
  });

  const {
    state: { user },
    dispatch,
  } = useContext(MainContext);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    //* fake token
    const token = generateToken(32);
    dispatch({ type: USER_ACTION.LOG_IN, payload: token });
    localStorage.setItem("user", JSON.stringify({ token }));
    navigate("/");
  };

  //*if the user is already logged in, skip the log in page and navihate him to profile screen
  if (user.token) return <Navigate to="/profile" replace={true} />;

  return (
    <Box
      component="form"
      sx={form}
      noValidate
      autoComplete="off"
      onSubmit={handleSubmit(onSubmit)}
    >
      {/* <Controller
        name={"email"}
        rules={{ required: true }}
        control={control}
        render={(field) => (
          <TextField
            {...field}
            required
            id="outlined"
            label="Email"
            type="email"
            fullWidth
            error={!!errors.email}
            color={errors.email && "error"}
            helperText={errors?.email?.message}
          />
        )}
      /> */}

      <Controller
        name={"username"}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            id="outlined"
            label="Username"
            type="email"
            fullWidth
            error={!!errors.username}
            color={errors.username && "error"}
            helperText={errors?.username?.message}
          />
        )}
      />

      <Controller
        name={"password"}
        control={control}
        render={({ field }) => (
          <TextField
            {...field}
            required
            id="outlined-password-input"
            label="Password"
            type="password"
            fullWidth
            error={!!errors.password}
            color={errors.password && "error"}
            helperText={errors?.password?.message}
          />
        )}
      />

      <Button variant="contained" type="submit" fullWidth>
        Submit
      </Button>
    </Box>
  );
}

export default Login;
