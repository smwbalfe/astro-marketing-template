import { defineAction } from 'astro:actions'
import { z } from 'astro:schema'
import { Resend } from 'resend'

export const server = {
  submitEmail: defineAction({
    input: z.object({
      email: z.string().email()
    }),
    handler: async ({ email }, Astro) => {
      try {
        const resendApiKey = Astro.locals?.runtime?.env?.RESEND_API_KEY || process.env.RESEND_API_KEY
        const audienceId = Astro.locals?.runtime?.env?.RESEND_AUDIENCE_ID || process.env.RESEND_AUDIENCE_ID
        
        if (!resendApiKey || !audienceId) {
          throw new Error('Missing required environment variables')
        }
        
        const resend = new Resend(resendApiKey)

        await resend.contacts.create({
          audienceId,
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
