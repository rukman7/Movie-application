import { useState } from "react";
 import {
   Grid,
   Paper,
   Avatar,
   TextField,
   Button,
   Alert,
   Typography,
 } from "@mui/material";
 import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

 import Spinner from "../components/spinner";
 import { supabase } from "../api/supabaseClient";

 const Auth = () => {
   const paperStyle = {
     padding: 20,
     height: 250,
     width: 300,
     margin: "20vh auto",
   };
   const avatarStyle = { backgroundColor: "#1bbd7e" };
   const btnstyle = { marginTop: 20, height: 50 };

   const [loading, setLoading] = useState(false);
   const [success, setSuccess] = useState(false);
   const [errorMsg, setErrorMsg] = useState("");
   const [email, setEmail] = useState("");

   const handleLogin = async (event) => {
     event.preventDefault();
     if (!email) {
       alert("Email required!");
       return;
     }

     setLoading(true);

     const { error } = await supabase.auth.signInWithOtp({ email });

     if (error) {
       setErrorMsg(error.error_description || error.message);
     } else {
       setSuccess(true);
     }

     setLoading(false);
   };

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

   if (success) {
     return (
       <Alert
         severity="success"
         variant="filled"
         style={{ ...paperStyle, height: 50 }}
       >
         <Typography variant="h6">Please check your email</Typography>
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
           <h2>Sign In</h2>
         </Grid>
         <TextField
           label="Email"
           type="email"
           autoFocus
           placeholder="Enter email"
           variant="outlined"
           fullWidth
           value={email}
           onChange={(e) => setEmail(e.target.value)}
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
       </Paper>
     </Grid>
   );
 };

 export default Auth;