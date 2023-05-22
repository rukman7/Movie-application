import { updateOptions } from "../util";

 export async function fetcher(url, options) {
     return await fetch(url, updateOptions(options));
 }

 export const getToken = () => localStorage.getItem("token");
 export const setToken = (token) => localStorage.setItem("token", token);
 export const getUser = () => JSON.parse(localStorage.getItem("user"));
 export const setUser = (user) => localStorage.setItem("user", JSON.stringify(user));

 export const logOutUser = () => {
     localStorage.removeItem("token");
     localStorage.removeItem("user");
 }

 export async function register({ firstName, lastName, email, password }) {
     try {
         const response = await fetcher(`api/accounts/`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ firstName, lastName, email, password })
         });
         if (!response.ok) {
             throw new Error('Error creating account');
         }
         const data = await response.json();
         return data;
     } catch (error) {
         return Promise.reject(error);
     }
 }

 export async function authenticate({ email, password }) {
     const response = await fetcher("api/accounts/security/token", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify({ email, password }),
     });
     if (response.ok) {
         const data = await response.json();
         return data;
     } else {
         throw new Error(response.statusText);
     }
 }

 export async function updateUser({ firstName, lastName }) {
     try {
         const response = await fetcher(`api/accounts/` + getUser().id, {
             method: 'PUT',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify({ firstName, lastName })
         });
         if (!response.ok) {
             throw new Error('Error creating account');
         }
         const data = await response.json();
         setUser({ ...getUser(), firstName: data.firstName, lastName: data.lastName })
         return data;
     } catch (error) {
         return Promise.reject(error);
     }
 }