import ProfileLayout from "@/features/profile/components/ProfileLayout";
import AccountDetailsScreen from "@/features/profile/screens/AccountDetailsScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Account Details | FreshCart",
    description: "Manage your FreshCart account details and password",
};

export default function ProfilePage() {
    return (
        <ProfileLayout>
            <AccountDetailsScreen />
        </ProfileLayout>
    );
}