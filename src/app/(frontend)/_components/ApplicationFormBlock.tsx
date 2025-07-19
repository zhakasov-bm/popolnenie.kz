'use client'

import { Page } from '@/payload-types'
import { useState } from 'react'
import { submitToTelegram } from '@/app/utils/submitToTelegram'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { RichText } from '@payloadcms/richtext-lexical/react'

type FormState = {
  loading: boolean
  error: string | null
  success: boolean
}

export default function ApplicationFormBlock({ page }: { page: Page }) {
  const [formState, setFormState] = useState<FormState>({
    loading: false,
    error: null,
    success: false,
  })
  const [phone, setPhone] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = page.layout?.find((b) => b.blockType === 'application-form')?.form
    if (!form || typeof form !== 'object') return

    setFormState({ loading: true, error: null, success: false })

    try {
      const formData = new FormData(e.target as HTMLFormElement)
      // manually set phone value from state
      formData.set('phone', phone)
      const data = Object.fromEntries(formData.entries()) as Record<string, string>

      // Phone validation
      const phoneValue = data.phone || ''
      const phoneRegex = /^\+?\d{10,15}$/
      if (!phoneRegex.test(phoneValue)) {
        setFormState({ loading: false, error: 'Некорректный номер телефона', success: false })
        return
      }

      await submitToTelegram(data)

      setFormState({ loading: false, error: null, success: true })
      setPhone('') // reset phone input
      ;(e.target as HTMLFormElement).reset()
      setTimeout(() => {
        setFormState({ loading: false, error: null, success: false })
      }, 3000)
    } catch (err: any) {
      setFormState({ loading: false, error: err.message, success: false })
    }
  }

  return (
    <section className="bg-background">
      {page.layout?.map((block, id) => {
        if (block.blockType !== 'application-form') return null
        const form = typeof block.form === 'object' ? block.form : null

        return (
          <div key={id} className="container mx-auto py-28">
            <h2>{block.heading}</h2>
            <form
              className="form flex flex-col gap-4 items-center justify-center"
              onSubmit={handleSubmit}
            >
              {form?.fields?.map((field: any) => (
                <div key={field.id} className="flex flex-col gap-2 items-left w-fit mx-auto">
                  <label htmlFor={field.name}>{field.label}</label>
                  {field.blockType === 'select' ? (
                    <div role="radiogroup" className="flex flex-col gap-2 items-start w-140">
                      {field.options?.map((option: any, idx: number) => (
                        <label key={option.id} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name={field.name}
                            value={option.value}
                            required={field.required}
                            defaultChecked={idx === 0}
                            className="accent-blue-600"
                          />
                          <span>{option.label}</span>
                        </label>
                      ))}
                    </div>
                  ) : field.name === 'phone' ? (
                    <PhoneInput
                      country={'kz'}
                      inputProps={{
                        name: field.name,
                        required: field.required,
                        placeholder: field.placeholder,
                        className: 'bg-inputBG rounded-xl pl-12 p-4 w-140',
                      }}
                      value={phone}
                      onChange={setPhone}
                    />
                  ) : (
                    <input
                      type={field.blockType}
                      name={field.name}
                      id={field.name}
                      required={field.required}
                      placeholder={field.defaultValue}
                      className="bg-inputBG rounded-xl p-4 w-140"
                    />
                  )}
                </div>
              ))}

              {/* display error or success message */}
              {formState.error && <p className="text-red-600">{formState.error}</p>}
              {formState.success ? (
                <div className="text-green-600">
                  {form && form.confirmationMessage && <RichText data={form.confirmationMessage} />}
                </div>
              ) : (
                <button
                  type="submit"
                  className="bg-primary text-black mt-4 px-12 py-4 font-unbounded rounded-custom cursor-pointer hover:bg-hover transition"
                >
                  {form?.submitButtonLabel || 'Отправить'}
                </button>
              )}
            </form>
          </div>
        )
      })}
    </section>
  )
}
