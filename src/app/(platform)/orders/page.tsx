import ProfileLayout from "@/features/profile/components/ProfileLayout";
import OrdersScreen from "@/features/orders/screens/OrdersScreen";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Orders | FreshCart",
    description: "View and track your FreshCart orders",
};

export default function OrdersPage() {
  return (
    <ProfileLayout>
        <OrdersScreen />
    </ProfileLayout>
  );
}
