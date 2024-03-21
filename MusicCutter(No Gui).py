from pydub import AudioSegment
from winsound import PlaySound,SND_FILENAME
import eyed3
from io import BytesIO
class Track():
    SECOND=1000
    MINUTE=SECOND*60
    HOUR=MINUTE*60
    DAY=HOUR*24
    WEEK=DAY*7
    def __init__(self,duration,name):
        self.duration=duration
        self.name=name
    def __int__(self)->int:
        segment=self.duration.split(":")
        return ((int(segment[0])*60)+int(segment[1]))*self.SECOND
    def to_int(str)->int: 
        segment=str.split(":")
        return (int(segment[0])*60)+int(segment[1])
"""
Tracklist:
0:00 Someday
5:45 Daydream
10:12 Silent Screamer
15:35 Interlude I
16:31 Ride on Time
22:30 The Door Into Summer
26:57 My Sugar Babe
31:03 Interlude II
32:34 Rainy Day (my fav track!)
37:48 Clouds
43:24 Kissing Goodnight
"""
track_list=[
    ("5:44","Someday"),
    ("4:30","Daydream"),
    ("5:29","Silent Screamer"),
    ("0:56","Interlude I"),
    ("5:55","Ride on Time"),
    ("4:41","The Door Into Summer"),
    ("4:11","My Sugar Babe"),
    ("1:31","Interlude II"),
    ("4:50","Rainy Day"),
    ("5:40","Clouds"),
    ("1:41","Kissing Goodnight")
    ]
PATH=r"Results\\test.mp3"
needle_pos=0
loaded_album=AudioSegment.from_mp3(PATH)
#response = requests.get(r"https://upload.wikimedia.org/wikipedia/en/0/02/Rideontime_tatsyamashita.jpg")  
#imagedata = response.content
"""for track_num,song in enumerate(track_list,start=1):
    print(f"extracting song: {song[1]}")
    track=Track(song[0],song[1])
    song = loaded_album[needle_pos:needle_pos+int(track)-5000]
    song.export(f"{track.name}.mp3", format="mp3")
    audiofile = eyed3.load(f"{track.name}.mp3")
    audiofile.tag.artist = "Tatsuro Yamashita"
    audiofile.tag.album = "Ride On Time"
    audiofile.tag.title = track.name
    audiofile.tag.track_num = track_num
    audiofile.tag.save()
    print(f"{track.name} extracted succesfully")
    needle_pos+=int(track)"""

