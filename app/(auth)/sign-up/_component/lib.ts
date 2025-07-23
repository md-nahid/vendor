import { formOptions } from '@tanstack/react-form/nextjs'
import { z } from 'zod/v4'

export const formOpts = formOptions({
  defaultValues: {
    name: '',
    email: '',
    password: '',
  },
})

export const Schema = z.object({
  name: z.string().min(1, { error: 'Name is required!' }),
  email: z.email().transform((val) => val.toLowerCase()),
  password: z
    .string()
    .min(8, { error: 'Minimum 8 character is required!' })
    .max(100, { error: 'Maximum 100 character is allowed!' }),
})

export type SchemaType = z.infer<typeof Schema>
