import email
from socket import AI_V4MAPPED
import sys
from turtle import distance
from flask import Flask, jsonify, make_response, request, redirect
from flask.helpers import url_for
from werkzeug.security import generate_password_hash, check_password_hash
from functools import wraps
import uuid
import jwt
from datetime import datetime, date
from datetime import timedelta


from werkzeug.wrappers import response
from flask_mysqldb import MySQL
import yaml
from flask_mail import Mail, Message
from flask_cors import CORS, cross_origin

# pip install pyyaml

app = Flask(__name__)
CORS(app, support_credentials=True)

# mysql database configuration
db = yaml.safe_load(open('db.yaml'))
app.config['MYSQL_HOST'] = db['mysql_host']
app.config['MYSQL_USER'] = db['mysql_user']
app.config['MYSQL_PASSWORD'] = db['mysql_password']
app.config['MYSQL_DB'] = db['mysql_db']
mysql = MySQL(app)

# SMTP mail server configuration
smtp = yaml.safe_load(open('smtp.yaml'))
app.config['MAIL_SERVER'] = smtp['mail_server']
app.config['MAIL_PORT'] = smtp['mail_port']
app.config['MAIL_USE_SSL'] = smtp['mail_use_ssl']
app.config['MAIL_USERNAME'] = smtp['mail_username']
app.config['MAIL_PASSWORD'] = smtp['mail_password']
mail = Mail(app)

app.config['SECRET_KEY'] = '78833a225392b3e31264561b1c9cd9ac'


# checks token in header
def token_required(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        # token = request.args.get('token')
        token = None
        if 'x-access-tokens' in request.headers:
            token = request.headers['x-access-tokens']
            print(token)
        if not token:
            return jsonify({'message': 'a valid token is missing'}), 403
        try:
            data = jwt.decode(
                token, app.config['SECRET_KEY'], algorithms=["HS256"])
            # uid = data['uid']
        except:
            return jsonify({'message': 'token is invalid or expired'}), 403
        # return f(uid, *args, **kwargs)
        return f(*args, **kwargs)

    return decorator


# checks token in url
def token_required_url(f):
    @wraps(f)
    def decorator(*args, **kwargs):
        token = request.args.get('token')
        # token = None
        # if 'x-access-tokens' in request.headers:
        #     token = request.headers['x-access-tokens']
        #     print(token)
        if not token:
            return jsonify({'message': 'a valid token is missing'}), 403
        try:
            data = jwt.decode(
                token, app.config['SECRET_KEY'], algorithms=["HS256"])
            uid = data['uid']
        except:
            return jsonify({'message': 'token is invalid or expired'}), 403
        return f(uid, *args, **kwargs)
        # return f(*args, **kwargs)

    return decorator


# SMTP EMAIL VERIFICATION


def send_email_verification_mail(uid, email):
    token = jwt.encode({'uid': uid,  'exp': datetime.utcnow(
    ) + timedelta(hours=24)}, app.config['SECRET_KEY'], "HS256")
    msg = Message('[ObdCharm] Email verification', recipients=[
                  email], sender='noreply@obdcharm.com')

    msg.body = f''' Click on the link below to verfiy you account
    
    http://localhost:3000/verify-account/?token={token}
    
    '''
    mail.send(msg)

# REGISTER


@app.route('/register', methods=['POST'])
@cross_origin(supports_credentials=True)
def signup_user():
    data = request.get_json()
    hashed_password = generate_password_hash(data['password'], method='sha256')
    publicid = str(uuid.uuid4())
    cursor = mysql.connection.cursor()
    cursor.execute(
        '''SELECT email FROM dashboard_userdetails WHERE email=%s''', [data['email']])
    email = cursor.fetchall()
    if(email):
        print("email exist")
        cursor.execute(
            '''SELECT is_verified FROM dashboard_userdetails WHERE email=%s''', [email])
        is_verified = cursor.fetchall()
        if(is_verified == ((0,),)):
            cursor.execute(
                '''SELECT uid FROM dashboard_userdetails WHERE email=%s''', [email])
            uid = cursor.fetchall()
            send_email_verification_mail(uid, data['email'])
            return jsonify({'status': 'success', 'message': 'Please verify your account'})
        else:
            return jsonify({'status': 'fail', 'message': 'Email Already exists, Please Login'})
    else:
        cursor.execute('''INSERT INTO dashboard_userdetails(uid, username, email, password, is_verified)
                            VALUES(%s,%s,%s,%s,%s)''',
                       (publicid, data['username'], data['email'], hashed_password, 0))

        mysql.connection.commit()
        cursor.close()
        send_email_verification_mail(publicid, data['email'])
    return jsonify({'status': 'success', 'message': 'Please verify your account'})

    # cursor.execute(
    #     '''SELECT is_verified FROM dashboard_userdetails WHERE email=%s''', [data['email']])
    # isverified = cursor.fetchall()
    # if(isverified == ((0,),)):
    #     cursor.execute(
    #         '''DELETE FROM dashboard_userdetails WHERE email=%s''', [data['email']])
    #     mysql.connection.commit()
    # else:
    #     cursor.execute(
    #         '''SELECT email FROM dashboard_userdetails WHERE email=%s''', [data['email']])
    #     email = cursor.fetchall()
    #     if email:
    #         return jsonify({'status': 'fail', 'message': 'Email already exist'})
    #     else:
    #         cursor.execute('''INSERT INTO dashboard_userdetails(uid, username, email, password, is_verified)
    #                         VALUES(%s,%s,%s,%s,%s)''',
    #                        (publicid, data['username'], data['email'], hashed_password, 0))

    #         mysql.connection.commit()
    #         cursor.close()
    #     send_email_verification_mail(publicid, data['email'])
    return jsonify({'status': 'success', 'message': 'Please verify your account'})

# VERIFY ACCOUNT API


@app.route('/verify-account/', methods=['GET', 'POST'])
@token_required_url
def verify_account(uid):
    if request.method == 'POST':
        if uid is None:
            return jsonify({'status': 'fail', 'message': 'Invalid or expired token'})
            # should resend the token
            # return redirect(url_for('sign-up or verify req or login'))
        else:
            cursor = mysql.connection.cursor()
            cursor.execute(
                '''UPDATE dashboard_userdetails SET is_verified=%s WHERE uid=%s''', (1, uid))
            mysql.connection.commit()
            cursor.close()
            return jsonify({'status': 'success', 'message': 'Email verified, please login!'})
            # return redirect(url_for('login'))

# LOGIN API


@app.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
def login_user():
    data = request.get_json(force=True)
    if not data or not data["email"] or not data["password"]:
        return jsonify({'status': "fail", 'message': 'Email and Password are required'})
    cursor = mysql.connection.cursor()
    cursor.execute(
        '''SELECT email,password,uid,is_verified FROM dashboard_userdetails WHERE email=%s''', [data['email']])
    user = cursor.fetchall()
    if user:
        if user[0][3] == 1:
            password = str(user[0][1])
            uid = str(user[0][2])

            if check_password_hash(password, data["password"]):
                token = jwt.encode({'uid': uid, },
                                   app.config['SECRET_KEY'], "HS256")
                ret = {'status': 'success', 'data': data, 'token': token}
                return jsonify(ret)
        else:
            return jsonify({'status': "fail", 'message': 'Verify Your Email First! '})
    else:
        return jsonify({'status': "fail", 'message': 'Invalid Email or Password '})
    return jsonify({'status': "fail", 'message': 'Invalid Email or Password '})


# SEND RESET PASSWORD FUNC
# send a reset password token email to user email


def send_reset_password_mail(user):
    email = str(user[0][0])
    # password = str(user[0][1])
    uid = str(user[0][2])

    token = jwt.encode({'uid': uid, 'exp': datetime.utcnow(
    ) + timedelta(hours=24)}, app.config['SECRET_KEY'], "HS256")

    msg = Message('[ObdCharm] Please reset your password',
                  recipients=[email], sender='noreply@obdcharm.com')

    msg.body = f''' To reset your password, please click the link below
    
    http://localhost:3000/reset-password/?token={token}
    
    If you didn't send a password reset request, Please ignore this message. 
    '''
    mail.send(msg)


# FORGET PASSWORD
# forget password api recieves user email and send a reset password token mail to reset password


@app.route('/forget-password', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def forget_password():
    if request.method == 'POST':
        data = request.get_json(force=True)
        if not data or not data["email"]:
            return jsonify({'status': "fail", 'message': 'Email is required'})

        cursor = mysql.connection.cursor()
        cursor.execute(
            '''SELECT email,password,uid FROM dashboard_userdetails WHERE email=%s''', [data['email']])
        user = cursor.fetchall()
        mysql.connection.commit()
        cursor.close()
        if user:
            send_reset_password_mail(user)
            return jsonify({'status': 'success', 'message': 'Reset password link has been sent to your email'})
            # return redirect(url_for('login'))
        else:
            return jsonify({'status': "fail", 'message': 'No account found on this email! Please sign-up.'})
            # return redirect(url_for('forget_password'))


# RESET PASSWORD API
# change the password if token is valid and not expired


@app.route('/reset-password/', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
@token_required_url
def reset_password(uid):
    if request.method == 'POST':
        data = request.get_json(force=True)
        password = data["password"]
        if uid is None:
            return jsonify({'status': 'fail', 'message': 'Invalid or expired token'})
            # return redirect(url_for('forget_password'))
        else:
            hashed_password = generate_password_hash(
                password, method='sha256')
            cursor = mysql.connection.cursor()
            cursor.execute(
                '''UPDATE dashboard_userdetails SET password=%s WHERE uid=%s''', (hashed_password, uid))
            mysql.connection.commit()
            cursor.close()
            return jsonify({'status': 'success', 'message': 'Password Sucessfully Changed!'})

            # return redirect(url_for('login'))


# CAR TRENDS API (OBD PARAMETERS)
# fetch obd parameters from db of specified car in set duration to display charts


@app.route('/car-trends/', methods=['POST'])
@cross_origin(supports_credentials=True)
# @token_required
def car_trends():
    data = request.get_json(force=True)
    start_date = data['start_date'] + " 00:00:00"
    end_date = data['end_date'] + " 23:59:59"
    car_id = data['car_id']
    parameter_array = data['parameters']

    pr_concat = ""

    for parameter in parameter_array:
        pr_concat = pr_concat + parameter + ", "

    cursor = mysql.connection.cursor()

    cursor.execute(f'''SELECT {pr_concat} time_stamp from car_data_bulk where (car_reg_no = %s) AND (UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) >  unix_timestamp(%s) and UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) <  unix_timestamp(%s))''', (car_id, start_date, end_date))

    # cursor.execute(f''' SELECT {parameter_name}, time_stamp FROM car_data_bulk WHERE (car_reg_no = %s) AND (time_stamp BETWEEN %s AND %s) ''',
    #                (car_id, start_date, end_date))

    # print(data)

    params = cursor.fetchall()

    # return jsonify({"params": params})

    # print(params)

    if params:

        data = []
        for x in params:
            obj = {}
            for i in range(len(parameter_array)):
                obj[parameter_array[i]] = 0 if x[i] == '' else float(x[i])
            obj['date'] = x[len(parameter_array)]

            data.append(obj)

        # parameter_values = {}
        # time_stamps = []

        # for i in range(len(parameter_array)):
        #     parameter_values[parameter_array[i]] = []

        # for x in params:
        #     for i in range(len(parameter_array)):
        #         parameter_values[parameter_array[i]].append(x[i])

        #     time_stamps.append(x[len(parameter_array)])

        return jsonify({"status": "success", "data": data})

    else:
        return jsonify({'status': 'fail', 'message': 'No record found for the given date'})


# LAST RECORD OF CAR

@app.route('/cars-last-record/', methods=['GET'])
@cross_origin(supports_credentials=True)
# @token_required
def cars_last_record():
    cursor = mysql.connection.cursor()
    cursor.execute(
        "SELECT car_data_bulk.car_reg_no,max(car_data_bulk.time_stamp),cars.make,cars.model,cars.year,users.firstname, users.surname from car_data_bulk inner join cars on cars.car_id = car_data_bulk.car_reg_no  inner join users on cars.user_id  = users.id where car_reg_no NOT IN ((''),('null'),132,35,27,153,138,35,99,114,110,107,100,105,103,91,156,168,152,155,64,151,158,154,157,89,156,152,146,117,122,124,126,79) group by car_reg_no")
    bulk = cursor.fetchall()

    obj = []
    for i in bulk:
        time = i[1].split(" ")[0]
        time = datetime.strptime(time, '%Y-%m-%d')
        time = time.strftime("%d %b %Y")
        obj = [*obj,  {"id": i[0], "time":time, "make":i[2],
                       "model": i[3], "year":i[4], "name":i[5], "surname":i[6]}]

    return jsonify({'status': 'success', 'data': obj})

# ALL CAR DETAILS API (FOR ALL CARS)


@app.route('/all-car-details/', methods=['POST'])
@cross_origin(supports_credentials=True)
# @token_required
def all_car_details():
    data = request.get_json(force=True)
    cursor = mysql.connection.cursor()
    date = data['start_date'] + " 00:00:00"
    enddate = data['end_date'] + " 23:59:00"
    cursor.execute(
        "SELECT Distinct car_reg_no from car_data_bulk where UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) >  unix_timestamp(%s) and UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) <  unix_timestamp(%s)", (date, enddate))
    bulk = cursor.fetchall()
    print("beforee", bulk)
    if bulk:

        cursor.execute(
            '''SELECT cars.car_id, cars.make, cars.model, cars.year, users.firstname, users.email
            FROM cars INNER JOIN users on cars.user_id = users.id 
            WHERE cars.car_id in %s''', [bulk])

        cars = cursor.fetchall()
        print(cars, "cars")
        obj = []
        for i in cars:
            obj = [*obj,  {"id": i[0], "make":i[1],
                           "model": i[2], "year":i[3], "name":i[4], "email":i[5]}]
            print(obj)
        return jsonify({'status': 'success', 'data': obj})

    return jsonify({'status': 'fail', 'message': "No cars found in specified duration"})


# DASHBOARD API 01 ( CAR INFO IN A SPECIFIED DATE )

@app.route('/dashboard-cars/', methods=['POST'])
@cross_origin(supports_credentials=True)
def dashboard_cars():
    data = request.get_json(force=True)
    startdate = data['date'] + " 00:00:00"
    enddate = data['date'] + " 23:59:00"

    cursor = mysql.connection.cursor()

    cursor.execute(
        "SELECT Distinct car_reg_no from car_data_bulk where UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) >  unix_timestamp(%s) and UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) <  unix_timestamp(%s)", (startdate, enddate))
    car_ids = cursor.fetchall()
    print(car_ids)

    if car_ids:

        cursor.execute(
            '''SELECT cars.car_id, cars.make, cars.model, cars.year, users.firstname, users.email
            FROM cars INNER JOIN users on cars.user_id = users.id 
            WHERE cars.car_id in %s''', [car_ids])

        cars = cursor.fetchall()
        print(cars, "cars")

        cardetails = []

        for i in cars:
            cardetails = [*cardetails,  {"id": i[0], "make":i[1],
                                         "model": i[2], "year":i[3], "name":i[4], "email":i[5]}]
            print(cardetails)

        return jsonify({'status': 'success', 'data': cardetails})

    return jsonify({'status': 'fail', 'message': "No cars found on specified date"})


# DASHBOARD API 02 (MIN, MAX, AVG SPEED & RPM)

@app.route('/dashboard-parameters/', methods=['POST'])
@cross_origin(supports_credentials=True)
# @token_required
def dashboard_parameters():
    data = request.get_json(force=True)
    car_id = data['car_id']

    # CURRENT DATE
    # current_date = str(date.today())
    # print("Current date:", current_date)

    start_date = data['date'] + " 00:00:00"
    end_date = data['date'] + " 23:59:59"

    # AVG VEHICLE SPEED & ENGINE RPM

    cursor = mysql.connection.cursor()

    cursor.execute(f'''SELECT vehicle_speed, engine_rpm
                    FROM car_data_bulk WHERE (car_reg_no = %s) AND (UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) >  unix_timestamp(%s) and UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) <  unix_timestamp(%s)) 
                    ''', (car_id, start_date, end_date))

    avg_params = cursor.fetchall()

    print(avg_params)

    if avg_params:

        vehicle_speed = []
        engine_rpm = []
        non_zero_speed = []
        non_zero_rpm = []

        for y in avg_params:
            vehicle_speed.append(float(y[0]))
            engine_rpm.append(float(y[1]))
            if(float(y[0]) != 0):
                non_zero_speed.append(float(y[0]))

            if(float(y[1]) != 0 and y[1] != ''):
                non_zero_rpm.append(float(y[1]))

        avg_speed = round(sum(vehicle_speed)/len(vehicle_speed), 2)
        avg_rpm = round(sum(engine_rpm)/len(engine_rpm), 2)
        min_speed = min(non_zero_speed)
        min_rpm = min(non_zero_rpm)
        max_speed = max(vehicle_speed)
        max_rpm = max(engine_rpm)

    else:
        avg_speed = 0.0
        avg_rpm = 0.0
        min_speed = 0.0
        min_rpm = 0.0
        max_speed = 0.0
        max_rpm = 0.0

    average_parameters = {
        "average_vehicle_speed": avg_speed,
        "min_vehicle_speed": min_speed,
        "max_vehicle_speed": max_speed,
        "average_engine_rpm": avg_rpm,
        "min_engine_rpm": min_rpm,
        "max_engine_rpm": max_rpm,
    }

    return jsonify({'status': 'success', "average_parameters": average_parameters})


# DASHBOARD API (Average vehicle speed in 24 hrs)

@app.route('/dashboard-hourlyAvgSpeed/', methods=['POST'])
@cross_origin(supports_credentials=True)
# @token_required
def dashboard_hourlyAvgSpeed():
    data = request.get_json(force=True)
    car_id = data['car_id']
    start_date = data['date'] + " 00:00:00"
    end_date = data['date'] + " 23:59:59"

    # AVG VEHICLE SPEED

    cursor = mysql.connection.cursor()

    cursor.execute(f'''SELECT vehicle_speed, time_stamp
                        FROM car_data_bulk WHERE (car_reg_no = %s) AND (UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) >  unix_timestamp(%s) and UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) <  unix_timestamp(%s))
                        ''', (car_id, start_date, end_date))

    params = cursor.fetchall()

    print(params)
    print("\n\n\n")

    returnObj = {
        "hours": [],
        "avg_speed": [],
    }

    for x in range(24):
        print("--------------------")
        print("ENTERING FOR LOOP")
        print("--------------------")
        if params:
            print("--------------------")
            print("PARAMS FOUND")
            print("--------------------")
            vehicle_speed = []
            for y in params:
                if((data['date']+" "+format(x, "02") in y[1]) and (float(y[0]) != 0)):
                    print("adding: ", y)
                    vehicle_speed.append(float(y[0]))

            if(len(vehicle_speed) != 0):
                avg_speed = round(sum(vehicle_speed)/len(vehicle_speed), 2)
                print("--------------------")
                print("AVG = ", avg_speed)
                print("--------------------")
            else:
                avg_speed = 0.0
                print("--------------------")
                print("EMPTY VS AVG = ", avg_speed)
                print("--------------------")
        else:
            avg_speed = 0.0
            print("--------------------")
            print("NO PARAMS AVG = ", avg_speed)
            print("--------------------")

        returnObj['hours'].append(x+1)
        returnObj['avg_speed'].append(avg_speed)

    return jsonify({'status': 'success', "hourly_average_speed": returnObj})


# DASHBOARD API (Average vehicle speed in 7 days (week) )

@app.route('/dashboard-weekAvgSpeed/', methods=['POST'])
@cross_origin(supports_credentials=True)
# @token_required
def dashboard_weekAvgSpeed():
    data = request.get_json(force=True)
    car_id = data['car_id']

    startDateArr = [None]*7
    endDateArr = [None]*7
    startDateArr[6] = datetime.strptime(
        data['date']+" 00:00:00", '%Y-%m-%d %H:%M:%S')
    endDateArr[6] = datetime.strptime(
        data['date']+" 23:59:59", '%Y-%m-%d %H:%M:%S')

    # start with 5th index to 0th index with step -1
    for i in range(5, -1, -1):
        startDateArr[i] = startDateArr[i+1] - timedelta(days=1)
        endDateArr[i] = endDateArr[i+1] - timedelta(days=1)

    cursor = mysql.connection.cursor()
    cursor.execute(f'''SELECT vehicle_speed, time_stamp
                    FROM car_data_bulk WHERE (car_reg_no = %s) AND (UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) >  unix_timestamp(%s) and UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) <  unix_timestamp(%s))
                    ''', (car_id, str(startDateArr[0]), str(endDateArr[6])))

    params = cursor.fetchall()
    print(params)
    print("\n\n\n")

    returnObj = {
        "startDate": [],
        "endDate": [],
        "avg_speed": [],
    }

    for i in range(7):

        if params:
            print("--------------------")
            print("PARAMS FOUND")
            print("--------------------")
            vehicle_speed = []
            dateStr = str(startDateArr[i]).split(" ")[0]
            for y in params:
                if((dateStr in y[1]) and (float(y[0]) != 0)):
                    print("adding: ", y)
                    vehicle_speed.append(float(y[0]))

            if(len(vehicle_speed) != 0):
                avg_speed = round(sum(vehicle_speed)/len(vehicle_speed), 2)
                print("--------------------")
                print("AVG = ", avg_speed)
                print("--------------------")
            else:
                avg_speed = 0.0
                print("--------------------")
                print("EMPTY VS AVG = ", avg_speed)
                print("--------------------")
        else:
            avg_speed = 0.0
            print("--------------------")
            print("NO PARAMS AVG = ", avg_speed)
            print("--------------------")

        returnObj['startDate'].append(str(startDateArr[i]).split(" ")[0])
        returnObj['endDate'].append(str(endDateArr[i]))
        returnObj['avg_speed'].append(avg_speed)

    return jsonify({'status': 'success', "week_average_speed": returnObj})


# DASHBOARD API (Average Enigne RPM in 24 hrs)

@app.route('/dashboard-hourlyAvgRpm/', methods=['POST'])
@cross_origin(supports_credentials=True)
# @token_required
def dashboard_hourlyAvgRpm():
    data = request.get_json(force=True)
    car_id = data['car_id']
    start_date = data['date'] + " 00:00:00"
    end_date = data['date'] + " 23:59:59"

    # AVG ENGINE RPM

    cursor = mysql.connection.cursor()

    cursor.execute(f'''SELECT engine_rpm, time_stamp
                        FROM car_data_bulk WHERE (car_reg_no = %s) AND (UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) >  unix_timestamp(%s) and UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) <  unix_timestamp(%s))
                        AND engine_rpm <> "" ''', (car_id, start_date, end_date))

    params = cursor.fetchall()

    print(params)
    print("\n\n\n")

    returnObj = {
        "hours": [],
        "avg_rpm": [],
    }

    for x in range(24):
        print("--------------------")
        print("ENTERING FOR LOOP")
        print("--------------------")
        if params:
            print("--------------------")
            print("PARAMS FOUND")
            print("--------------------")
            engine_rpm = []
            for y in params:
                if((data['date']+" "+format(x, "02") in y[1]) and (float(y[0]) != 0)):
                    print("adding: ", y)
                    engine_rpm.append(float(y[0]))

            if(len(engine_rpm) != 0):
                avg_rpm = round(sum(engine_rpm)/len(engine_rpm), 2)
                print("--------------------")
                print("AVG = ", avg_rpm)
                print("--------------------")
            else:
                avg_rpm = 0.0
                print("--------------------")
                print("EMPTY VS AVG = ", avg_rpm)
                print("--------------------")
        else:
            avg_rpm = 0.0
            print("--------------------")
            print("NO PARAMS AVG = ", avg_rpm)
            print("--------------------")

        returnObj['hours'].append(x+1)
        returnObj['avg_rpm'].append(avg_rpm)

    return jsonify({'status': 'success', "hourly_average_rpm": returnObj})


# DASHBOARD API (Average Enigne RPM in 7 days (week) )

@app.route('/dashboard-weekAvgRpm/', methods=['POST'])
@cross_origin(supports_credentials=True)
# @token_required
def dashboard_weekAvgRpm():
    data = request.get_json(force=True)
    car_id = data['car_id']

    startDateArr = [None]*7
    endDateArr = [None]*7
    startDateArr[6] = datetime.strptime(
        data['date']+" 00:00:00", '%Y-%m-%d %H:%M:%S')
    endDateArr[6] = datetime.strptime(
        data['date']+" 23:59:59", '%Y-%m-%d %H:%M:%S')

    # start with 5th index to 0th index with step -1
    for i in range(5, -1, -1):
        startDateArr[i] = startDateArr[i+1] - timedelta(days=1)
        endDateArr[i] = endDateArr[i+1] - timedelta(days=1)

    cursor = mysql.connection.cursor()
    cursor.execute(f'''SELECT engine_rpm, time_stamp
                    FROM car_data_bulk WHERE (car_reg_no = %s) AND (UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) >  unix_timestamp(%s) and UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) <  unix_timestamp(%s))
                    AND engine_rpm <> "" ''', (car_id, str(startDateArr[0]), str(endDateArr[6])))

    params = cursor.fetchall()
    print(params)
    print("\n\n\n")

    returnObj = {
        "startDate": [],
        "endDate": [],
        "avg_rpm": [],
    }

    for i in range(7):

        if params:
            print("--------------------")
            print("PARAMS FOUND")
            print("--------------------")
            engine_rpm = []
            dateStr = str(startDateArr[i]).split(" ")[0]
            for y in params:
                if((dateStr in y[1]) and (float(y[0]) != 0)):
                    print("adding: ", y)
                    engine_rpm.append(float(y[0]))

            if(len(engine_rpm) != 0):
                avg_rpm = round(sum(engine_rpm)/len(engine_rpm), 2)
                print("--------------------")
                print("AVG = ", avg_rpm)
                print("--------------------")
            else:
                avg_rpm = 0.0
                print("--------------------")
                print("EMPTY VS AVG = ", avg_rpm)
                print("--------------------")
        else:
            avg_rpm = 0.0
            print("--------------------")
            print("NO PARAMS AVG = ", avg_rpm)
            print("--------------------")

        returnObj['startDate'].append(str(startDateArr[i]).split(" ")[0])
        returnObj['endDate'].append(str(endDateArr[i]))
        returnObj['avg_rpm'].append(avg_rpm)

    return jsonify({'status': 'success', "week_average_rpm": returnObj})


# DASHBOARD API (Average fuel consumption in 24 hrs)

@app.route('/dashboard-hourlyAvgFuelconsumption/', methods=['POST'])
@cross_origin(supports_credentials=True)
# @token_required
def dashboard_hourlyAvgFuel():
    data = request.get_json(force=True)
    car_id = data['car_id']
    start_date = data['date'] + " 00:00:00"
    end_date = data['date'] + " 23:59:59"

    # AVG Fuel Consumption

    cursor = mysql.connection.cursor()

    cursor.execute(f'''SELECT mass_air_flow_rate, time_stamp
                        FROM car_data_bulk WHERE (car_reg_no = %s) AND (UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) >  unix_timestamp(%s) and UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) <  unix_timestamp(%s))
                        AND mass_air_flow_rate <> "" ''', (car_id, start_date, end_date))

    params = cursor.fetchall()

    print(params)
    print("\n\n\n")

    returnObj = {
        "hours": [],
        "avg_fuel_consumption": [],
    }

    for x in range(24):
        print("--------------------")
        print("ENTERING FOR LOOP")
        print("--------------------")
        if params:
            print("--------------------")
            print("PARAMS FOUND")
            print("--------------------")
            MAF = []
            for y in params:
                if((data['date']+" "+format(x, "02") in y[1]) and (float(y[0]) != 0)):
                    print("adding: ", y)
                    MAF.append(float(y[0]))

            if(len(MAF) != 0):
                avg_maf = round(sum(MAF)/len(MAF), 2)
                avg_fuel_consumption = (((avg_maf*14.7)/454)/6.701)*3600
                # unit: gallons per hr

                print("--------------------")
                print("AVG = ", avg_fuel_consumption)
                print("--------------------")

            else:
                avg_fuel_consumption = 0.0
                print("--------------------")
                print("EMPTY VS AVG = ", avg_fuel_consumption)
                print("--------------------")
        else:
            avg_fuel_consumption = 0.0
            print("--------------------")
            print("NO PARAMS AVG = ", avg_fuel_consumption)
            print("--------------------")

        returnObj['hours'].append(x+1)
        returnObj['avg_fuel_consumption'].append(avg_fuel_consumption)

    return jsonify({'status': 'success', "hourly_average_fuel_consumption": returnObj})


# DASHBOARD API (Average Fuel Consumption in 7 days (week) )

@app.route('/dashboard-weekAvgFuelconsumption/', methods=['POST'])
@cross_origin(supports_credentials=True)
# @token_required
def dashboard_weekAvgFuel():
    data = request.get_json(force=True)
    car_id = data['car_id']

    startDateArr = [None]*7
    endDateArr = [None]*7
    startDateArr[6] = datetime.strptime(
        data['date']+" 00:00:00", '%Y-%m-%d %H:%M:%S')
    endDateArr[6] = datetime.strptime(
        data['date']+" 23:59:59", '%Y-%m-%d %H:%M:%S')

    # start with 5th index to 0th index with step -1
    for i in range(5, -1, -1):
        startDateArr[i] = startDateArr[i+1] - timedelta(days=1)
        endDateArr[i] = endDateArr[i+1] - timedelta(days=1)

    cursor = mysql.connection.cursor()
    cursor.execute(f'''SELECT mass_air_flow_rate, time_stamp
                    FROM car_data_bulk WHERE (car_reg_no = %s) AND (UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) >  unix_timestamp(%s) and UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) <  unix_timestamp(%s))
                    AND mass_air_flow_rate <> "" ''', (car_id, str(startDateArr[0]), str(endDateArr[6])))

    params = cursor.fetchall()
    print(params)
    print("\n\n\n")

    returnObj = {
        "startDate": [],
        "endDate": [],
        "avg_fuel_consumption": [],
    }

    for i in range(7):

        if params:
            print("--------------------")
            print("PARAMS FOUND")
            print("--------------------")
            MAF = []
            dateStr = str(startDateArr[i]).split(" ")[0]
            for y in params:
                if((dateStr in y[1]) and (float(y[0]) != 0)):
                    print("adding: ", y)
                    MAF.append(float(y[0]))

            if(len(MAF) != 0):
                avg_maf = round(sum(MAF)/len(MAF), 2)
                avg_fuel_consumption = (((avg_maf*14.7)/454)/6.701)*3600
                # unit: gallons per hr

                print("--------------------")
                print("AVG = ", avg_fuel_consumption)
                print("--------------------")
            else:
                avg_fuel_consumption = 0.0
                print("--------------------")
                print("EMPTY VS AVG = ", avg_fuel_consumption)
                print("--------------------")
        else:
            avg_fuel_consumption = 0.0
            print("--------------------")
            print("NO PARAMS AVG = ", avg_fuel_consumption)
            print("--------------------")

        returnObj['startDate'].append(str(startDateArr[i]).split(" ")[0])
        returnObj['endDate'].append(str(endDateArr[i]))
        returnObj['avg_fuel_consumption'].append(avg_fuel_consumption)

    return jsonify({'status': 'success', "week_average_fuel_consumption": returnObj})


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
