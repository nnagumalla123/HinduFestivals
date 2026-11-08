import sys; sys.path.insert(0,'.')
import astro
astro.LAT,astro.LON=23.1765,75.7885   # Ujjain (Prokerala default) -- IST
astro.off=lambda t: 5.5
import datetime as dt
exec(open('check_rules_atlanta.py').read().split("report(\"Diwali")[0].replace("from astro import *","from astro import *"))
print("=== SAME ENGINE, Ujjain/IST (to explain India-based sources) ===")
report("Diwali (Amavasya at Pradosh) IST",[(2027,10,28),(2027,10,29)],[SR,PR,PRM])
report("Ganesh Chaturthi (Chaturthi at Madhyahna) IST",[(2027,9,3),(2027,9,4)],[SR,MD])
report("Rama Navami (Navami at Madhyahna) IST",[(2027,4,14),(2027,4,15)],[SR,MD])
report("Holika Dahan (Purnima at Pradosh) IST",[(2027,3,21),(2027,3,22)],[SR,PR,PRM])
report("Janmashtami IST",[(2027,8,24),(2027,8,25),(2027,8,26)],[SR,NI])
report("Shivaratri IST",[(2027,3,6),(2027,3,7)],[SR,PR,NI])
s=astro.solve(astro.sun_sid,astro.lj(2027,1,13,12),astro.lj(2027,1,15,12),270); sr,ss=day(2027,1,14)
print("Sankranti moment IST",astro.fmt(s),"sunset",astro.fmt(ss)[-8:])
