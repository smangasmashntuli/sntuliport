from flask import Flask, request, jsonify
from flask_mail import Mail, Message

app = Flask(__name__)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'smangasmashntuli@gmail.com'
app.config['MAIL_PASSWORD'] = 'Ntuul95087'
app.config['MAIL_DEFAULT_SENDER'] = 'smangasmashntulli@gmail.com'

mail = Mail(app)
@app.route('/submit-comment', methods=['POST'])
def submit_comment():
    data = request.json
    name = data.get('name')
    comment = data.get('comment')

    if not name or not comment:
        return jsonify({'error': 'Fill all fields'}), 400
    
    try:
        msg = Message(
            subject = "New Comment On Portfolio",
            sender = ["smangasmashntuli@gmail.com"],
            body = f"Name: {name}\nComment: {comment}"
        )
        mail.send(msg)
        return jsonify({'message': 'Comment submitted'}), 200
    except Exception as e:
        print(f"Error: {e}")
        return jsonify({'error': 'Failed to send comment'}), 500
    
if __name__ == '__main__':
    app.run(port=5500, debug=True)