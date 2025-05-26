import { NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"



export async function POST(request: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY )
  try {
    const body = await request.json()
    const {
      name,
      company,
      email,
      companySize,
      revenue,
      transactions,
      country,
      application,
    } = body

    // Validate required fields
    if (!company || !email || !country || !application) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Email to admin (dsh@enaccess.org)
    const adminEmailHtml = `
      <h2>New Technical Support Request</h2>
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <p><strong>Name:</strong> ${name || "Not provided"}</p>
        <p><strong>Company:</strong> ${company}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company Size:</strong> ${companySize || "Not provided"}</p>
        <p><strong>Revenue:</strong> ${revenue || "Not provided"}</p>
        <p><strong>Transactions per week:</strong> ${transactions || "Not provided"}</p>
        <p><strong>Country:</strong> ${country}</p>
        <p><strong>Application:</strong></p>
        <p style="background-color: #f5f5f5; padding: 15px; border-radius: 5px;">${application}</p>
      </div>
    `

    // Confirmation email to user
    const userEmailHtml = `
      <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <h2 style="color: #004d2c;">Thank you for your support request!</h2>
        <p>Hi ${name || "there"},</p>
        <p>Thanks for reaching out! We have received your request for technical support, and we will revert within 7 working days.</p>
        
        <h3>Your Request Summary:</h3>
        <div style="background-color: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <p><strong>Company:</strong> ${company}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Company Size:</strong> ${companySize || "Not provided"}</p>
          <p><strong>Revenue:</strong> ${revenue || "Not provided"}</p>
          <p><strong>Transactions per week:</strong> ${transactions || "Not provided"}</p>
          <p><strong>Country:</strong> ${country}</p>
          <p><strong>Application:</strong></p>
          <p style="background-color: #fff; padding: 10px; border-radius: 4px; border-left: 4px solid #004d2c;">${application}</p>
        </div>
        
        <p>If you have any urgent questions, please don't hesitate to contact us.</p>
        <p>Best regards,<br>The DSH Team</p>
      </div>
    `

    // Send email to admin
    await resend.emails.send({
      from: "Support Form <onboarding@resend.dev>", // Replace with your verified domain
      to: "dsh@enaccess.org",
      subject: `New Technical Support Request from ${company}`,
      html: adminEmailHtml,
    })

    // Send confirmation email to user
    await resend.emails.send({
      from: "DSH Support <onboarding@resend.dev>", // Replace with your verified domain
      to: email,
      subject: "Support Request Received - DSH",
      html: userEmailHtml,
    })

    return NextResponse.json({
      success: true,
      message: "Emails sent successfully",
    })
  } catch (error) {
    console.error("Error sending emails:", error)
    return NextResponse.json(
      { error: "Failed to send emails" },
      { status: 500 }
    )
  }
}
