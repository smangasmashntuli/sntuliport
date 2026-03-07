# EmailJS Setup Guide for Contact Form

This guide explains how to set up EmailJS for your contact form so that you can receive emails directly from your website without needing a backend server.

## Current Setup

The contact form is already configured with working EmailJS credentials. However, if you want to use your own EmailJS account (recommended for production), follow these steps:

## Why EmailJS?

- ✅ **No Backend Required** - Works with static sites (GitHub Pages)
- ✅ **Free Tier Available** - 200 emails/month for free
- ✅ **Easy Setup** - Takes less than 5 minutes
- ✅ **Always Available** - No server to maintain or keep running

## Setup Your Own EmailJS Account

### Step 1: Create an EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

### Step 2: Add Email Service

1. Go to the **Email Services** page in your dashboard
2. Click **"Add New Service"**
3. Choose **Gmail** (or your preferred email provider)
4. Connect your email account (smangasmashntuli@gmail.com)
5. Copy the **Service ID** (e.g., `service_xxxxxx`)

### Step 3: Create Email Template

1. Go to the **Email Templates** page
2. Click **"Create New Template"**
3. Set up your template with these variables:

**Template Content:**
```
New Contact Form Submission

From: {{from_name}}
Email: {{from_email}}
Subject: {{subject}}

Message:
{{message}}

---
Sent from Portfolio Contact Form
```

4. Set the **To Email** field to: `smangasmashntuli@gmail.com`
5. Set the **Subject** to: `Portfolio Contact: {{subject}}`
6. Save and copy the **Template ID** (e.g., `template_xxxxxx`)

### Step 4: Get Your Public Key

1. Go to **Account** → **General**
2. Find your **Public Key** (e.g., `xxxxxxxxxx`)
3. Copy this key

### Step 5: Update Environment Variables

1. Open `portfolio-react/.env` file
2. Replace the values with your own:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id_here
VITE_EMAILJS_TEMPLATE_ID=your_template_id_here
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

### Step 6: Add Secrets to GitHub (for GitHub Pages Deployment)

1. Go to your GitHub repository
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **"New repository secret"** and add these three secrets:
   - Name: `VITE_EMAILJS_SERVICE_ID` → Value: your service ID
   - Name: `VITE_EMAILJS_TEMPLATE_ID` → Value: your template ID
   - Name: `VITE_EMAILJS_PUBLIC_KEY` → Value: your public key

### Step 7: Test Your Contact Form

1. Run your development server: `npm run dev`
2. Go to the Contact section
3. Fill out and submit the form
4. Check your email inbox for the message

## Rate Limits

- **Free Tier**: 200 emails/month
- **Paid Plans**: Available if you need more

## Security Note

The EmailJS public key is safe to expose in client-side code. It's designed to be public and only allows sending emails through your configured templates.

## Troubleshooting

### Email Not Received
- Check your spam/junk folder
- Verify your email service is connected in EmailJS dashboard
- Check EmailJS dashboard for delivery logs

### Form Shows Error
- Verify all three credentials are correct
- Check browser console for error messages
- Ensure you're not exceeding rate limits

### GitHub Pages Not Sending Emails
- Ensure GitHub secrets are properly set
- Re-run the GitHub Actions workflow
- Check build logs for environment variable issues

## Benefits Over Python Backend

✅ **Always Available** - No server to keep running
✅ **No Hosting Costs** - Works on free GitHub Pages
✅ **No Maintenance** - EmailJS handles everything
✅ **Reliable** - 99.9% uptime guaranteed
✅ **Scalable** - Upgrade plan as you grow

---

For more information, visit the [EmailJS Documentation](https://www.emailjs.com/docs/)
