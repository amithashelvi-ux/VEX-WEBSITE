import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      name,
      age,
      location,
      email,
      problem,
      details,
    } = data;

    const submissionId = `VEX-${Date.now()}`;
    const submittedAt = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
    });

    await resend.emails.send({
      from: "VEX Website <onboarding@resend.dev>",
      to: ["amithashelvi@gmail.com"],
      subject: `New VEX Submission — ${submissionId}`,
      html: `
        <h2>VEX — New Visitor Submission</h2>

        <p><strong>Submission ID:</strong> ${submissionId}</p>
        <p><strong>Date & Time:</strong> ${submittedAt}</p>

        <hr />

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Age:</strong> ${age}</p>
        <p><strong>Location:</strong> ${location}</p>
        <p><strong>Email:</strong> ${email}</p>

        <h3>Problem / Concern</h3>
        <p>${problem}</p>

        <h3>Additional Details</h3>
        <p>${details || "None provided"}</p>
      `,
    });

    return Response.json({
      success: true,
      submissionId,
      submittedAt,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      { success: false, error: "Failed to send email" },
      { status: 500 }
    );
  }
}