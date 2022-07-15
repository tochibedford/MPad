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

def secho(text, file=None, nl=None, err=None, color=None, **styles):
    pass

def echo(text, file=None, nl=None, err=None, color=None, **styles):
    pass

click.echo = echo
click.secho = secho

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
		elif coords[4] == "click":
			pyautogui.click();
		elif coords[4] == "dragStart":
			pyautogui.mouseDown();
		elif coords[4] == "dragEnd":
			pyautogui.mouseUp();
		elif coords[4] == "drag":
			pyautogui.moveTo((coords[0]/coords[2])*sW, (coords[1]/coords[3])*sH, _pause=False)
		elif coords[4] == "screenshot":
			shotter.run()
		elif coords[4] == "close":
			sys.exit()
	return render_template("index.html")

if __name__ == "__main__":
	webbrowser.open("http://localhost:5000/", new=0)
	app.run(host="0.0.0.0",use_reloader=False)
