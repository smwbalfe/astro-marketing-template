import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { Resend } from 'resend'


export const server = {
  submitEmail: defineAction({
    input: z.object({
      email: z.string().email()
    }),
    handler: async ({ email }) => {
      try {
        const resend = new Resend(import.meta.env.RESEND_API_KEY)

        await resend.contacts.create({
          audienceId: import.meta.env.RESEND_AUDIENCE_ID,
          email
        })

        return {
          success: true,
          message: 'Success!'
        }
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
        return {
          success: false,
          message: `Failed to add subscriber: ${errorMessage}`
        }
      }
    }
  })
}
