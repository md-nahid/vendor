'use server'
import { auth } from '@/lib/auth'

export const signIn = async (values: { email: string; password: string }) => {
  await auth.api.signInEmail({
    body: {
      email: values.email,
      password: values.password,
    },
  })
}
