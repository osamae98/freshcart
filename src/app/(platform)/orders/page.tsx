import ProfileLayout from "@/features/profile/components/ProfileLayout";
import OrdersScreen from "@/features/orders/screens/OrdersScreen";
import { getUserOrders } from "@/features/orders/server/orders.actions";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "My Orders | FreshCart",
    description: "View and track your FreshCart orders",
};

export default async function OrdersPage() {
  const result = await getUserOrders();

  return (
    <ProfileLayout>
        <OrdersScreen
            orders={result.success ? result.data : []}
            error={result.success ? null : result.message}
        />
    </ProfileLayout>
  );
}
