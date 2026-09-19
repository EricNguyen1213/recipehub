import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SignUpTab from "./auth/sign-up-tab";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import SignInTab from "./auth/sign-in-tab";
import { EmailVerification } from "./auth/email-verification";
import { ArrowRight } from "lucide-react";
import { LoadingSwap } from "./ui/loading-swap";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { BetterAuthActionButton } from "./auth/auth-action-button";

type Tab = "signin" | "signup" | "email-verification" | "forgot-password" | "profile-config";

interface RegisterProps {
  overMdSize: boolean;
}

export default function Register( { overMdSize }: RegisterProps ) { 

    const [selectedTab, setSelectedTab] = useState<Tab>("profile-config");
    const [isTabVisible, setIsTabVisible] = useState(true);
    const [email, setEmail] = useState("");
    const [isCheckingVerification, setIsCheckingVerification] = useState(false);

    const transitionTab = (t: string) => {
        setIsTabVisible(false);
        setTimeout(() => {
            setSelectedTab(t as Tab)
            setIsTabVisible(true);
        }, 200);
    };

    const openEmailVerificationTab = (email: string) => {
        setEmail(email);
        setSelectedTab("email-verification");
    };

    const checkVerification = async () => {
        setIsCheckingVerification(true);
        try {
            const { data, error } = await authClient.getSession();
            if (error) {
                toast.error("Unable to confirm email verification. Please try again.");
                return;
            }

            if (data?.user?.emailVerified) {
                toast.success("Email Verified! Unlocking profile setup configurations.");
                setSelectedTab("profile-config");
            } else {
                toast.error("Email is not verified! Check your mailbox or spam folder.");
            }

        } catch {
            toast.error("An unexpected error occurred with the authentication server.");
        } finally {
            setIsCheckingVerification(false);
        }
    };


    return (
        <main>
            <div className="relative w-full bg-white  py-10">
                <section className="relative z-2 w-8/9 min-h-150 h-[85vh] bg-white m-auto shadow-xl max-w-7xl rounded-sm">
                    <div className="py-10 md:py-0 h-full rounded-sm flex items-center w-full">
                        <div className="absolute z-0 top-0 left-0 w-full h-full grid grid-cols-2">
                            <div className="rounded-l-sm hidden md:block h-full bg-[url('https://f.hubspotusercontent40.net/hubfs/518490/cooking%20vegetables%20%28Large%29.jpg')] bg-cover bg-center">
                            </div>
                            <div className="rounded-sm md:rounded-l-none col-span-2 md:col-span-1 h-full bg-[url('https://reluctantgourmet.com/wp-content/uploads/2025/12/seasoning-food.jpeg')] bg-cover bg-center">
                            </div>
                        </div>
                        <Tabs 
                            value={selectedTab}
                            onValueChange={transitionTab}
                            className="w-full h-full"
                        >
                            <motion.div
                                key={selectedTab === "signin" ? "right-tab" : "left-tab"}
                                initial={overMdSize ? (selectedTab === "signin" ? { x: "-100%" } : { x: "100%" }) : { x:0 }}
                                animate={{ x: 0 }}
                                transition={{ duration: 0.2 }}
                                className={`bg-white border border-black/5 z-10 h-full w-7/8 md:w-1/2 m-auto md:m-0 flex flex-col justify-center  ${selectedTab == "signin" ? "md:ml-auto md:rounded-r-sm" : "md:mr-auto md:rounded-l-sm"} ${selectedTab == "profile-config" ? "py-0" : "py-5"}`}
                            >
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={isTabVisible ? "state-true" : "state-false"} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        transition={{ duration: 0.2 }}
                                        className="h-full w-full flex flex-col justify-center"
                                    >
                                        <TabsContent value="signup" className="flex-0">
                                            <SignUpTab 
                                                openEmailVerificationTab={openEmailVerificationTab}
                                            />
                                        </TabsContent>
                                        <TabsContent value="signin" className="flex-0">
                                            <SignInTab 
                                                openEmailVerificationTab={openEmailVerificationTab}
                                            />
                                        </TabsContent>
                                
                                        <TabsContent value="email-verification" className="mx-auto max-w-4/5 max-h-2/3">
                                            <EmailVerification email={email} />
                                        </TabsContent>

                                        <TabsContent value="profile-config" className="h-full border-2 border-red-600">
                                            <ProfileConfig />
                                        </TabsContent>

                                        {selectedTab != "profile-config" && <TabsList className={`bg-transparent w-full h-1/4 font-desc text-lg border-2 border-blue-500`}>
                                            {selectedTab === "signup" && <div className="m-auto gap-10">
                                                <span>Have an account?  </span>
                                                <TabsTrigger value="signin" className="p-0" asChild>
                                                    <Button 
                                                        className="text-mylightgreen text-lg" 
                                                        variant="inlineLink" 
                                                        size="none"
                                                    >
                                                        Sign In
                                                    </Button>
                                                </TabsTrigger>
                                            </div>}
                                            {selectedTab === "signin" && <div className="m-auto gap-10">
                                                <span>Don't have an account?  </span>
                                                <TabsTrigger value="signup" className="p-0" asChild>
                                                    <Button 
                                                        className="text-mydarkgreen text-lg" 
                                                        variant="inlineLink" 
                                                        size="none"
                                                    >
                                                        Sign Up
                                                    </Button>
                                                </TabsTrigger>
                                            </div>}
                                            {selectedTab === "email-verification" && <div className="m-auto gap-10">
                                                <Button 
                                                    className="text-mydarkgreen p-3"
                                                    variant="outline"
                                                    size="none"
                                                    onClick={checkVerification}
                                                >
                                                    <LoadingSwap isLoading={isCheckingVerification}>
                                                        <ArrowRight className="h-7! w-7!" />
                                                    </LoadingSwap>
                                                </Button>
                                            </div>}
                                        </TabsList>}
                                    </motion.div>
                                </AnimatePresence>
                            </motion.div>
                        </Tabs>
                    </div>
                </section>
            </div>
        </main>
    );
}


function ProfileConfig() {
    return (
        <div className="border-2 border-amber-100 h-full flex flex-col p-5">
            <div className="border-2 border-green-600 flex-1">
                fuckass
            </div>
            <div className="border-2 border-purple-600 h-1/6 flex justify-center items-center">
                <BetterAuthActionButton
                    variant="outline"
                    className="text-mydarkgreen text-base border-2 w-full max-w-50"
                    successMessage="Profile Created!"
                    action={() => {
                        return new Promise((resolve) => {
                            alert("hi");
                            resolve({ error: null });
                        });
                    }}
                >
                    Done
                </BetterAuthActionButton>
            </div>
        </div>
    );
}
