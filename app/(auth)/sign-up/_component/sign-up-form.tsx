'use client'

import { PasswordField } from '@/components/form/password-field'
import { TextField } from '@/components/form/text-field'
import { SpinnerIcon } from '@/components/icons/spinner-icon'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Routes } from '@/config/route.config'
import { mergeForm, useForm, useTransform } from '@tanstack/react-form'
import { initialFormState } from '@tanstack/react-form/nextjs'
import Link from 'next/link'
import { useActionState } from 'react'
import signUpAction from '../actions'
import { formOpts, Schema } from './lib'

export const initialState = {
  data: null,
  error: null,
  message: '',
}

export function SignUpForm() {
  const [state, action, pending] = useActionState(signUpAction, initialState)
  const form = useForm({
    ...formOpts,
    validators: {
      onSubmit: Schema,
    },
    transform: useTransform((baseForm) => mergeForm(baseForm, state ?? {}), [state]),
  })

  console.log('state', state)

  // const formErrors = useStore(form.store, (formState) => formState.errors)
  // console.log('formErrors', formErrors)

  return (
    <div className="mx-auto w-full max-w-sm">
      <Card>
        <div className="text-center">
          <h1 className="text-xl font-semibold">Create your account</h1>
          <p className="text-muted-foreground text-sm">Enter your details below to create a new account</p>
        </div>
        <CardContent>
          <form action={action} onSubmit={() => form.handleSubmit()}>
            <div className="grid grid-cols-1 gap-4">
              <form.Field name="name">{(field) => <TextField label="Name" field={field} />}</form.Field>
              <form.Field name="email">{(field) => <TextField label="Email" field={field} />}</form.Field>
              <form.Field name="password">{(field) => <PasswordField label="Password" field={field} />}</form.Field>
              <form.Subscribe selector={(state) => [state.canSubmit, state.isSubmitting]}>
                {([canSubmit]) => (
                  <Button type="submit" disabled={!canSubmit} className="w-full">
                    {pending ? <SpinnerIcon /> : 'Sign Up'}
                  </Button>
                )}
              </form.Subscribe>
            </div>
          </form>
          <div className="mt-4 text-center text-sm">
            <span>Already have an account? </span>
            <Link href={Routes.auth.login.url} className="underline underline-offset-4">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
