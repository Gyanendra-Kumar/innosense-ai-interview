import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail", //smtp
  auth: {
    user: process.env.EMAIL_USER!, //your email address
    pass: process.env.EMAIL_PASS!, //your app password or smtp password
  },
});

type SendMailProps = {
  to: string;
  userName: string;
  subject: string;
  html: string;
  // Component: React.ReactElement; // ✅ Accepts JSX email templates
};

const requiredEnv = ["EMAIL_USER", "EMAIL_PASS"] as const;
for (const key of requiredEnv) {
  if (!process.env[key]) {
    throw new Error(`Missing required env: ${key}`);
  }
}

export const sendMail = async ({
  to,
  userName,
  subject,
  html,
}: SendMailProps) => {
  // const html = await render(Component);

  await transporter.sendMail({
    from: `InnoSense AI <${process.env.EMAIL_USER}>`,
    to: `${userName}<${to}>`,
    subject,
    html,
  });

  // Optional: verify once at startup (non-blocking)
  transporter
    .verify()
    .then(() => console.log("SMTP: transporter verified"))
    .catch((err) => console.error("SMTP verify failed:", err));
};
