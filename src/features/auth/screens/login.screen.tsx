import LoginForm from "../components/login/LoginForm";
import LoginHero from "../components/login/LoginHero";

export default function LoginScreen() {
  return (
    <>
    <div className="container py-16 mx-auto px-4" id="login-section">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
        <LoginHero/>
        <LoginForm/>
      </div>
    </div>
    </>
  )
}
