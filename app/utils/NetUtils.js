/*import Empty from './EmptyUtils'*/

/**
 * 自定义Fetch,接收JSON字串
 */
export  const fetchJSON=function (topic,payload,callback) {
    let formData = new FormData();
    formData.append("topic",topic);
    formData.append("payload",payload);
    fetch("http://www.cofjs.com:8080/",{
        method: 'POST',
        headers: {},
        body: formData,
    }).then((response) => response.json()
    ).then((json) => {
            console.log(json);
            callback(json);
        }).catch((err)=>{
        console.log(err);
    });
}
