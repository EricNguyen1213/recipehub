// import type { User } from "../models/user";

import { authClient } from "../lib/auth-client";


export interface SignUpCredentials {
    name: string,
    email: string,
    password: string,
}

export async function handleSignUp(credentials: SignUpCredentials, callbackURL: string) {
    const authData = {...credentials, callbackURL: callbackURL};
    const { data, error } = await authClient.signUp.email(authData);
    if (error) {
        throw new Error(error.message);
    }
    console.log("Signed up:", data.user);
    console.log("User Session:", data.token);
}

// async function fetchData(input: RequestInfo, init?: RequestInit) {
//     const response = await fetch(input, init);
//     if (response.ok) {
//         return response;
//     }
//     const errorBody = await response.json();
//     const errorMessage = errorBody.error;
//     console.error(errorMessage);
// }

// export async function signUp(credentials: SignUpCredentials): Promise<User> {
//     const response = await fetchData("/api/auth/sign-up/email", 
//     {
//         method: "POST",
//         headers: {
//             "Content-Type": "application/json",
//         },
//         body: 
//     });
// }


