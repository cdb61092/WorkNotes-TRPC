import { trpc } from '../utils/trpc';
import React from "react";

export const Hello = () => {
const hello = trpc.hello.useQuery();
const register = trpc.register.useMutation();
const login = trpc.login.useMutation({
    onSuccess({ token }) {
        console.log(`token: ${token}`);
        localStorage.setItem('token', token);
    }
});
const protectedroute = trpc.protected.useQuery();

const handleLogin = async () => {
    const token =  login.mutate({ email: 'sue@bob.com', password: 'test'});
}

// const testProtected = async () => {
//     protectedroute.
// }

return (
    <div>
        <button onClick={handleLogin}>ayo lets do that login thang</button>
        {/* <button onClick={testProtected}>protected</button> */}
    </div>
)


}