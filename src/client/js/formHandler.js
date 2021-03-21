const post = async (url = "", data = {}) => {
    console.log('Working!!');
    const responseOfAPI = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await responseOfAPI.json();
        console.log('Data received:', newData)
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};

function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let iUrl = document.getElementById('article-url').value

    if(Client.checkURL(iUrl)) {
    console.log("::: Form Submitted :::")

    post('http://localhost:8081/add-url', {url: iUrl})

    .then(function(res) {
        document.getElementById("confidence").innerHTML = `Confidence: ${res.confidence}`;
        document.getElementById("agreement").innerHTML = `Agreement: ${res.agreement}`;
        document.getElementById("irony").innerHTML = `Irony: ${res.irony}`;
        document.getElementById("subjectivity").innerHTML = `Subjectivity: ${res.subjectivity}`;
    })
    } else {
        alert('Please Enter A Valid URL!!');
    }
}



export { handleSubmit }
