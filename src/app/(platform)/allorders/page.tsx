import { redirect } from "next/navigation";

// Stripe returns here after a successful online payment
export default function AllOrdersPage() {
    redirect("/orders");
}
