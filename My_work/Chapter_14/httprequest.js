function HttpRequest(url, callback) {
    this.url = url;
    this.callback = callback;
    this.async = true;
    this.request = new XMLHttpRequest();
}
    
HttpRequest.prototype.send = function() {
    this.request.open("GET", this.url, this.async);
    
    if(this.async) {
        var tempRequest = this.request;
        var callback = this.callback;
        
        function requestReadyStateChange() {
            if(tempRequest.readyState === 4) {
                if(tempRequest.status === 200) {
                    callback(tempRequest.responseText);
                } else {
                    alert("An error occurred while trying to "
                            + "contact the server");
                }
            }
        }
        
        this.request.onreadystatechange = requestReadyStateChange;
    }
    
    this.request.send(null);
    
    if(!this.async) {
        this.callback(this.request.responseText);
    }
};