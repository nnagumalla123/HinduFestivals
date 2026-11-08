"""Independent astronomical cross-check (internal research tool, NOT a published source).
Meeus 'Astronomical Algorithms' low-precision Sun and truncated Moon longitude; Lahiri ayanamsa.
Computes tithi/nakshatra boundaries, sunrise/sunset for Atlanta, Sun's sidereal ingress."""
import math, datetime as dt
D2R=math.pi/180
LAT,LON=33.7489,-84.3880

def jd(t):  # t: aware or naive UTC datetime
    y,m=t.year,t.month; d=t.day+(t.hour+(t.minute+t.second/60)/60)/24
    if m<=2: y-=1; m+=12
    A=y//100; B=2-A+A//4
    return int(365.25*(y+4716))+int(30.6001*(m+1))+d+B-1524.5
def from_jd(j):
    return dt.datetime(2000,1,1,12)+dt.timedelta(days=j-2451545.0)
def T_of(j): return (j+69/86400-2451545.0)/36525

MOON=[(0,0,1,0,6288774),(2,0,-1,0,1274027),(2,0,0,0,658314),(0,0,2,0,213618),(0,1,0,0,-185116),(0,0,0,2,-114332),(2,0,-2,0,58793),(2,-1,-1,0,57066),(2,0,1,0,53322),(2,-1,0,0,45758),(0,1,-1,0,-40923),(1,0,0,0,-34720),(0,1,1,0,-30383),(2,0,0,-2,15327),(0,0,1,2,-12528),(0,0,1,-2,10980),(4,0,-1,0,10675),(0,0,3,0,10034),(4,0,-2,0,8548),(2,1,-1,0,-7888),(2,1,0,0,-6766),(1,0,-1,0,-5163),(1,1,0,0,4987),(2,-1,1,0,4036),(2,0,2,0,3994),(4,0,0,0,3861),(2,0,-3,0,3665),(0,1,-2,0,-2689),(2,0,-1,2,-2602),(2,-1,-2,0,2390),(1,0,1,0,-2348),(2,-2,0,0,2236),(0,1,2,0,-2120),(0,2,0,0,-2069),(2,-2,-1,0,2048),(2,0,1,-2,-1773),(2,0,0,2,-1595),(4,-1,-1,0,1215),(0,0,2,2,-1110),(3,0,-1,0,-892),(2,1,1,0,-810),(4,-1,-2,0,759),(0,2,-1,0,-713),(2,2,-1,0,-700),(2,1,-2,0,691),(2,-1,0,-2,596),(4,0,1,0,549),(0,0,4,0,537),(4,-1,0,0,520),(1,0,-2,0,-487),(2,1,0,-2,-399),(0,0,2,-2,-381),(1,1,1,0,351),(3,0,-2,0,-340),(4,0,-3,0,330),(2,-1,2,0,327),(0,2,1,0,-323),(1,1,-1,0,299),(2,0,3,0,294)]
def moon_lon(j):  # tropical, degrees (mean equinox of date)
    T=T_of(j)
    Lp=218.3164477+481267.88123421*T; Dm=297.8501921+445267.1114034*T
    M=357.5291092+35999.0502909*T; Mp=134.9633964+477198.8675055*T; F=93.2720950+483202.0175233*T
    E=1-0.002516*T
    s=0
    for d,m,mp,f,c in MOON:
        s+=c*E**abs(m)*math.sin((d*Dm+m*M+mp*Mp+f*F)*D2R)
    A1=119.75+131.849*T; A2=53.09+479264.290*T
    s+=3958*math.sin(A1*D2R)+1962*math.sin((Lp-F)*D2R)+318*math.sin(A2*D2R)
    return (Lp+s/1e6)%360
def sun_lon(j):
    T=T_of(j)
    L0=280.46646+36000.76983*T; M=(357.52911+35999.05029*T)*D2R
    C=(1.914602-0.004817*T)*math.sin(M)+0.019993*math.sin(2*M)+0.000289*math.sin(3*M)
    om=(125.04-1934.136*T)*D2R
    return (L0+C-0.00569-0.00478*math.sin(om))%360   # apparent (aberration+nutation term)
def ayanamsa(j): return 23.85306+0.013972*((j-2451545.0)/365.25)  # Lahiri, approx
def elong(j): return (moon_lon(j)-sun_lon(j))%360
def tithi_num(j): return int(elong(j)//12)+1     # 1..30
def moon_sid(j): return (moon_lon(j)-ayanamsa(j))%360
def nak_num(j): return int(moon_sid(j)//(360/27))+1  # 1..27, Rohini=4
def sun_sid(j): return (sun_lon(j)-ayanamsa(j))%360

def solve(f,a,b,target,period=360):
    # find j in [a,b] where f(j)=target (mod period), f increasing
    def g(x): return ((f(x)-target+period/2)%period)-period/2
    for _ in range(80):
        m=(a+b)/2
        if g(m)<0: a=m
        else: b=m
    return (a+b)/2

# local time (Atlanta): EDT between 2027-03-14 and 2027-11-07
def off(t_utc):
    y=t_utc.year
    start=dt.datetime(y,3,14,7); end=dt.datetime(y,11,7,6)  # 2027 transitions (UTC)
    return -4 if start<=t_utc<end else -5
def local(j):
    t=from_jd(j); return t+dt.timedelta(hours=off(t))
def fmt(j): return local(j).strftime('%a %b %d %I:%M %p')

def sun_rise_set(date):  # date: local civil date; returns (sunrise_jd, sunset_jd)
    # iterate: solar noon estimate then hour angle for -0.833 deg
    base=jd(dt.datetime(date.year,date.month,date.day,12))-LON/360  # approx local solar noon UT
    res=[]
    for sign in (-1,1):
        t=base+sign*0.25
        for _ in range(6):
            T=T_of(t); L0=280.46646+36000.76983*T; M=(357.52911+35999.05029*T)*D2R
            C=(1.914602-0.004817*T)*math.sin(M)+0.019993*math.sin(2*M)
            lam=(L0+C)*D2R; eps=(23.439291-0.0130042*T)*D2R
            dec=math.asin(math.sin(eps)*math.sin(lam)); ra=math.atan2(math.cos(eps)*math.sin(lam),math.cos(lam))
            y=math.tan(eps/2)**2
            eqt=4*(y*math.sin(2*L0*D2R)-2*0.016708634*math.sin(M)+4*0.016708634*y*math.sin(M)*math.cos(2*L0*D2R))/D2R  # minutes
            ha=math.degrees(math.acos((math.sin(-0.833*D2R)-math.sin(LAT*D2R)*math.sin(dec))/(math.cos(LAT*D2R)*math.cos(dec))))
            noon=jd(dt.datetime(date.year,date.month,date.day))+0.5-LON/360-eqt/1440
            t=noon+sign*ha/360
        res.append(t)
    return res

def lj(y,m,d,h=0,mi=0):  # local civil -> JD
    t=dt.datetime(y,m,d,h,mi); 
    # guess offset
    o=off(t+dt.timedelta(hours=5)); return jd(t-dt.timedelta(hours=o))
