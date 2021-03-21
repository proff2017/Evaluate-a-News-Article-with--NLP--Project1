function handleSubmit(event) {
    event.preventDefault()

    // check what text was put into the form field
    let iUrl = document.getElementById('article-url').value

    if(Client.checkURL(iUrl)) {
    console.log("::: Form Submitted :::")

    postData('http://localhost:8081/api', {url: iUrl})

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

const postData = async (url = "", data = {}) => {
    console.log('Working!!');
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'cors',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    });
    try {
        const newData = await response.json();
        console.log('Data received:', newData)
        return newData;
    } catch (error) {
        console.log('error', error);
    }
};


export { handleSubmit }
