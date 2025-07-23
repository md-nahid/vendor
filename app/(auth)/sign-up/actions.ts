'use server'

import { authClient } from '@/auth-client';

export default async function signUpAction(prev: any, formData: FormData) {
  // try {
  const { data, error } = await authClient.signUp.email({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
    name: formData.get('name') as string,
    image: '',
    callbackURL: "/login"
  }, {
    onRequest: (ctx) => {
      console.log('onRequest', ctx)
    },
    onSuccess: (ctx) => {
      console.log('onSuccess', ctx)
    },
    onError: (ctx) => {
      console.log('onError', ctx)
    },
  });

  if (error) {
    return {
      ...prev,
      error,
      message: 'Sign up failed!',
    }
  }

  return {
    ...prev,
    data,
    message: 'Sign up successfully!',
  }

  // } catch (e) {
  //   return {
  //     message: 'Sign up failed!',
  //   }
  //   // throw e
  // }
}
