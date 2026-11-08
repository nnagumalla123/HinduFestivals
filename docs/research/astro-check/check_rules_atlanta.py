import sys; sys.path.insert(0,'.')
from astro import *
import datetime as dt
def tn(j): return tithi_num(j)
def name(n): 
    paksha='Shukla' if n<=15 else 'Krishna'; k=n if n<=15 else n-15
    return f"{paksha} {k}" if n!=30 else "Amavasya"
def day(y,m,d):
    sr,ss=sun_rise_set(dt.date(y,m,d)); return sr,ss
def nxt(y,m,d):
    t=dt.date(y,m,d)+dt.timedelta(days=1); return day(t.year,t.month,t.day)
def report(title,dates,points):
    print("\n##",title)
    for (y,m,d) in dates:
        sr,ss=day(y,m,d); srn,_=nxt(y,m,d); dl=ss-sr; night=srn-ss
        row=[f"{y}-{m:02d}-{d:02d} sunrise {fmt(sr)[-8:]} sunset {fmt(ss)[-8:]}"]
        for label,f in points:
            j=f(sr,ss,srn,dl,night); row.append(f"{label}: {name(tn(j))} @ {fmt(j)[-8:]}")
        print("  "+" | ".join(row))
SR=("sunrise",lambda sr,ss,srn,dl,n:sr)
PR=("pradosh-start",lambda sr,ss,srn,dl,n:ss)
PRM=("pradosh-mid",lambda sr,ss,srn,dl,n:ss+0.04)
MD=("madhyahna-mid",lambda sr,ss,srn,dl,n:sr+dl*0.5)
MDS=("madhyahna(3/5 start..)",lambda sr,ss,srn,dl,n:sr+dl*0.4)
AP=("aparahna-mid",lambda sr,ss,srn,dl,n:sr+dl*0.7)
NI=("nishita(mid-night)",lambda sr,ss,srn,dl,n:ss+n*0.5)
report("Diwali (Amavasya at Pradosh)",[(2027,10,27),(2027,10,28),(2027,10,29)],[SR,PR,PRM,NI])
report("Ugadi (Pratipada at sunrise)",[(2027,4,6),(2027,4,7),(2027,4,8)],[SR])
report("Holi: Holika Dahan (Purnima at Pradosh)",[(2027,3,20),(2027,3,21),(2027,3,22)],[SR,PR,PRM])
report("Ganesh Chaturthi (Chaturthi at Madhyahna)",[(2027,9,2),(2027,9,3),(2027,9,4)],[SR,MD])
report("Navaratri (Pratipada at sunrise)",[(2027,9,29),(2027,9,30),(2027,10,1)],[SR])
report("Vijayadashami (Dashami at Aparahna)",[(2027,10,8),(2027,10,9),(2027,10,10)],[SR,AP])
report("Janmashtami (Krishna Ashtami: sunrise & Nishita)",[(2027,8,23),(2027,8,24),(2027,8,25),(2027,8,26)],[SR,NI])
report("Maha Shivaratri (Krishna Chaturdashi at Nishita)",[(2027,3,5),(2027,3,6),(2027,3,7)],[SR,PR,NI])
report("Rama Navami (Navami at Madhyahna)",[(2027,4,13),(2027,4,14),(2027,4,15)],[SR,MD])
s=solve(sun_sid,lj(2027,1,13,12),lj(2027,1,15,12),270)
sr,ss=day(2027,1,14)
print("\n## Makara Sankranti: moment",fmt(s),"| Atlanta Jan 14 sunrise",fmt(sr)[-8:],"sunset",fmt(ss)[-8:])
# same moment in IST
ist=from_jd(s)+dt.timedelta(hours=5,minutes=30); print("   moment in IST:",ist.strftime('%a %b %d %I:%M %p'))
# Krishna Ashtami bounds
for n,lab in [(23,'Krishna Ashtami')]:
    a=solve(elong,lj(2027,8,23,12),lj(2027,8,26,12),(n-1)*12); b=solve(elong,a,a+1.6,n*12)
    print("\n## Krishna Ashtami bounds:",fmt(a),"->",fmt(b))
# New moon / Purnima exact
