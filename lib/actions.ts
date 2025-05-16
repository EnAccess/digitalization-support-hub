"use server"

import { Resend } from "resend"

// Initialize Resend with your API key
// In production, use environment variables
const resend = new Resend(process.env.RESEND_API_KEY || "dummy_key")

export async function submitSupportRequest(formData: FormData) {
  // Extract form data
  const name = (formData.get("name") as string) || "Customer"
  const company = formData.get("company") as string
  const email = formData.get("email") as string
  const companySize = formData.get("companySize") as string
  const revenue = formData.get("revenue") as string
  const transactions = formData.get("transactions") as string
  const country = formData.get("country") as string
  const application = formData.get("application") as string

  // Validate required fields
  if (!company || !email || !country || !application) {
    throw new Error("Missing required fields")
  }

  try {
    // Save to database (in a real implementation)
    // ...

    // Send confirmation email using Resend
    const { data, error } = await resend.emails.send({
      from: "Support <support@yourdomain.com>",
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2>Thanks for reaching out!</h2>
          <p>Dear ${name},</p>
          <p>We have received your request, and we will revert within 7 seven working days.</p>
          <p>Your request details:</p>
          <ul>
            <li><strong>Company:</strong> ${company}</li>
            <li><strong>Company Size:</strong> ${companySize}</li>
            <li><strong>Country:</strong> ${country}</li>
          </ul>
          <p>Best regards,<br>Support Team</p>
        </div>
      `,
    })

    if (error) {
      console.error("Error sending email:", error)
      // Fall back to console logging in development
      if (process.env.NODE_ENV !== "production") {
        console.log("[DEV MODE] Would have sent email to:", email)
        console.log(
          "[DEV MODE] Email content:",
          `Thanks for reaching out! We have received your request, and we will revert within 7 seven working days.`
        )
      }
    }

    return { success: true }
  } catch (error) {
    console.error("Error in submitSupportRequest:", error)
    throw new Error("Failed to submit request")
  }
}
