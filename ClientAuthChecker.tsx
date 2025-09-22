"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiLinks } from "@/gl-const/api-links";
import toast from "react-hot-toast";
import useUserContext from "./gl-context/UserContextProvider";
<<<<<<< HEAD
import { User } from "./gl-types/user-types";
=======
>>>>>>> 797999ab

type ClientAuthCheckerProps = {
  children: ReactNode;
  checkAuth?: boolean;
  performAuthorization: boolean;
};

export default function ClientAuthChecker({
  children,
  checkAuth = false,
  performAuthorization,
}: ClientAuthCheckerProps) {
  if (!performAuthorization) {
    return <>{children}</>;
  }

  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

<<<<<<< HEAD
  const { User, UserDispatch } = useUserContext();

  useEffect(() => {
    const access = localStorage.getItem("access");
    const verify = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          checkAuth ? ApiLinks.jwtVerify : ApiLinks.jwtLogin,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.log("logout");
          toast.error("Your session is invalid. Logout", { duration: 5000 });
          router.push("/403");
          return;
        }

        if (!checkAuth) {
          const body = await response.json();
          console.log("bdy");
          console.log(body);
          const user = body.detail.user as User;
          UserDispatch({ type: "setUser", value: { ...user } });
        }
        setIsLoading(false);
      } catch (err) {
        console.error(err);
        router.push("/error");
        setIsLoading(false);
      }
    };

    verify();

=======
  useEffect(() => {
    const access = localStorage.getItem("access");
    const verify = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          checkAuth ? ApiLinks.jwtVerify : ApiLinks.jwtLogin,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${access}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          console.log("logout");
          toast.error("Your session is invalid. Logout", { duration: 5000 });
          router.push("/403");
          return;
        }

        if (!checkAuth) {
          const { User, UserDispatch } = useUserContext();
          const body = await response.json();
          console.log(body);
          UserDispatch({ type: "setUser", value: body.details.user });
        }
      } catch (err) {
        console.error(err);
        router.push("/error");
      } finally {
        setIsLoading(false);
      }
    };

    verify();

>>>>>>> 797999ab
    const interval = setInterval(verify, 15 * 60 * 1000); //15 min
    return () => clearInterval(interval);
  }, [router]);

  return (
    <>
      {isLoading ? (
        <div className="w-full h-full flex items-center justify-center">
          Loading...
        </div>
      ) : (
        children
      )}
    </>
  );
}
