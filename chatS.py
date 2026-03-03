from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)  # Enable CORS for React frontend

# Email configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME', 'smangasmashntuli@gmail.com')
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD', 'Ntuul95087')
app.config['MAIL_DEFAULT_SENDER'] = 'smangasmashntuli@gmail.com'

mail = Mail(app)

# Portfolio contact form endpoint
@app.route('/api/contact', methods=['POST'])
def submit_contact():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject')
    message = data.get('message')

    if not name or not email or not subject or not message:
        return jsonify({'error': 'All fields are required'}), 400
    
    try:
        msg = Message(
            subject=f"Portfolio Contact: {subject}",
            recipients=['smangasmashntuli@gmail.com'],
            body=f"""
New Contact Form Submission from Portfolio

Name: {name}
Email: {email}
Subject: {subject}

Message:
{message}

---
Sent from Portfolio Contact Form
            """
        )
        mail.send(msg)
        return jsonify({'message': 'Message sent successfully!'}), 200
    except Exception as e:
        print(f"Error sending email: {e}")
        return jsonify({'error': 'Failed to send message. Please try again.'}), 500

# MphembaMatrix contact/order form endpoint
@app.route('/api/order', methods=['POST'])
def submit_order():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    phone = data.get('phone')
    product = data.get('product')
    quantity = data.get('quantity')
    message = data.get('message', '')

    if not name or not email or not product:
        return jsonify({'error': 'Required fields missing'}), 400
    
    try:
        msg = Message(
            subject=f"MphembaMatrix Order: {product}",
            recipients=['smangasmashntuli@gmail.com'],
            body=f"""
New Order from MphembaMatrix

Name: {name}
Email: {email}
Phone: {phone or 'Not provided'}
Product: {product}
Quantity: {quantity or '1'}

Additional Message:
{message or 'None'}

---
Sent from MphembaMatrix Order Form
            """
        )
        mail.send(msg)
        return jsonify({'message': 'Order submitted successfully!'}), 200
    except Exception as e:
        print(f"Error sending order email: {e}")
        return jsonify({'error': 'Failed to submit order. Please try again.'}), 500

# Legacy comment endpoint (keeping for backward compatibility)
@app.route('/submit-comment', methods=['POST'])
def submit_comment():
    data = request.json
    name = data.get('name')
    comment = data.get('comment')

    if not name or not comment:
        return jsonify({'error': 'Fill all fields'}), 400
    
    try:
        msg = Message(
            subject="New Comment On Portfolio",
            recipients=['smangasmashntuli@gmail.com'],
            body=f"Name: {name}\nComment: {comment}"
        )
        mail.send(msg)
        return jsonify({'message': 'Comment submitted'}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Failed to send comment'}), 500
    
if __name__ == '__main__':
    app.run(port=5500, debug=True)