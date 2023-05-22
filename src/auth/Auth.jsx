import { useState } from "react";
 import {
   Grid,
   Paper,
   Avatar,
   TextField,
   Button,
   Alert,
   Typography,
   Tab,
   Tabs,
 } from "@mui/material";
 import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

 import Spinner from "../components/spinner";
 import { authenticate, register } from "../api/authApiExpress";

 const Auth = ({ setDefaultHeaders }) => {
   const paperStyle = {
     padding: 20,
     height: 250,
     width: 300,
     margin: "20vh auto",
   };
   const avatarStyle = { backgroundColor: "#1bbd7e" };
   const btnstyle = { marginTop: 20, height: 50 };

   const [loading, setLoading] = useState(false);
   const [errorMsg, setErrorMsg] = useState("");
   const [email, setEmail] = useState("");
   const [firstName, setFirstName] = useState("");
   const [lastName, setLastName] = useState("");
   const [password, setPassword] = useState("");
   const [tabValue, setTabValue] = useState(0);

   const handleLogin = async (event) => {
     event.preventDefault();
     if (!email) {
       alert("Email required!");
       return;
     }

     setLoading(true);

     try {
      const response = await authenticate({ email, password });
      setDefaultHeaders(response);
    } catch (error) {
      setErrorMsg(error.message);
    }

    setLoading(false);
  };

  const handleRegister = async (event) => {
    event.preventDefault();
    if (!firstName || !lastName || !email || !password) {
      alert("Please fill all details!");
      return;
    }
    setLoading(true);

    try {
      await register({ firstName, lastName, email, password });
      setTabValue(0);
    } catch (error) {
      setErrorMsg(error.message);
    }

     setLoading(false);
   };
   const handleTabChange = (_, newValue) => setTabValue(newValue);

   if (loading) return <Spinner />;

   if (errorMsg.length) {
     return (
       <Alert
         severity="error"
         variant="filled"
         style={{ ...paperStyle, height: 150 }}
       >
         <Typography variant="h6">{errorMsg}</Typography>
       </Alert>
     );
   }

   return (
     <Grid>
       <Paper elevation={10} style={paperStyle}>
         <Grid align="center">
           <Avatar style={avatarStyle}>
             <LockOutlinedIcon />
           </Avatar>
           <Tabs value={tabValue} onChange={handleTabChange} centered>
             <Tab label="Sign In" />
             <Tab label="Register" />
           </Tabs>
         </Grid>
         {tabValue === 0 && (
           <>
             <TextField
               label="Email"
               type="email"
               autoFocus
               placeholder="Enter email"
               variant="outlined"
               fullWidth
               value={email}
              //  sx={fieldStyle}
               onChange={(e) => setEmail(e.target.value)}
             />
             <TextField
               label="Password"
               type="password"
               placeholder="Enter password"
               variant="outlined"
               fullWidth
               value={password}
              //  sx={fieldStyle}
               onChange={(e) => setPassword(e.target.value)}
             />
             <Button
               type="submit"
               color="primary"
               variant="contained"
               style={btnstyle}
               fullWidth
               onClick={handleLogin}
             >
               Sign in
             </Button>
           </>
         )}
         {tabValue === 1 && (
           <>
             <TextField
               label="First Name"
               type="text"
               placeholder="Enter first name"
               variant="outlined"
               fullWidth
               value={firstName}
              //  sx={fieldStyle}
               onChange={(e) => setFirstName(e.target.value)}
             />
             <TextField
               label="Last Name"
               type="text"
               placeholder="Enter last name"
               variant="outlined"
               fullWidth
               value={lastName}
              //  sx={fieldStyle}
               onChange={(e) => setLastName(e.target.value)}
             />
             <TextField
               label="Email"
               type="email"
               placeholder="Enter email"
               variant="outlined"
               fullWidth
               value={email}
              //  sx={fieldStyle}
               onChange={(e) => setEmail(e.target.value)}
             />
             <TextField
               label="Password"
               type="password"
               placeholder="Enter password"
               variant="outlined"
               fullWidth
               value={password}
              //  sx={fieldStyle}
               onChange={(e) => setPassword(e.target.value)}
             />
             <Button
               type="submit"
               color="primary"
               variant="contained"
               style={btnstyle}
               fullWidth
               onClick={handleRegister}
             >
               Register
             </Button>
           </>
         )}
       </Paper>
     </Grid>
   );
 };

 export default Auth;