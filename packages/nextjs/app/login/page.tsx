"use client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useLogin from "~~/utils/api/hooks/useLogin";
import { useQueryClient } from "@tanstack/react-query";
import Image from "next/image";

function Page() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const queryClient = useQueryClient();

  const handleLoginSuccess = () => {
    queryClient.setQueryData(["userEmail"], email);
    queryClient.invalidateQueries({
      refetchType: "active",
    });
    router.push("/login/verification");
  };

  const handleLoginFailed = (error: any) => {
    console.log("Login failed", error);
    setErrorMessage("Login failed");
  };

  const { mutate: login } = useLogin(handleLoginSuccess, handleLoginFailed);

  const handleLogin = () => {
    if (!email.includes("@")) {
      setErrorMessage("Invalid email address. Please include '@'.");
      return;
    }
    setErrorMessage("");
    setLoading(true);
    login({
      email: email,
      password: "LZGTSLJI",
    });
  };

  return (
    <div className="font-monserrat">
      <div
        className=" sm:p-12 p-4 pt-12 h-screen-minus-80"
        style={{
          backgroundImage: `url(/bg-transparent.svg)`,
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <div className="max-w-[1700px] mx-auto flex flex-col h-3/4">
          <div className="mb-5 sm:mb-12">
            <div className="sm:text-4xl font-medium text-[16px] mb-2">
              <span>WELCOME</span>
              <span className="text-gradient"> BACK !</span>
            </div>
            <span className="text-[#CACACA] text-[14px] sm:text-[20px]">
              Use your credential below and login to your account
            </span>
          </div>
          <div className="flex-1 flex flex-col justify-between sm:justify-start">
            <div className="bg-[#21262B] flex flex-col p-4 gap-4 rounded-[8px] max-w-[650px] w-full">
              <span>Email</span>
              <input
                type="text"
                placeholder="example@gmail.com"
                className="bg-transparent focus:outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></input>
            </div>
            {errorMessage && (
              <div className="flex gap-4 text-red-500 mt-2 text-center border border-[#662020] px-4 font-monserrat bg-alert w-full md:w-[400px]">
                <Image
                  src="/alert.svg"
                  alt="icon"
                  width={40}
                  height={45}
                ></Image>
                <span className="py-2">{errorMessage}</span>
              </div>
            )}
            <div className="flex flex-col justify-start gap-2">
              <span className="py-4 text-gray">
                Don’t have an account?
                <Link href="/signup" className="text-[#00ECFF]">
                  {" "}
                  Sign up here.
                </Link>
              </span>
              <div className="flex gap-4">
                <input type="checkbox" className="lg:w-4"></input>
                <span className="text-gray">Remember me</span>
              </div>
            </div>
          </div>
          <div className="button-flow-login mt-4">
            <button
              className="shadow-button w-[260px] py-4 px-7 mt-6 font-arcade text-shadow-deposit text-2xl"
              onClick={handleLogin}
              disabled={loading}
            >
              {loading ? "Loading..." : "NEXT"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
