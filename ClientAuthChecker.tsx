"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { ApiLinks } from "@/gl-const/api-links";

export default function ClientAuthChecker({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await fetch(ApiLinks.jwtVerify, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        });

        if (!response.ok) {
          console.log("logout");
          router.push("/error");
        }
      } catch (err) {
        console.error(err);
        router.push("/error");
      }
    };

    verify();

    const interval = setInterval(verify, 15 * 60 * 1000); //15 min
    return () => clearInterval(interval);
  }, [router]);

  return <>{children}</>;
}
