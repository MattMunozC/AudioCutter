from django.shortcuts import render

#Related to responses
from django.http import HttpResponse,JsonResponse
from django.conf import settings

#Related to Audio Manipulation
from pydub import AudioSegment
import os
import io

#Related to django File System
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
# Create your views here.


SECONDS=1000

@csrf_exempt
def audio_store(request):
    print(settings.MEDIA_ROOT)
    if request.method == 'POST':
        file=request.FILES.get("file")
        print(file)
        fss=FileSystemStorage()
        fss.save(file.name,file)
        sample=AudioSegment.from_mp3(os.path.join(settings.BASE_DIR,f"media/{file.name}"))
        data=[i.rms for i in sample[::5000]]
        return JsonResponse({"url":f"/static/{file.name}","data":data,"duration":sample.duration_seconds})
    else:
        print("wrong method")
    return HttpResponse("Nada que ver aquí")

#stored in the server
def audio_cutter(request,song_name,begin,end):
    sample=AudioSegment.from_mp3(os.path.join(settings.BASE_DIR,f"media\\{song_name}"))[int(begin)*SECONDS:int(end)*SECONDS]
    buff= io.BytesIO()
    sample.export(buff, format="ogg")
    response = HttpResponse()
    response.write(buff.getvalue())
    response['Content-Type'] ='audio/ogg'
    return response  

#serveless 
def cutter(request,begin,end):
    try:
        pass
    finally:
        pass