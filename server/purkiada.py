from flask import Flask, request
import datetime

app = Flask(__name__)

url = '127.0.0.1:5000/login'

@app.route('/login', methods=['GET'])
def page():
    username = request.args.get('username', type=str)
    password = request.args.get('password', type=str)
    points = request.args.get('points', type=int)
    file = open('./results.txt', 'a')
    etime = print(datetime.datetime.now().time())
    with file:
        file.write(f'{username},{password},{points},{etime}\n')
        pass
    response = f'{username}, {password}, {points}'
    return response
    

@app.after_request
def add_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'  # Change * to your specific domain if possible
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type'
    return response

if __name__ == '__main__':
    app.run()