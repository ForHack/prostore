'use client'

import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {useActionState} from "react";
import {signUpUser} from "@/lib/actions/user.actions";
import {useFormStatus} from "react-dom";
import {useSearchParams} from "next/navigation";
import {signUpDefaultValues} from "@/lib/constants";

const SignUpForm = () => {
    const [data, action] = useActionState(signUpUser, {
        success: false,
        message: ''
    });
    const searchParams = useSearchParams();
    const callbackUrl = searchParams.get('callbackUrl') || '/';

    const SignUpButton = () => {
        const {pending} = useFormStatus();

        return (
            <Button  className="w-full" variant="default" disabled={pending}>
                { pending ? 'Submitting' : 'Sign Up' }
            </Button>
        )
    }

    return (
        <form action={action}>
            <input type="hidden" name="callbackUrl" value={callbackUrl} />
            <div className="space-y-6">
                <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                        id="name"
                        type="text"
                        name="name"
                        required
                        autoComplete="name"
                        defaultValue={signUpDefaultValues.name}
                    />
                </div>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        name="email"
                        required
                        autoComplete="email"
                        defaultValue={signUpDefaultValues.email}
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
                        defaultValue={signUpDefaultValues.password}
                    />
                </div>
                <div>
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <Input
                        id="confirmPassword"
                        type="password"
                        name="confirmPassword"
                        required
                        autoComplete="confirmPassword"
                        defaultValue={signUpDefaultValues.confirmPassword}
                    />
                </div>

                <div>
                    <SignUpButton />
                </div>

                {
                    data && !data.success && (
                        <div className="text-center text-destructive">
                            { data.message }
                        </div>
                    )
                }

                <div className="text-sm text-center text-muted-foreground">
                    Already have an account? &nbsp;
                    <Link href="/sign-in" target="_self" className="link">Sign In</Link>
                </div>
            </div>
        </form>
    )
}

export default SignUpForm;