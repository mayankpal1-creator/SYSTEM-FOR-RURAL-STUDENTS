from flask import Flask, render_template, request, redirect, session, url_for, flash
from flask_mysqldb import MySQL
from flask_bcrypt import Bcrypt
import random
import smtplib
from email.message import EmailMessage
import os

app = Flask(__name__)
app.secret_key = os.getenv('SECRET_KEY', 'your_secret_key')

# MySQL Configuration
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = os.getenv('MYSQL_PASSWORD', '**12@****')  # Use env variable for security
app.config['MYSQL_DB'] = 'userdb'
app.config['MYSQL_CURSORCLASS'] = 'DictCursor'

mysql = MySQL(app)
bcrypt = Bcrypt(app)

@app.route('/')
def home():
    return render_template('home.html')

@app.route('/about')
def about():
    return render_template('about.html')

@app.route('/services')
def services():
    return render_template('services.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        email = request.form['email']
        password_input = request.form['password']

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        cursor.close()

        if user and bcrypt.check_password_hash(user['password'], password_input):
            session['name'] = user['name']
            flash('Login successful!', 'success')
            return redirect(url_for('account'))
        else:
            flash('Invalid credentials', 'danger')
            return redirect(url_for('login'))

    return render_template("login.html")

@app.route('/signup', methods=['GET', 'POST'])
def signup():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        name = request.form['name']

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        existing_user = cursor.fetchone()

        if existing_user:
            flash('Email already exists', 'warning')
            return redirect(url_for('signup'))

        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        cursor.execute("INSERT INTO users (email, password, name) VALUES (%s, %s, %s)", (email, hashed_password, name))
        mysql.connection.commit()
        cursor.close()

        session['name'] = name
        flash('Signup successful! Logged in.', 'success')
        return redirect(url_for('account'))

    return render_template('signup.html')

@app.route('/logout')
def logout():
    session.pop('name', None)
    flash('You have been logged out.', 'info')
    return redirect(url_for('login'))

# ✅ Function to generate OTP
def generate_otp():
    return str(random.randint(100000, 999999))

# ✅ Function to send OTP via Gmail
def send_otp(receiver_email, otp):
    sender_email = "etma*****@gmail.com"
    sender_password = "**** vipb nqip ocjn"  # App Password from Google

    msg = EmailMessage()
    msg.set_content(f"Your OTP is: {otp}")
    msg["Subject"] = "Your OTP Code"
    msg["From"] = sender_email
    msg["To"] = receiver_email

    try:
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()
        server.login(sender_email, sender_password)
        server.send_message(msg)
        server.quit()
        return True
    except Exception as e:
        print("Failed to send email:", e)
        return False

# ✅ Route for OTP input and sending
@app.route('/otp', methods=['GET', 'POST'])
def otp():
    next_page = request.args.get('next', 'games1')
    if request.method == 'POST' and 'email' in request.form:
        email = request.form['email']
        otp_code = generate_otp()
        session['otp'] = otp_code
        session['email'] = email
        session['next'] = request.form.get('next', next_page)  # Save next page in session
        if send_otp(email, otp_code):
            return render_template("otp.html", sent=True, email=email)
        else:
            return render_template("otp.html", sent=False, error="Failed to send OTP. Please try again.")
    return render_template("otp.html", sent=False, next=next_page)

# ✅ Route for OTP verification
@app.route('/verify', methods=['POST'])
def verify():
    user_otp = request.form['otp']
    next_page = request.form.get('next', 'games1')
    if session.get('otp') == user_otp:
        session['verified'] = True
        return redirect(url_for(next_page))
    else:
        return render_template("otp.html", sent=True, email=session.get('email'), error="Invalid OTP. Try again.", next=next_page)
    
@app.route('/games1')
def games1():
    if not session.get('verified'):
        return redirect(url_for('otp', next='games1'))
    return render_template('games1.html')



@app.route('/account')
def account():
    if 'name' not in session:
        return redirect(url_for('login'))
    return render_template('account.html', name=session['name'])

@app.route('/english')
def english():
    return render_template('english.html')


@app.route('/evs')
def evs():
    return render_template('evs.html')

@app.route('/games2')
def games2():
    return render_template('games2.html')

@app.route('/games3')
def games3():
    return render_template('games3.html')

@app.route('/games4')
def games4():
    return render_template('games4.html')

@app.route('/games5')
def games5():
    return render_template('games5.html')

@app.route('/games6')
def games6():
    return render_template('games6.html')

@app.route('/gamesmodule')
def gamesmodule():
    return render_template('gamesmodule.html')

@app.route('/learningmodule')
def learningmodule():
    return render_template('learningmodule.html')

@app.route('/maths')
def maths():
    return render_template('maths.html')

@app.route('/robotics')
def robotics():
    return render_template('robotics.html')

@app.route('/science')
def science():
    return render_template('science.html')

@app.route('/gk')
def gk():
    return render_template('gk.html')

@app.route('/result')
def result():
    return render_template('result.html')

@app.route('/dashboard')
def dashboard():
    return render_template('dashboard.html')

@app.route('/takeassessment')
def takeassessment():
    return render_template('takeassessment.html')

if __name__ == '__main__':
    app.run(debug=True)
