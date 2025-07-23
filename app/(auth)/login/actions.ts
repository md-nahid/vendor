'use server'

import { authClient } from '@/auth-client'

export const signInAction = async (prev: any, formData: FormData) => {
  const { data, error } = await authClient.signIn.email({
    /**
     * The user email
     */
    email: formData.get('email') as string,
    /**
     * The user password
     */
    password: formData.get('password') as string,
    /**
     * A URL to redirect to after the user verifies their email (optional)
     */
    callbackURL: "/dashboard",
    /**
     * remember the user session after the browser is closed. 
     * @default true
     */
    rememberMe: false
  }, {
    //callbacks
  })

  if (error) {
    return {
      // ...prev,
      data: null,
      error,
      message: 'Something went wrong!'
    }
  }

  return {
    // ...prev,
    data,
    error: null,
    message: 'Login successfully!',
  }
}
