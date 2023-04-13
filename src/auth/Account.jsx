import { useState, useEffect } from "react";
 import { supabase } from "../api/supabaseClient";
 import { Button, Grid, TextField } from "@mui/material";
 import Avatar from "./Avatar";
 import { useNavigate } from "react-router-dom";

 const styles = {
   container: {
     alignItems: "center",
     flexDirection: "column",
     marginTop: "10px",
   },
 };

 export default function Account({ session }) {
   const navigate = useNavigate();
   const [loading, setLoading] = useState(true);
   const [username, setUsername] = useState(null);
   const [website, setWebsite] = useState(null);
   const [avatar_url, setAvatarUrl] = useState(null);

   useEffect(() => {
     async function getProfile() {
       setLoading(true);
       const { user } = session;

       let { data, error } = await supabase
         .from("profiles")
         .select(`username, website, avatar_url`)
         .eq("id", user.id)
         .single();

       if (error) {
         console.warn(error);
       } else if (data) {
         setUsername(data.username);
         setWebsite(data.website);
         setAvatarUrl(data.avatar_url);
       }

       setLoading(false);
     }

     getProfile();
   }, [session]);

   async function updateProfile(event) {
     event.preventDefault();

     setLoading(true);
     const { user } = session;

     const updates = {
       id: user.id,
       username,
       website,
       avatar_url,
       updated_at: new Date(),
     };

     let { error } = await supabase.from("profiles").upsert(updates);

     if (error) {
       alert(error.message);
     }
     setLoading(false);
   }

   const onLogout = async () => {
     await supabase.auth.signOut();
     navigate("/");
   };

   return (
     <form onSubmit={updateProfile}>
       <Grid container spacing={3} sx={styles.container}>
         <Grid item>
           <Avatar
             url={avatar_url}
             size={200}
             onUpload={(url) => {
               setAvatarUrl(url);
             }}
           />
         </Grid>
         <Grid item width={500}>
           <TextField
             fullWidth
             id="email"
             label="Email"
             disabled
             value={session.user.email}
           />
         </Grid>
         <Grid item width={500}>
           <TextField
             fullWidth
             id="username"
             label="Name"
             required
             value={username || ""}
             onChange={(e) => setUsername(e.target.value)}
           />
         </Grid>
         <Grid item width={500}>
           <TextField
             fullWidth
             id="website"
             label="Website"
             type="website"
             value={website || ""}
             onChange={(e) => setWebsite(e.target.value)}
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