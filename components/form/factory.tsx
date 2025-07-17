// 'use client'
// import { cx } from '@/cva.config'
// import { useForm } from '@tanstack/react-form'
// // import { zodResolver } from "@hookform/resolvers/zod";
// // import {
// //   type DefaultValues,
// //   type FieldValues,
// //   FormProvider,
// //   type SubmitHandler,
// //   // type UseFormReturn,
// //   useForm,
// // } from "react-hook-form";
// import type { z } from 'zod'
// interface FormWrapperProps<TFieldValues extends FieldValues> {
//   id: string
//   className?: string
//   schema: z.ZodType<TFieldValues>
//   defaultValues: DefaultValues<TFieldValues>
//   onSubmit: SubmitHandler<TFieldValues>
//   // children: (form: UseFormReturn<TFieldValues>) => React.ReactNode;
//   children: React.ReactNode
// }

// export function FormFactory<TFieldValues extends FieldValues>({
//   id,
//   children,
//   formOptions,
//   className,
// }: FormWrapperProps<TFieldValues>) {
//   const form = useForm<TFieldValues>(formOptions)
//   return (
//     <form
//       id={id}
//       onSubmit={(e) => {
//         e.preventDefault()
//         e.stopPropagation()
//         form.handleSubmit()
//       }}
//       className={cx('space-y-4 py-4', className)}
//       noValidate
//       autoComplete="off"
//     >
//       {children}
//     </form>
//   )
// }
import { createFormHook, createFormHookContexts } from '@tanstack/react-form'

export const { fieldContext, useFieldContext, formContext, useFormContext } = createFormHookContexts()

// import { lazy } from 'react'

// const TextField = lazy(() => import('../components/text-fields.tsx'))

// function SubscribeButton({ label }: { label: string }) {
//   const form = useFormContext()
//   return (
//     <form.Subscribe selector={(state) => state.isSubmitting}>
//       {(isSubmitting) => <button disabled={isSubmitting}>{label}</button>}
//     </form.Subscribe>
//   )
// }

export const { useAppForm, withForm } = createFormHook({
  fieldComponents: {
    // TextField,
  },
  formComponents: {
    // SubscribeButton,
  },
  fieldContext,
  formContext,
})
