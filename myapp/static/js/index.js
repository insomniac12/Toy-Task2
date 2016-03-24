var openFile = function(event)
 {
    input = event.target;
    var reader = new FileReader();
    reader.onload = function()
    {
    var dataURL = reader.result;
    var output = document.getElementById('output');
    output.src = dataURL;
   };
   reader.readAsDataURL(input.files[0]);
    name=input.files[0].name;
 };
 
    var allVals = [];
    var pipeline=[];
    var k=0;
    var i=0;
    var j=0;
    var l=0;
    
var func=function(name)
 {
    allVals.push(name);
    
 };
    
var doit = function(id,val)
{
    $('#'+id).click(function()
         {
            for(j=0;j<val.length;j++)
                 {
                    if (val[j].length>0)
                    {
                      allVals[j]=val[j];
                    }
                     else
                     {
                     break;
                     }
                 }
         });
      return;
 };
    
  
var cl=function()
   {
    allVals=[];
   };
   

var pipeline_temp=[];
var x;
   
var save_temp_pipe=function()
{
    pipeline_temp[k]=new Array(10);
    for (j=0;j<allVals.length;j++)
    {
        pipeline_temp[k][j]=allVals[j];
    }
    option=document.createElement("option");
    select=document.getElementById("ppl");
    option.text="pipeline"+k;
    option.id=k;
    select.appendChild(option);
    doit(k,pipeline_temp[k]);
    k=k+1;
};

var z;
   
var save_pipe=function()
{
    pipeline[i]=new Array(10);
    for (l=0;l<allVals.length;l++)
    {
        pipeline[i][l]=allVals[l];
    }
 i=i+1;
 
     $.ajax(
            {
                type:"POST",
                url:"/pipe/",
                data:{"pipeline":JSON.stringify(pipeline)
            },
            
            success:function(json)
            {
                $.each(json.index,function()
                 {
                    option=document.createElement("option");
                    select=document.getElementById("demo");
                    text=document.createTextNode(this);
                 });
                
                option.id=z;
                option.appendChild(text);
                select.appendChild(option);
                z=z+1;
            },
               
                error:function()
                {
                  alert("bye");
                }
        
           });
};

  
var run =  function(e)
{
  e.preventDefault();
    $.ajax(
           {  
             type: "POST",  
             url: "/create_post/",
             data:{"allVals":JSON.stringify(allVals),"name":name},
             
            success: function(response)
            {
              for (a=0;a<response.url.length;a++)
                {
                 img=document.createElement("img");
                 img.setAttribute("src","/static/images/"+response.url[a])
                 document.getElementById("photo").appendChild(img)
                }
        
            },
         
              error: function(e)
               {  
                 alert("no");
               },
            });
};
  
var res=[];
var l;

var func_pipe=function()
{
  v=$('#demo').val();
  v=v.split(',');
  for (i=0;i<v.length;i++)
  {
    l=v[i].length;
    res[i]=v[i].substring(3,l-1);
        if (res[i]!='n' && res[i]!='ne')
        {
            allVals[i]=res[i]
        }
  }

};

