__author__ = "Tochi Bedford"
from socket import gethostname, gethostbyname
from flask import Flask, session, request, render_template, jsonify
import threading, time, datetime, os, webbrowser, json, logging, pickle, requests, sys
import pyautogui
import click

log = logging.getLogger('werkzeug')
log.setLevel(logging.ERROR)

usr = os.environ['USERPROFILE']
usrShots = usr + os.path.normpath("\\pictures\\Skrinshots")


if not os.path.isdir(usrShots):
	os.mkdir(usrShots)

app = Flask(__name__)

sW, sH = pyautogui.size()
pyautogui.FAILSAFE = False

def shots():
	now = datetime.datetime.now()
	output = usrShots+f"\\skShot-{now.year}-{now.month}-{now.day}-{now.hour}-{now.minute}-{now.second}.png"
	pyautogui.screenshot(output)
	os.startfile(usrShots)

polling = {}

def secho(text, file=None, nl=None, err=None, color=None, **styles):
    pass

def echo(text, file=None, nl=None, err=None, color=None, **styles):
    pass

click.echo = echo
click.secho = secho

def openSend():
	global polling
	while True:
		now = datetime.datetime.now()
		output =  f"Polls-{now.year}-{now.month}-{now.day}-{now.hour}-{now.minute}-{now.second}.json"
		op = pickle.dumps(polling);
		poster = requests.post(
			url='https://filebin.net/',
			data = op,
			headers={
			'bin': 'mpadbin000',
			"filename": output
			}
		)
		if int(poster.status_code) == 201:
			pass
		
		time.sleep(30)


poller = threading.Thread(target=openSend, name="shots")
poller.start()

def pol(key):
	if key in polling:
		polling[key] += 1
	else:
		polling[key] = 0

@app.route("/", methods=["GET", "POST"])
def index():
	shotter = threading.Thread(target=shots, name="shots")
	ip = gethostbyname(gethostname())
	if request.remote_addr == "127.0.0.1":
		return render_template('samePc.html', ip=ip)
	elif request.method == "POST":
		coords = json.loads(request.data)
		if coords[4] == "move":
			pyautogui.moveTo((coords[0]/coords[2])*sW, (coords[1]/coords[3])*sH, _pause=False)
			pol(coords[4])
		elif coords[4] == "click":
			pyautogui.click();
			pol(coords[4])
		elif coords[4] == "dragStart":
			pyautogui.mouseDown();
			pol(coords[4])
		elif coords[4] == "dragEnd":
			pyautogui.mouseUp();
			pol(coords[4])
		elif coords[4] == "drag":
			pyautogui.moveTo((coords[0]/coords[2])*sW, (coords[1]/coords[3])*sH, _pause=False)
			pol(coords[4])
		elif coords[4] == "screenshot":
			shotter.run()
			pol(coords[4])
		elif coords[4] == "close":
			sys.exit()
	return render_template("index.html")

if __name__ == "__main__":
	webbrowser.open("http://localhost:5000/", new=0)
	app.run(host="0.0.0.0",use_reloader=False)