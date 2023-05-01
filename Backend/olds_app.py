

# CARS TABLE API (CAR DETAILS FOR DURATION SELECTED)


@app.route('/car', methods=['POST'])
@cross_origin(supports_credentials=True)
# @token_required
def car_user():
    lst2 = ""
    lst3 = ""
    r = ""
    y = ""
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
            "select DISTINCT car_reg_no from car_data_bulk WHERE car_reg_no in %s and time_stamp >= DATE_SUB(%s, INTERVAL 7 DAY)", (bulk, enddate))
        green = cursor.fetchall()
        # print("after",green)
        blk = list(bulk)
        lst = list(green)
        arr = []
        for i in blk:
            if i not in lst:
                arr.append(i)
        # print(arr,"array")
        if arr:
            cursor.execute(
                "select DISTINCT car_reg_no from car_data_bulk WHERE car_reg_no in %s and time_stamp >= DATE_SUB(%s, INTERVAL 1 MONTH)", (arr, enddate))
            yellow = cursor.fetchall()
            # print("new carss",yellow)
            lst2 = list(yellow)
            arr2 = []
            for i in arr:
                if i not in lst2:
                    arr2.append(i)
            # print(arr2,"array2")
            if arr2:
                cursor.execute(
                    "select DISTINCT car_reg_no from car_data_bulk WHERE car_reg_no in %s and time_stamp >= DATE_SUB(%s, INTERVAL 1 YEAR)", (arr2, enddate))
                red = cursor.fetchall()
                # print("new carss",red)
                lst3 = list(red)
                arr3 = []
                for i in arr2:
                    if i not in lst3:
                        arr3.append(i)
                        # print(arr3,"array3")

        def getData(array, color):
            cursor.execute('''SELECT 
  cars.car_id,cars.year, cars.make, cars.model,cars.fueltype, 
  users.firstname,users.email 
  FROM cars 
  INNER JOIN users on cars.user_id = users.id WHERE cars.car_id in %s''', [array])
            car = cursor.fetchall()
            obj = []
            for i in car:
                obj = [*obj,  {"id": i[0], "color":color, "year": i[1], "make":i[2],
                               "model":i[3], "fueltype":i[4], "firstname": i[5], "email":i[6]}]
            print(obj)
            return obj
        g = getData(lst, "green")
        if lst2:
            y = getData(lst2, "yellow")
        if lst3:
            r = getData(lst3, "red")
        obj = {'red': r, 'yellow': y, 'green': g}
    else:
        return jsonify({'status': 'fail', 'message': 'No record found for the given date.'})
    print(obj)
    return jsonify({"status": "success", "caruserdata": obj})


# EMAIL CAR DETAILS API (FOR CARS with entered EMAIL)


@app.route('/email-car-details/', methods=['POST'])
@cross_origin(supports_credentials=True)
# @token_required
def email_car_details():
    data = request.get_json(force=True)
    email = data['email']

    cursor = mysql.connection.cursor()
    cursor.execute(
        '''SELECT cars.car_id, cars.make, cars.model, cars.year, users.firstname ,users.email
            FROM cars INNER JOIN users on cars.user_id = users.id 
            WHERE (cars.car_id NOT IN (132,35,27,153,138,35,99,114,110,107,100,105,103,91,156,168,152,155,64,151,158,154,157,89,156,152))
            AND (users.email = %s)''', ([email]))

    cars = cursor.fetchall()
    if(cars):
        obj = []
        for i in cars:
            obj = [*obj,  {"id": i[0], "make":i[1],
                           "model": i[2], "year":i[3], "name":i[4], "email":i[5]}]
            print(obj)
        return jsonify({'status': 'success', 'data': obj})
    else:
        return jsonify({'status': 'fail', 'message': "No Record Found! "})
    return jsonify({'status': 'fail', 'message': "Error has occured"})


# CAR AVERAGE PARAMETERS API
# for a car return average speed, rpm and distance of current day


@app.route('/car-average-parameters/', methods=['POST'])
@cross_origin(supports_credentials=True)
# @token_required
def car_average_parameters():
    data = request.get_json(force=True)
    car_id = data['car_id']

    # CURRENT DATE

    current_date = str(date.today())
    # print("Current date:", current_date)
    start_date = current_date + " 00:00:00"
    end_date = current_date + " 23:59:59"

    # AVG VEHICLE SPEED & ENGINE RPM

    cursor = mysql.connection.cursor()
    # cursor.execute(f'''SELECT ROUND(AVG(vehicle_speed),2) as average_vehicle_speed,
    #                 ROUND(AVG(engine_rpm),2) as average_engine_rpm,
    #                 ROUND(MIN(vehicle_speed),2) as min_vehicle_speed,
    #                 ROUND(MIN(engine_rpm),2) as min_engine_rpm,
    #                 ROUND(MAX(vehicle_speed),2) as max_vehicle_speed,
    #                 ROUND(MAX(engine_rpm),2) as max_engine_rpm
    #                 FROM car_data_bulk WHERE (car_reg_no = %s) AND (UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) >  unix_timestamp(%s) and UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) <  unix_timestamp(%s))
    #                 AND engine_rpm <> "" ''', (car_id, start_date, end_date))

    cursor.execute(f'''SELECT vehicle_speed, engine_rpm
                    FROM car_data_bulk WHERE (car_reg_no = %s) AND (UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) >  unix_timestamp(%s) and UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) <  unix_timestamp(%s))
                    AND engine_rpm <> "" ''', (car_id, start_date, end_date))

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

    # DISTANCE

    cursor.execute(
        '''SELECT vehicle_speed,engine_rpm,time_stamp 
           FROM car_data_bulk WHERE (car_reg_no = %s) AND (UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) >  unix_timestamp(%s) and UNIX_TIMESTAMP(CAST(time_stamp AS DATETIME)) <  unix_timestamp(%s))
           AND engine_rpm <> "" ''', (car_id, start_date, end_date))

    params = cursor.fetchall()

    params_length = len(params)
    timestamp_i = []
    timestamp_f = []
    counter = 0
    i = 0

    # loop for finding the timestamps w.r to vehicle speed

    for x in range(i, params_length):
        for x in range(i, params_length):
            if (float(params[x][0]) != 0 and float(params[x][0]) != ""):
                timestamp_i.append(params[x][2])
                i = i+1
                break
            else:
                i = i+1

        for x in range(i, params_length):
            if (float(params[x][0]) == 0):
                counter = counter+1

            if (counter >= 2):
                timestamp_f.append(params[x-2][2])
                i = i+1
                counter = 0
                break
            else:
                i = i+1

    print(timestamp_i)
    print(timestamp_f)

    # Time differece & Total time

    timestamp_length = len(timestamp_f)
    total_time_sec = 0

    for y in range(0, timestamp_length):
        datetime_i = datetime.strptime(timestamp_i[y], '%Y-%m-%d %H:%M:%S')
        datetime_f = datetime.strptime(timestamp_f[y], '%Y-%m-%d %H:%M:%S')

        datetime_difference = datetime_f - datetime_i
        datetime_difference_sec = datetime_difference.total_seconds()

        total_time_sec = total_time_sec + datetime_difference_sec

    # print(total_time_sec)
    total_time_hr = ((total_time_sec/60)/60)

    # TOTAL DISTANCE
    total_distance = round((avg_speed * total_time_hr), 2)

    average_parameters = {
        "average_vehicle_speed": avg_speed,
        "min_vehicle_speed": min_speed,
        "max_vehicle_speed": max_speed,
        "average_engine_rpm": avg_rpm,
        "min_engine_rpm": min_rpm,
        "max_engine_rpm": max_rpm,
        "total_distance": total_distance,
    }

    return jsonify({'status': 'success', "average_parameters": average_parameters})


# CURD APPLICATION

    # @app.route('/')
    # def index():
    #     return render_template('index.html')
    # @app.route('/members')
    # def members():
    #     return {"Members":["Member1","Member2","Member3"]}
    # @app.route('/signup', methods=['GET', 'POST'])
    # def signup():
    #     if request.method == 'GET':
    #         return render_template('signup.html')
    #     if request.method == 'POST':
    #         firstname = request.form['firstname']
    #         lastname = request.form['lastname']
    #         email = request.form['email']
    #         password = request.form['password']
    #         cursor = mysql.connection.cursor()
    #         cursor.execute('''INSERT INTO myusers(firstname, lastname, email, password)
    #                             VALUES(%s,%s,%s,%s)''', (firstname, lastname, email, password))
    #         mysql.connection.commit()
    #         cursor.close()
    #         return "Dear " + firstname + ", you are signed up successfully!"
    # @app.route('/users')
    # def read_users():
    #     cursor = mysql.connection.cursor()
    #     no_of_rows = cursor.execute("SELECT * FROM myusers")
    #     if no_of_rows > 0:
    #         users = cursor.fetchall()
    #         # return users
    #         return render_template('users.html', users=users)
    #     else:
    #         return "No Records Found"
    # @app.route('/uid', methods=['GET', 'POST'])
    # def fetch_uid():
    #     if request.method == 'GET':
    #         return render_template('Invalid Request')
    #     if request.method == 'POST':
    #         userid = request.form['uid']
    #         cursor = mysql.connection.cursor()
    #         no_of_rows = cursor.execute(
    #             '''SELECT * FROM myusers WHERE uid=%s''', [userid])
    #         if no_of_rows > 0:
    #             users = cursor.fetchall()
    #             return render_template('users.html', users=users)
    #         else:
    #             return "No Records Found"
    # @app.route("/edit/<id>", methods=['GET', 'POST'])
    # def get_user(id):
    #     cursor = mysql.connection.cursor()
    #     cursor.execute('Select * FROM myusers WHERE uid = %s', (id))
    #     data = cursor.fetchall()
    #     cursor.close()
    #     print(data[0])
    #     return render_template("edit.html", user=data[0])
    # @app.route("/update/<id>", methods=['POST'])
    # def update_user(id):
    #     if request.method == 'POST':
    #         firstname = request.form['firstname']
    #         lastname = request.form['lastname']
    #         email = request.form['email']
    #         password = request.form['password']
    #         cursor = mysql.connection.cursor()
    #         cursor.execute('''UPDATE myusers SET firstname = %s, lastname=%s, email=%s, password=%s WHERE uid=%s''',
    #                        (firstname, lastname, email, password, id))
    #         mysql.connection.commit()
    #         cursor.close()
    #         return "Dear " + firstname + ", record has been updated successfully!"
    # @app.route("/delete/<id>",  methods=['GET', 'POST'])
    # def delete_user(id):
    #     cursor = mysql.connection.cursor()
    #     cursor.execute("""DELETE from myusers WHERE uid = %s""", (id))
    #     mysql.connection.commit()
    #     return "Record has been deleted successfully!"
