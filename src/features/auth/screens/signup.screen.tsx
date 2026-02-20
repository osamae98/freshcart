import SignupForm from "../components/signup/SignupForm"
import SignupHero from "../components/signup/SignupHero";

export default function SignupScreen() {
    return <>

    <main className="py-10">
        <div className="container mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 p-4">
            <SignupHero/>
            <SignupForm/>
        </div>
    </main>
    </>;

}