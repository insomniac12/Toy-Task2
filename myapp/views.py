from django.shortcuts import render
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt 
import cv2
import json
import numpy as np
#from matplotlib import pyplot as plt

# Create your views here.
def myview(request):
    template_name='index.html'
    return render(request,template_name)
    
@csrf_exempt
def create_post(request):
    
    if request.method=='POST':
        op=json.loads(request.POST.get('allVals'))
        name = request.POST.get('name')
        s="/home/shivangi/shivangi/task/cloudcv/myapp/static/images/"
        image=cv2.imread(s+name)
            
        response_data={}
        response_data['url']=[];
        for i in op:
            if i=="resize":
                r=100.0/image.shape[1]
                dim=(100,int(image.shape[0]*r))
                #image=cv2.resize(image,dim,interpolation=cv2.INTER_AREA)
                image=cv2.resize(image,(0,0),fx=0.5,fy=0.5)
                name="resized"+name
            elif i=="blur":
                image=cv2.blur(image,(5,5))
                name="blur"+name
                
            elif i=="rotate":
                (h,w)=image.shape[:2]
                center=(w/2,h/2)
                
                M=cv2.getRotationMatrix2D(center,180,1.0)
                image=cv2.warpAffine(image,M,(w,h))
                name="rotated"+name
                
            '''elif i=="pyramid":
                image=cv2.pyrDown(higher_reso)
                new_url="pyramid"+name'''
                
            cv2.imwrite(s+name,image)
            response_data['url'].append(name)    
            
        
        
        
        
        
        return HttpResponse(json.dumps(response_data),content_type="application/json")
   
@csrf_exempt         
def pipe(request):
    if request.method=='POST':
         op2=request.POST.get('pipeline')
         print op2
         f=open("myfile.txt",'w')
         f.write(op2)
         f.close()     
    return HttpResponse("ndcso")
         
    
     