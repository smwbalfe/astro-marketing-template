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
        const resend = new Resend(process.env.RESEND_API_KEY as string)

        await resend.contacts.create({
          audienceId: process.env.RESEND_AUDIENCE_ID as string,
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
