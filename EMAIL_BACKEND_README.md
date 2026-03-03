# Email Backend Setup Instructions

## Overview
This Flask backend handles form submissions from your portfolio and MphembaMatrix projects, sending the form data to your email address.

## Prerequisites
- Python 3.8 or higher
- Gmail account with 2-Step Verification enabled

## Installation

1. Install Python dependencies:
```bash
cd C:\Users\Simangaliso\sntuliport
pip install -r requirements.txt
```

## Gmail App Password Setup

**Important:** Gmail requires an "App Password" for third-party applications.

1. Go to your Google Account: https://myaccount.google.com/
2. Navigate to **Security**
3. Enable **2-Step Verification** (if not already enabled)
4. Go to **Security** > **2-Step Verification** > **App passwords**
5. Select **Mail** as the app and **Windows Computer** as the device
6. Click **Generate**
7. Copy the 16-character password (no spaces)
8. Update the `.env` file with this password:
   ```
   MAIL_PASSWORD=your-16-character-app-password
   ```

## Running the Backend

1. Open a terminal in the project root:
```bash
cd C:\Users\Simangaliso\sntuliport
python chatS.py
```

2. The server will start on `http://localhost:5500`

## API Endpoints

### 1. Portfolio Contact Form
- **URL:** `POST http://localhost:5500/api/contact`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry",
    "message": "Your message here"
  }
  ```

### 2. MphembaMatrix Order Form
- **URL:** `POST http://localhost:5500/api/order`
- **Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+27123456789",
    "product": "AMD Ryzen 9",
    "quantity": "1",
    "message": "Additional notes"
  }
  ```

## Testing

1. Start the Flask backend:
   ```bash
   python chatS.py
   ```

2. Start your React portfolio:
   ```bash
   cd portfolio-react
   npm run dev
   ```

3. Fill out the contact form on your portfolio
4. Check your email inbox for the submission

## Troubleshooting

### "Authentication failed" error
- Make sure you're using an App Password, not your regular Gmail password
- Verify 2-Step Verification is enabled on your Google Account

### "Connection refused" error
- Ensure the Flask server is running on port 5500
- Check if another application is using port 5500

### CORS errors in browser console
- The Flask backend has CORS enabled for all origins
- Make sure `flask-cors` is installed: `pip install flask-cors`

## Security Notes

1. **Never commit the `.env` file** to version control
2. Add `.env` to your `.gitignore` file
3. The App Password should be kept secret
4. For production deployment, use environment variables instead of `.env` files

## Production Deployment

For production, consider:
1. Using a cloud service (Heroku, PythonAnywhere, AWS)
2. Setting environment variables on the hosting platform
3. Using a dedicated email service (SendGrid, Mailgun) instead of Gmail
4. Implementing rate limiting to prevent spam
