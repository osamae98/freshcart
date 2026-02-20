import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { clearToken } from "../server/auth.actions";
import { setAuthInfo } from "../store/auth.slice";
import { toast } from "react-toastify";

export default function useLogout(){
    const dispatch = useDispatch();
    const router = useRouter();



    const logout = async () => {
        await clearToken();

        dispatch(setAuthInfo({
            isAuthenticated: false,
            userInfo: null
        }))

        toast.success("Logged out successfully");

        router.push("/login");

        router.refresh()
    }

    return { logout };
}