import { useEffect, useState } from "react";
 import { supabase } from "../api/supabaseClient";
 import { Box, Button, CircularProgress, IconButton } from "@mui/material";
 import { AddAPhoto, Delete } from "@mui/icons-material";

 export default function Avatar({ url, size, onUpload }) {
   const [avatarUrl, setAvatarUrl] = useState(null);
   const [uploading, setUploading] = useState(false);

   useEffect(() => {
     if (url) downloadImage(url);
   }, [url]);

   async function downloadImage(path) {
     try {
       const { data, error } = await supabase.storage
         .from("avatars")
         .download(path);
       if (error) {
         throw error;
       }
       const url = URL.createObjectURL(data);
       setAvatarUrl(url);
     } catch (error) {
       console.log("Error downloading image: ", error.message);
     }
   }

   async function uploadAvatar(event) {
     try {
       setUploading(true);

       if (!event.target.files || event.target.files.length === 0) {
         throw new Error("You must select an image to upload.");
       }

       const file = event.target.files[0];
       const fileExt = file.name.split(".").pop();
       const fileName = `${Math.random()}.${fileExt}`;
       const filePath = `${fileName}`;

       let { error: uploadError } = await supabase.storage
         .from("avatars")
         .upload(filePath, file);

       if (uploadError) {
         throw uploadError;
       }

       onUpload(filePath);
     } catch (error) {
       alert(error.message);
     } finally {
       setUploading(false);
     }
   }

   return (
     <Box display="flex" flexDirection="column">
       {avatarUrl ? (
         <Box
           component="img"
           src={avatarUrl}
           alt="Avatar"
           className="avatar image"
           style={{ height: size, width: size, borderRadius: "50%" }}
         />
       ) : (
         <Box
           className="avatar no-image"
           style={{
             height: size,
             width: size,
             borderRadius: "50%",
             backgroundColor: "lightgray",
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
             color: "white",
           }}
         >
           <AddAPhoto style={{ fontSize: size / 2 }} />
         </Box>
       )}
       <Box marginTop={1} width={size} display="flex">
         <input
           type="file"
           accept="image/*"
           id="upload-avatar"
           onChange={uploadAvatar}
           style={{ display: "none" }}
         />
         <label htmlFor="upload-avatar">
           <Button
             component="span"
             size="small"
             disabled={uploading}
             startIcon={
               uploading ? (
                 <CircularProgress size={20} />
               ) : (
                 <AddAPhoto fontSize="small" />
               )
             }
           >
             {uploading ? "Uploading..." : avatarUrl ? "Change" : "Upload"}
           </Button>
         </label>
         {avatarUrl && (
           <IconButton
             onClick={(e) => {
               setAvatarUrl(null);
               onUpload(null);
             }}
             disabled={uploading}
             size="small"
           >
             <Delete fontSize="small" />
           </IconButton>
         )}
       </Box>
     </Box>
   );
 }