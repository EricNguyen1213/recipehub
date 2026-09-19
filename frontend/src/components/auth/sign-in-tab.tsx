import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "../ui/input";
import { PasswordInput } from "../ui/password-input";
import { Button } from "../ui/button";
import { handleSignInStub, signInSchema, type SignInForm } from "@/network/auth-api";


export default function SignInTab({ openEmailVerificationTab }: { openEmailVerificationTab: (email: string) => void }) {

    const form = useForm<SignInForm>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });
    
    const { isSubmitting } = form.formState
    const handleSignIn = handleSignInStub(openEmailVerificationTab);

    return (
        <Form {...form}>
            <form className="space-y-5 px-5 max-w-md m-auto flex flex-col justify-center" onSubmit={form.handleSubmit(handleSignIn)}>
                <h2 className="text-4xl font-header text-mylightgreen text-center">Sign In</h2>

                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel className="font-desc text-mylightgreen text-lg">Email</FormLabel>
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
                            <FormLabel className="font-desc text-mylightgreen text-lg">Password</FormLabel>
                            <FormControl>
                                <PasswordInput {...field} />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                
                <div className="flex justify-center">
                    <Button className="text-xl w-full" variant="homeLight" size="homeSize" type="submit" disabled={isSubmitting}>
                        {/* <LoadingSwap isLoading={isSubmitting}> */}
                            Sign In
                        {/* </LoadingSwap> */}
                    </Button>
                </div>
                
            </form>
        </Form>
    )
}