import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUserObj } from "../features/Profile/profileSlice.js";
import { useEffect, useState } from "react";
import { getUser } from "../api/user.js";

export function useFetchUser() {
    const location = useLocation();
    const dispatch = useDispatch();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            setIsLoading(true);

            const res = await getUser();
            if (!res) {
                setIsLoading(false);
                return;
            }

            let data = {
                _id: res?.user?._id ?? "",
                firstName: res?.user?.firstName ?? "",
                lastName: res?.user?.lastName ?? "",
                email: res?.user?.email ?? "",
                about: res?.user?.about ?? "",
                imageUrl: res?.user?.imageUrl ?? "",
                googleId: res?.user?.googleId ?? "",
                createdAt: res?.user?.createdAt ?? "",
                rooms: res?.user?.rooms ?? []
            }

            setIsAuthenticated(true);
            dispatch(setUserObj(data));
            setIsLoading(false);
        };

        fetchUser();
    }, [location]);

    return { isAuthenticated, isLoading };
}