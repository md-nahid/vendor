'use client'

import { PasswordField } from '@/components/form/password-field'
import { TextField } from '@/components/form/text-field'
import { SpinnerIcon } from '@/components/icons/spinner-icon'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Routes } from '@/config/route.config'
import { mergeForm, useForm, useTransform } from '@tanstack/react-form'
import Link from 'next/link'
import { useActionState } from 'react'
import { z } from 'zod/v4'
import { signInAction } from '../actions'

export const Schema = z.object({
  email: z.email().transform((val) => val.toLowerCase()),
  password: z
    .string()
    .min(8, { error: 'Minimum 8 character is required!' })
    .max(100, { error: 'Maximum 100 character is allowed!' }),
})

export const initialState = {
  data: null,
  error: null,
  message: '',
}

export function LoginForm() {
  const [state, action, pending] = useActionState(signInAction, initialState)
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    validators: {
      onSubmit: Schema,
    },
    transform: useTransform((baseForm) => mergeForm(baseForm, state ?? {}), [state]),
  })

  console.log('state', state)

  return (
    <div className='mx-auto w-full max-w-sm gap-6'>
      <Card>
        <div className="text-center">
          <h1 className="text-xl font-semibold">Login to your account</h1>
          <p className="text-muted-foreground text-sm">Enter your details below to login to your account</p>
        </div>
        <CardContent>
          <form
            action={action}
            onSubmit={() => form.handleSubmit()}
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
                    {pending ? <SpinnerIcon /> : 'Login'}
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
