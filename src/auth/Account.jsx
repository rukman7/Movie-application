import { useState, useEffect } from "react";
//  import { supabase } from "../api/supabaseClient";
 import { Button, Grid, TextField } from "@mui/material";
//  import Avatar from "./Avatar";
//  import { useNavigate } from "react-router-dom";
import { getUser, logOutUser, updateUser } from "../api/authApiExpress";

 const styles = {
   container: {
     alignItems: "center",
     flexDirection: "column",
     marginTop: "10px",
   },
 };

 export default function Account() {
  const user = getUser();
  const [loading, setLoading] = useState(false);
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);

   async function updateProfile(event) {
     event.preventDefault();

     setLoading(true);
     await updateUser({ firstName, lastName });
     setLoading(false);
   }

   const onLogout = async () => {
    logOutUser();
    window.location.reload();
   };

   return (
     <form onSubmit={updateProfile}>
       <Grid container spacing={3} sx={styles.container}>
         <Grid item width={500}>
           <TextField
             fullWidth
             id="email"
             label="Email"
             disabled
             value={user.email}
           />
         </Grid>
         <Grid item width={500}>
           <TextField
             fullWidth
             id="firstName"
             label="First Name"
             required
             value={firstName || ""}
             onChange={(e) => setFirstName(e.target.value)}
           />
         </Grid>
         <Grid item width={500}>
           <TextField
             fullWidth
             id="lastName"
             label="Last Name"
             required
             value={lastName || ""}
             onChange={(e) => setLastName(e.target.value)}
           />
         </Grid>
         <Grid item>
           <Button
             variant="contained"
             color="primary"
             type="submit"
             disabled={loading}
           >
             {loading ? "Loading ..." : "Update"}
           </Button>
           <Button
             variant="contained"
             color="error"
             style={{ marginLeft: 10 }}
             onClick={onLogout}
           >
             Logout
           </Button>
         </Grid>
       </Grid>
     </form>
   );
 }