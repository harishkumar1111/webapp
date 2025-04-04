from flask import Flask, render_template, request, redirect, url_for

app = Flask(__name__)
@app.route('/')
def home():
    return redirect(url_for('login'))
# Route for login page
@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form.get('username')
        password = request.form.get('password')
        # Authentication logic
        if username == "admin" and password == "123":  # Updated credentials
            return redirect(url_for('appointment'))
        else:
            return "Invalid credentials", 401
    return render_template('login.html')

# Route for appointment page
@app.route('/appointment', methods=['GET', 'POST'])
def appointment():
    if request.method == 'POST':
        # Process appointment form data
        if request.form.get('password') != '123':
            return "Invalid password", 401
        appointment_data = request.form
        return f"Appointment booked: {appointment_data}"
    return render_template('appointment.html')

if __name__ == '__main__':
    app.run(debug=True)
