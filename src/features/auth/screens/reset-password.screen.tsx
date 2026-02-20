import ResetPasswordForm from "../components/reset-password/ResetPasswordForm";

export default function ResetPasswordScreen() {
    return (
        <main className="min-h-screen bg-gray-50 flex items-center justify-center py-16 px-4">
            <div className="container mx-auto">
                <ResetPasswordForm />
            </div>
        </main>
    );
}
