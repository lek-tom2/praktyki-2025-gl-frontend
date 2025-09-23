"use client";
import { ReactNode, useEffect, useLayoutEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiLinks } from "@/gl-const/api-links";
import toast from "react-hot-toast";
import useUserContext from "./gl-context/UserContextProvider";
import { User } from "./gl-types/user-types";
import Languages from "./gl-const/languages";
import Themes from "./gl-const/themes";

const logout = () => {
  const { User, UserDispatch } = useUserContext();
  UserDispatch({
    type: "setUser",
    value: {
      username: null,
      profilePicture: null,
      theme: Themes.glLight,
      userId: null,
      email: null,
      accountVerified: null,
      passwordLength: null,
      authorities: null,
      accountNonLocked: null,
      token: null,
      languageIso2: Languages.en,
    },
  });
  localStorage.clear();
};

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
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const { User, UserDispatch } = useUserContext();

  useEffect(() => {
    const accessToken = localStorage.getItem("access");
    const refreshToken = localStorage.getItem("refresh");

    const refresh = async () => {
      try {
        const response = await fetch(ApiLinks.refresh, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh: refreshToken }),
        });

        if (!response.ok) {
          console.log("logout");

          toast.error("Your session is invalid. Logout", { duration: 5000 });
          router.push("/403");
          setIsError(true);
          logout();
          return;
        }
        const body = await response.json();
        localStorage.setItem("access", body.access);
      } catch (err) {
        console.error(err);
        // router.push("/error");
        setIsError(true);
        return;
      } finally {
        setIsLoading(false);
      }
    };

    const verify = async () => {
      try {
        const response = await fetch(
          checkAuth ? ApiLinks.jwtVerify : ApiLinks.jwtLogin,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          refresh();
          console.log("logout");

          toast.error("Your session is invalid. Logout", { duration: 5000 });
          router.push("/403");
          setIsError(true);
          logout();
          return;
        }

        if (!checkAuth) {
          const body = await response.json();
          console.log("bdy", body);
          const user = body.detail.user as User;
          UserDispatch({ type: "setUser", value: { ...user } });
        }
      } catch (err) {
        console.error(err);
        // router.push("/error");
        setIsError(true);
        return;
      } finally {
        setIsLoading(false);
      }
    };

    verify();

    const interval = setInterval(verify, 1 * 60 * 1000); // 15 min
    return () => clearInterval(interval);
  }, [router]);

  return (
    <>
      {isLoading ? (
        isError ? (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-1/4 aspect-[2/1] bg-secondary text-base-content flex items-center just text-center rounded-3xl">
              Error! Logging out.
            </div>
          </div>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="w-1/4 aspect-[2/1] bg-secondary text-base-content flex items-center justify-center text-center rounded-3xl">
              Loading...
            </div>
          </div>
        )
      ) : isError ? (
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-1/4 aspect-[2/1] bg-secondary text-base-content flex items-center justify-center text-center rounded-3xl">
            Error! Logging out.
          </div>
        </div>
      ) : (
        children
      )}
    </>
  );
}
