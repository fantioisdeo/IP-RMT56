import trophy from '../assets/image.png'; 
import icon from '../assets/ball.png'; 

function RegisterForm() {
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
                <form action="#" method="POST">
                    <div class="mb-4">
                        <label for="name" class="block text-gray-700 font-medium mb-2">Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            name="name" 
                            placeholder="Enter your name"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
                            required />
                    </div>
                    
                    <div class="mb-4">
                        <label for="email" class="block text-gray-700 font-medium mb-2">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Enter your email"
                            class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-200 focus:outline-none"
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
                            required />
                    </div>

                    <button
                        type="submit"
                        class="w-full py-2 px-4 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition">
                        Register
                    </button>
                </form>

                <p class="text-sm text-gray-600 text-center mt-4">
                    Already have an account? 
                    <a href="/login" class="text-blue-600 hover:underline"> Login here</a>.
                </p>
            </div>
        </div>
    </div>

  );
}

export default RegisterForm;