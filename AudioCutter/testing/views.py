from django.shortcuts import render
from django.http import HttpResponse,JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from pydub import AudioSegment
import os
from django.http import StreamingHttpResponse

import io

SECONDS=1000
# Create your views here.
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

def upload_template(request):
    return render(request,"build/index.html")

def audio_cutter(request,song_name,begin,end):
    sample=AudioSegment.from_mp3(os.path.join(settings.BASE_DIR,f"media\\{song_name}"))[int(begin)*SECONDS:int(end)*SECONDS]
    buff= io.BytesIO()
    sample.export(buff, format="ogg")
    response = HttpResponse()
    response.write(buff.getvalue())
    response['Content-Type'] ='audio/ogg'
    print(begin,end)
    return response  
def testing(request):
    sample=AudioSegment.from_mp3(os.path.join(settings.BASE_DIR,"media\Kissing Goodnight_NLfO42r.mp3"))[0:21*1000]
    buf = io.BytesIO()
    sample.export(buf, format="ogg")
    response = HttpResponse()
    response.write(buf.getvalue())
    response['Content-Type'] ='audio/ogg'
    return response  
"""
def AudioSegment_to_BytesIO_Example(request):
    sample=AudioSegment.from_mp3(os.path.join(settings.BASE_DIR,"media\Kissing Goodnight_NLfO42r.mp3"))[0:21*1000]
    buf = io.BytesIO()
    sample.export(buf, format="mp3")
    response = HttpResponse()
    response.write(buf.getvalue())
    response['Content-Type'] ='audio/mp3'
    return response
"""