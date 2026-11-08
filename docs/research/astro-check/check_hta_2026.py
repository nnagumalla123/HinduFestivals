"""Out-of-sample check (P3-04B): does applying the same observance rule reproduce a published Atlanta temple
calendar for a year we can read? The Hindu Temple of Atlanta lists Naraka Chaturdasi on Saturday, Nov 7, 2026 and
Deepavalli (Lakshmi Puja) on Sunday, Nov 8, 2026 (https://www.hindutempleofatlanta.org/pages/special-events,
read 2026-11-08). Run from this directory."""
import sys; sys.path.insert(0, '.')
import astro, datetime as dt
astro.off = lambda t: -5 if t >= dt.datetime(2026, 11, 1, 6) else -4   # US daylight time ended 2026-11-01

def name(n):
    return 'Amavasya' if n == 30 else (('Shukla ' if n <= 15 else 'Krishna ') + str(n if n <= 15 else n - 15))

for d in [(2026, 11, 6), (2026, 11, 7), (2026, 11, 8), (2026, 11, 9)]:
    sr, ss = astro.sun_rise_set(dt.date(*d))
    print(d, 'sunrise:', name(astro.tithi_num(sr)), '| pradosh start:', name(astro.tithi_num(ss)))
# Rule: Lakshmi Puja = the day Amavasya prevails at pradosh (Nov 8); Naraka Chaturdashi = Chaturdashi at sunrise (Nov 7).
