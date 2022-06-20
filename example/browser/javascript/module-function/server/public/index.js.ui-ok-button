let body = document.getElementsByTagName("body")[0];

function createHtmlElement(strStyle, strTitle, funClickCallback){
    let ele = document.createElement(strStyle);
    if(strTitle != null)
      ele.innerHTML = strTitle;
    if (funClickCallback != null)
      ele.addEventListener('click', funClickCallback);
    return ele;
  }

function createHtmlButton(strTitle, funClickCallback, body){
    let ele = createHtmlElement('button', strTitle, funClickCallback);
    if(body == null){
      console.log('Error: createHtmlButton::body == null')
      return null;
    }

    body.appendChild(ele);
    return ele;
  }

function cbClickOK(){
      console.log('cbConnect::start to connect and send message');
}

function main(){
    createHtmlButton('OK', cbClickOK, body);
}

main();
