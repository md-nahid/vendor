'use server'

import { authClient } from '@/auth-client'
import { Routes } from '@/config/route.config'
import { redirect } from 'next/navigation'

export const signInAction = async (prev: any, formData: FormData) => {
  const { data, error } = await authClient.signIn.email({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    // callbackURL: Routes.dashboard.url,
    rememberMe: true,
  })

  if (error) {
    return {
      data: null,
      error,
      message: 'Something went wrong!',
    }
  }

  // Redirect after successful login
  redirect(Routes.dashboard.url)
}
