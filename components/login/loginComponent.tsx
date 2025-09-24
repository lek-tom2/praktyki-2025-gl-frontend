import React, { useState, useEffect } from "react";
import Input from "../input/input";
import useUserContext from "@/gl-context/UserContextProvider";
import { useRouter } from "next/navigation";
import { SubmitHandler, useForm } from "react-hook-form";
import { ApiLinks } from "@/gl-const/api-links";
import { User, UserBackend } from "@/gl-types/user-types";
import toast from "react-hot-toast";
import Button from "../button";
import FormErrorWrap from "../FormError/formErrorWrap";
import FormErrorParahraph from "../FormError/formErrorParagraph";
import Themes from "@/gl-const/themes";

type formProps = {
  login: string | null;
  password: string | null;
  remember: boolean;
};

const LoginComponent = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    getValues,
    setError,
    setValue,
  } = useForm<formProps>({
    mode: "onTouched",
    reValidateMode: "onChange",
  });

  const { User, UserDispatch } = useUserContext();
  const router = useRouter();
  const prefersDark = typeof window !== 'undefined' 
    ? window.matchMedia("(prefers-color-scheme: dark)").matches 
    : false;
  const theme = prefersDark ? Themes.glDark : Themes.glLight;

  // Funkcja automatycznego logowania
  const autoLogin = async (login: string, password: string) => {
    try {
      setIsLoading(true);
      const response = await fetch(ApiLinks.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: login,
          password: password,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const tempUser = data.detail.user as UserBackend;
        const access = data.detail.access;
        const refresh = data.detail.refresh;

        localStorage.setItem("refresh", refresh);
        localStorage.setItem("access", access);

        const user: User = {
          ...tempUser,
          languageIso2: "en",
          theme: theme,
          is_active: false,
          is_staff: false,
          profilePicture: null,
          accountVerified: null,
          passwordLength: null,
          authorities: null,
          accountNonLocked: null,
          token: null,
        };
        UserDispatch({ type: "setUser", value: user });
        toast.success("Automatycznie zalogowano!");
        router.push("/home");
      } else {
        // Jeśli auto-login nie powiedzie się, usuń zapisane dane
        localStorage.removeItem("rememberedLogin");
        localStorage.removeItem("rememberedPassword");
        localStorage.setItem("rememember", "false");
      }
    } catch (error) {
      // Jeśli wystąpi błąd, usuń zapisane dane
      localStorage.removeItem("rememberedLogin");
      localStorage.removeItem("rememberedPassword");
      localStorage.setItem("rememember", "false");
    } finally {
      setIsLoading(false);
    }
  };

  // Sprawdź przy ładowaniu komponentu czy są zapisane dane i czy auto-login
  useEffect(() => {
    const rememberedLogin = localStorage.getItem("rememberedLogin");
    const rememberedPassword = localStorage.getItem("rememberedPassword");
    const isRemembered = localStorage.getItem("rememember") === "true";

    if (isRemembered && rememberedLogin && rememberedPassword) {
      // Ustaw wartości w formularzu
      setValue("login", rememberedLogin);
      setValue("password", rememberedPassword);
      setValue("remember", true);

      // Automatyczne logowanie
      autoLogin(rememberedLogin, rememberedPassword);
    }
  }, [setValue, router, UserDispatch]);

  // Handler dla checkboxa Remember Me
  const handleRememberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      // Jeśli odznaczono, usuń zapisane dane
      localStorage.removeItem("rememberedLogin");
      localStorage.removeItem("rememberedPassword");
      localStorage.setItem("rememember", "false");
    }
  };

  const isAdminPage =
    typeof window !== "undefined" &&
    window.location.pathname.includes("/admin");

  const onSubmit: SubmitHandler<formProps> = async (data) => {
    setIsLoading(true);
    if (isAdminPage) {
      try {
        const response = await fetch(ApiLinks.adminLogin, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: data.login,
            password: data.password,
          }),
        });
        
        if (!response.ok) {
          const status = response.status;
          if (status === 401) {
            toast.error("Invalid admin credentials", { duration: 5000 });
            setIsLoading(false);
            return;
          }
          toast.error(`Admin login failed - Status: ${status}`, { duration: 5000 });
          setIsLoading(false);
          return;
        }

        const responseData = await response.json();
        const tempUser = responseData.detail.user as UserBackend;
        
        // Sprawdź czy użytkownik ma uprawnienia administratora
        if (!tempUser.is_staff) {
          toast.error("Access denied. Admin privileges required.", { duration: 5000 });
          setIsLoading(false);
          return;
        }

        const access = responseData.detail.access;
        const refresh = responseData.detail.refresh;

        localStorage.clear();
        localStorage.setItem("refresh", refresh);
        localStorage.setItem("access", access);

        const user: User = {
          ...tempUser,
          languageIso2: "en",
          theme: theme,
          is_active: true,
          profilePicture: null,
          accountVerified: null,
          passwordLength: null,
          authorities: null,
          accountNonLocked: null,
          token: null,
        };

        UserDispatch({ type: "setUser", value: user });
        toast.success("Admin login successful!");
        setIsLoading(false);
        router.push("/admin/dashboard");
        return;
      } catch (err: any) {
        setIsLoading(false);
        toast.error("Admin login error: " + (err.message || "Unknown error"));
        return;
      }
    }

    try {
      const response = await fetch(ApiLinks.login, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: getValues().login,
          password: getValues().password,
        }),
      });
      console.log(response);
      if (!response.ok) {
        const status = response.status;
        if (status == 401) {
          const err = await response.text();
          toast.error("Invalid Credentials", { duration: 5000 });
          return;
        }

        toast.error(`Login Failed \n Status: ${status}`, { duration: 5000 });
        setIsLoading(false);
        console.log(status);
        return;
      }
      setIsLoading(false);
      const data = await response.json();
      console.log("Login Data: ");
      console.log(data);
      const tempUser = data.detail.user as Omit<User, "languageIso2">;
      const access = data.detail.access;
      const refresh = data.detail.refresh;

      // Zapisz dane remember me przed wyczyszczeniem localStorage
      const shouldRemember = getValues().remember;
      const loginValue = getValues().login;
      const passwordValue = getValues().password;

      localStorage.clear();
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("access", access);

      // Zapisz dane remember me
      if (shouldRemember && loginValue && passwordValue) {
        localStorage.setItem("rememember", "true");
        localStorage.setItem("rememberedLogin", loginValue);
        localStorage.setItem("rememberedPassword", passwordValue);
      } else {
        localStorage.setItem("rememember", "false");
      }

      console.log(tempUser);
      const user: User = { ...tempUser, languageIso2: "en" };
      UserDispatch({ type: "setUser", value: user });
      toast.success("Login Successful");
      router.push("/home");
      router.refresh();
    } catch (e) {
      setIsLoading(false);
      toast.error("Login failed (exception)");
    }
  };

  return (
    <form
      className="flex flex-col gap-4"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <FormErrorWrap>
        <p className="text-base-content">Username</p>
        <Input
          className="rounded-md bg-primary w-full p-2 text-base-content"
          type="text"
          name="login"
          register={register("login", {
            required: {
              value: true,
              message: "Login is required",
            },
            minLength: {
              value: 6,
              message: "Username must be at least 6 characters long.",
            },
            pattern: {
              value: /^[a-zA-Z0-9_]+$/,
              message:
                "Login can only contain letters, numbers and underscores",
            },
          })}
        />
        <FormErrorParahraph errorObject={errors.login} />
      </FormErrorWrap>

      <div>
        <p className="text-base-content">Password</p>
        <Input
          className="rounded-md bg-primary w-full p-2 text-base-content"
          type="password"
          name="password"
          register={register("password", {
            required: {
              value: true,
              message: "Password is required",
            },
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
            pattern: {
              value: /^(?=.*[A-Z])(?=.*\d).+$/,
              message:
                "Password must contain at least one uppercase letter and one number",
            },
          })}
        />
        <FormErrorParahraph errorObject={errors.password} />
      </div>

      <section className="flex flex-row items-center justify-between">
        <div className="flex items-center flex-row  gap-2">
          <input
            type="checkbox"
            className="bg-primary"
            {...register("remember", {
              onChange: handleRememberChange,
            })}
          />
          <p className="text-base-content">Remember me</p>
        </div>
        <a
          href="#"
          className="hover:underline text-base-content p-2 transition-transform duration-200 hover:scale-105"
        >
          Forgot your password?
        </a>
      </section>

      <Button
        value={isLoading ? "..." : "Login"}
        type="submit"
        customWidth="60%"
        hoverEffect={true}
        disabled={isLoading}
      />
    </form>
  );
};

export default LoginComponent;
