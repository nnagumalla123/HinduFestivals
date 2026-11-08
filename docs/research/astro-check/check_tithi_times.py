import sys; sys.path.insert(0,'.')
from astro import *
def tith_bounds(k, near):  # k=1..30 start elongation (k-1)*12; near: local jd guess
    a=solve(elong,near-1.5,near+1.5,(k-1)*12); b=solve(elong,a,a+1.6,k*12 % 360 if k<30 else 0)
    return a,b
def show(name,k,y,m,d,h=12):
    near=lj(y,m,d,h); a,b=tith_bounds(k,near); print(f"{name}: tithi {k} begins {fmt(a)}  ends {fmt(b)}")
print("== Drik reported vs computed (EDT/EST local) ==")
show("Amavasya (Diwali)  Drik: Thu Oct28 11:17AM -> Fri Oct29 09:35AM",30,2027,10,28)
show("Pratipada (Ugadi)  Drik: Apr6 07:50PM -> Apr7 06:58PM",1,2027,4,7)
show("Purnima (Holi)     Drik: Mar21 08:51AM -> Mar22 06:43AM",15,2027,3,21)
show("Chaturthi (Ganesh) Drik: Sep3 04:48AM -> Sep4 02:55AM",4,2027,9,3)
show("Pratipada (Navaratri) Drik: Sep29 10:35PM -> Sep30 08:04PM",1,2027,9,30)
show("Dashami (Vijayadashami) Drik: Oct8 11:31PM -> Oct10 02:10AM",10,2027,10,9)
show("Krishna Ashtami (Janmashtami) Drik: Aug24 10:54AM -> Aug25 09:49AM",23,2027,8,25)
show("Chaturdashi (Shivaratri Krishna) Drik: Mar6 01:33AM -> Mar7 03:16AM",29,2027,3,6)
show("Navami (Rama Navami) Drik: Apr14 05:53AM -> Apr15 03:50AM",9,2027,4,14)
# Rohini start/end
a=solve(moon_sid,lj(2027,8,24,12),lj(2027,8,26,12),3*360/27); b=solve(moon_sid,a,a+1.2,4*360/27)
print("Rohini Drik: Aug25 02:57AM -> Aug26 02:12AM | computed", fmt(a), "->", fmt(b))
# Sankranti
s=solve(sun_sid,lj(2027,1,13,12),lj(2027,1,15,12),270)
print("Makara Sankranti moment Drik: Thu Jan14 10:44AM | computed", fmt(s), " ayanamsa",round(ayanamsa(s),4))
