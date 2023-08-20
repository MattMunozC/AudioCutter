export function Visualize(data, id, size){
    const max=Math.max(...data)
    const canvas=document.getElementById(id)
    var artist=canvas.getContext("2d")
    artist.clearRect(0, 0, canvas.width, canvas.height);
    for(var i=0;i<data.length;i++){
        var bar_length=((canvas.height*data[i]/max)/2)-10
        artist.fillRect((i*canvas.width/data.length)+size, canvas.height/2-bar_length, size, bar_length);
        artist.fillRect((i*canvas.width/data.length)+size, canvas.height/2, size, bar_length);
    }
}


