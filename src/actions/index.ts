import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { Resend } from 'resend'

const resend = new Resend(import.meta.env.RESEND_API_KEY)

export const server = {
  submitEmail: defineAction({
    input: z.object({
      email: z.string().email()
    }),
    handler: async ({ email }) => {
      try {
        await resend.contacts.create({
          audienceId: import.meta.env.RESEND_AUDIENCE_ID,
          email
        })

        return {
          success: true,
          message: 'Success!'
        }
      } catch (error) {
        throw new Error('Failed to add subscriber')
      }
    }
  })
}
