import { ReactNode } from "react";
import ProfileSidebar from "./ProfileSidebar";

interface ProfileLayoutProps {
    children: ReactNode;
}

export default function ProfileLayout({ children }: ProfileLayoutProps) {
    return (
        <div className="bg-gray-50 min-h-[calc(100vh-80px)] py-12">
            <div className="container">
                <div className="grid lg:grid-cols-[300px_1fr] gap-8">
                    <ProfileSidebar />
                    <main>
                        {children}
                    </main>
                </div>
            </div>
        </div>
    );
}
