import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import { handleSignUpStub, signUpSchema, type SignUpForm } from "@/network/auth-api";
import { LoadingSwap } from "../ui/loading-swap";


export default function SignUpTab({ openEmailVerificationTab }: { 
    openEmailVerificationTab: (email: string) => void 
}) {
    const form = useForm<SignUpForm>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
        },
    });

    const { isSubmitting } = form.formState;
    const handleSignUp = handleSignUpStub(openEmailVerificationTab);

    return (
        <Form {...form}>
            <form className="space-y-5 px-5 max-w-md m-auto flex flex-col justify-center" onSubmit={form.handleSubmit(handleSignUp)}>
                <h2 className="text-4xl font-header text-mydarkgreen text-center">Sign Up</h2>
                <FormField
                    control={form.control}
                    name="name"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="font-desc text-mydarkgreen text-lg">Name</FormLabel>
                            <FormControl>
                                <Input className="rounded-sm font-robo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="font-desc text-mydarkgreen text-lg">Email</FormLabel>
                            <FormControl>
                                <Input type="email" className="rounded-sm font-robo" {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="font-desc text-mydarkgreen text-lg">Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <div className="flex justify-center">
                    <Button className="text-xl w-full" variant="homeDark" size="homeSize" type="submit" disabled={isSubmitting}>
                        <LoadingSwap isLoading={isSubmitting}>
                            Sign Up
                        </LoadingSwap>
                    </Button>
                </div>
                
            </form>
        </Form>
    )
}