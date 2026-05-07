import { Routes, Route, useNavigate } from "react-router-dom";
import { TopAppBar } from "./components/Layout Components/TopAppBar.jsx";
import { Card } from "./components/UI Components/Card.jsx";
import { Button } from "./components/UI Components/Button.jsx";
import { Icon } from "./components/UI Components/Icon.jsx";
import { Home } from "./Home.jsx";
function App() {
  const navigate = useNavigate(); // This hook allows you to navigate programmatically

  return (
    <Routes>
      {/* Route for the Signup/Login Page */}
      <Route
        path="/"
        element={
          <div className="min-h-screen bg-slate-50 flex flex-col">
            <TopAppBar />

            <main className="flex-grow flex items-center justify-center p-4">
              <Card className="max-w-md w-full p-8 shadow-lg bg-white">
                <div className="text-center mb-8">
                  <h1 className="text-2xl font-bold text-slate-800">
                    Create an Account
                  </h1>
                  <p className="text-slate-500">Sign up to manage your rides</p>
                </div>

                <form 
                  className="space-y-6" 
                  onSubmit={(e) => {
                    e.preventDefault(); // Prevents the page from refreshing
                    navigate("/home"); // Navigates to the home page
                  }}
                >
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      className="w-full p-3 border border-slate-300 rounded-md outline-blue-500"
                      placeholder="name@example.com"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      className="w-full p-3 border border-slate-300 rounded-md outline-blue-500"
                      placeholder="••••••••"
                      required
                    />
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full py-3 bg-blue-600 text-white rounded-md"
                  >
                    Sign up
                  </Button>
                </form>
              </Card>
            </main>
          </div>
        }
      />

      {/* Route for the Home Page */}
      <Route path="/home" element={<Home />} />
    </Routes>
  );
}

export default App;