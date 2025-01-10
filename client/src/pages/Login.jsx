import trophy from '../assets/image.png'; 
import icon from '../assets/ball.png'; 
import { useEffect, useState } from 'react';
import { serverApi } from '../../utils/api';
import { useNavigate } from 'react-router';


function LoginForm() {
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const { data } = await serverApi.post("/login", {
                email,
                password
            });
            console.log(data);
    
            localStorage.setItem("access_token", data.access_token);
            navigate("/news");
        } catch (error) {
            console.log(" ~ handleLogin ~ error", error); // Log the actual error
        }
    }
    async function handleCredentialResponse(response) {
        console.error("Encoded JWT ID token: " + response.credential);

        try {
            const {data} = await serverApi.post('/login/google', {googleToken: response.credential})
    
            localStorage.setItem("access_token", data.access_token);
            navigate("/news");
        } catch (error) {
            console.error(error, response);
        }

    }

    useEffect(() => {
        google.accounts.id.initialize({
            client_id: "375008378042-vs5sgdbh51bsa39l2rdmnudo3bkm03d8.apps.googleusercontent.com",
            callback: handleCredentialResponse,
        });
        google.accounts.id.renderButton(
        document.getElementById("buttonDiv"),
        { theme: "outline", size: "large" }  // customization attributes
        );
    })

    return (
        <div class="mx-auto flex flex-col lg:flex-row items-center h-screen">
            <div class="w-full lg:w-1/2 h-full flex justify-center lg:justify-start mb-8 lg:mb-0">
                <img src={trophy} alt="logo" class="w-full h-full object-cover" />
            </div>

            <div class="w-full lg:w-1/2 flex justify-center items-center h-full">
                <div class="bg-white shadow-md rounded-lg p-6 w-full max-w-md mx-4">
                    <h2 class="text-2xl font-semibold text-center text-gray-800 mb-4">
                        <img src={icon} alt="Icon" class="w-8 h-8 mr-2 inline-block" />
                        The Ultimate Football Dashboard
                    </h2>
                    <form onSubmit={handleLogin}>
                        <div class="mb-4">
                            <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Enter your email"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required />
                        </div>

                        <div class="mb-4">
                            <label for="password" class="block text-gray-700 font-medium mb-2">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Enter your password"
                                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required />
                        </div>

                        <button
                            type="submit"
                            class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                            Login
                        </button>
                    </form>
                    <div class="my-12 border-b text-center">
                        <div
                            class="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-white transform translate-y-1/2">
                            Or
                        </div>
                    </div>
                    <div 
                        class="flex items-center justify-center space-x-4 mt-3"
                        id="buttonDiv">
                    </div>
                    {/* <div class="flex items-center justify-center space-x-4 mt-3">
                        <button  id="buttonDiv" class="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="w-6 h-6 mr-3"            >
                                <path fill-rule="evenodd" d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"              ></path>
                            </svg>
                            Github
                        </button>
                        <button            class="flex items-center py-2 px-4 text-sm uppercase rounded bg-white hover:bg-gray-100 text-indigo-500 border border-transparent hover:border-transparent hover:text-gray-700 shadow-md hover:shadow-lg font-medium transition transform hover:-translate-y-0.5"          >
                            <svg              xmlns="http://www.w3.org/2000/svg"              class="w-6 h-6 mr-3"              viewBox="0 0 48 48"            >
                                <path                fill="#fbc02d"                d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"              />
                                <path                fill="#e53935"                d="m6.306 14.691 6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z"              />
                                <path                fill="#4caf50"                d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"              />
                                <path                fill="#1565c0"                d="M43.611 20.083 43.595 20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002 6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"              />
                            </svg>
                            Google
                        </button>
                    </div> */}

                    <p class="text-sm text-gray-600 text-center mt-4">
                        Don't have an account yet?
                        <a href="/register" class="text-blue-600 hover:underline"> Register</a>.
                    </p>
                </div>
            </div>
        </div>

    );
}

export default LoginForm;