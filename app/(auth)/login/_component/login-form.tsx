'use client'

import { PasswordField } from '@/components/form/password-field'
import { TextField } from '@/components/form/text-field'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cx } from '@/config/cva.config'
import { Routes } from '@/config/route.config'
import { useForm } from '@tanstack/react-form'
import Link from 'next/link'
import { z } from 'zod/v4'

export const Schema = z.object({
  email: z.email().transform((val) => val.toLowerCase()),
  password: z
    .string()
    .min(8, { error: 'Minimum 8 character is required!' })
    .max(100, { error: 'Maximum 100 character is allowed!' }),
})

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: Schema,
    },
    onSubmit: (values) => {
      console.log('Form submitted with values:', values)
    },
  })
  return (
    <div className={cx('mx-auto flex w-full max-w-sm flex-col gap-6', className)} {...props}>
      <Card>
        <div className="text-center">
          <h1 className="text-xl font-semibold">Login to your account</h1>
          <p className="text-muted-foreground text-sm">Enter your details below to login to your account</p>
        </div>
        <CardContent>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              e.stopPropagation()
              form.handleSubmit()
            }}
          >
            <div className="grid grid-cols-1 gap-4">
              <div>
                <form.Field name="email">{(field) => <TextField label="Email" field={field} />}</form.Field>
                <div className="mt-2 flex justify-end">
                  <Link href="#" className="ml-auto inline-block text-xs underline underline-offset-4">
                    Forgot your password?
                  </Link>
                </div>
              </div>
              <form.Field name="password">{(field) => <PasswordField label="Password" field={field} />}</form.Field>
              <form.Subscribe selector={(state) => [state.canSubmit]}>
                {([canSubmit]) => (
                  <Button type="submit" disabled={!canSubmit} className="w-full">
                    Login
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <Link href={Routes.auth.signUp.url} className="underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
