'use client'

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {signInDefaultValues} from "@/lib/constants";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useActionState} from "react";
import {signInWithCredentials} from "@/lib/actions/user.actions";
import {useFormStatus} from "react-dom";
import {useSearchParams} from "next/navigation";

const CredentialsSignInForm = () => {
    const [data, action] = useActionState(signInWithCredentials, {
        success: false,
        message: ''
    });
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const SignInButton = () => {
        const {pending} = useFormStatus();

        return (
            <Button  className="w-full" variant="default" disabled={pending}>
                { pending ? 'Signing In...' : 'Sign In' }
            </Button>
        )
    }

    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-6">
               <div>
                   <Label htmlFor="email">Email</Label>
                   <Input
                       id="email"
                       type="email"
                       name="email"
                       required
                       autoComplete="email"
                       defaultValue={signInDefaultValues.email}
                   />
               </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        type="password"
                        name="password"
                        required
                        autoComplete="password"
                        defaultValue={signInDefaultValues.password}
                    />
                </div>

                <div>
                   <SignInButton />
                </div>

                {
                    data && !data.success && (
                        <div className="text-center text-destructive">
                            { data.message }
                        </div>
                    )
                }

                <div className="text-sm text-center text-muted-foreground">
                    Don&#39;t have an account? &nbsp;
                    <Link href="/sign-up" target="_self" className="link">Sign Up</Link>
                </div>
            </div>
        </form>
    )
}

export default CredentialsSignInForm;