'use client'

import { PasswordField } from '@/components/form/password-field'
import { TextField } from '@/components/form/text-field'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { cx } from '@/config/cva.config'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { z } from 'zod'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { signIn } from '../actions'

// export const Schema = z.object({
//   email: z.email().transform((val) => val.toLowerCase()),
//   password: z
//     .string()
//     .min(8, { error: 'Minimum 8 character is required!' })
//     .max(100, { error: 'Maximum 100 character is allowed!' }),
// })
const Schema = z.object({
  email: z.email().transform((val) => val.toLowerCase()),
  password: z.string().min(8, { error: 'Minimum 8 character is required!' }),
})

export function LoginForm({ className, ...props }: React.ComponentProps<'div'>) {
  const form = useForm<z.infer<typeof Schema>>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  function onSubmit(values: z.infer<typeof Schema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
    signIn(values)
  }

  return (
    <div className={cx('mx-auto flex w-full max-w-sm flex-col gap-6', className)} {...props}>
      <Card>
        <div className="text-center">
          <h1 className="text-xl font-semibold">Login to your account</h1>
          <p className="text-muted-foreground text-sm">Enter your details below to login to your account</p>
        </div>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }: { field: any }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="Email" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <div className="mt-2 flex justify-end">
                    <Link href="#" className="ml-auto inline-block text-xs underline underline-offset-4">
                      Forgot your password?
                    </Link>
                  </div>
                </div>
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }: { field: any }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="Password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{' '}
            <a href="#" className="underline underline-offset-4">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
