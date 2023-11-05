const fetch_In_One = async (url, method_type, data) => {
    console.log(url, method_type, data);

    if (method_type === "GET") {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(data);
        var requestOptions = {
            method: method_type,
            redirect: "follow",
        };
        return fetch(url, requestOptions)
            .then(async (response) => {
                let result = await response.json();
                return result;
            })
            .catch(async (error) => {
                console.log("Error:", error);
                throw error;
            });
    } else {
        var myHeaders = new Headers();
        console.log(url,requestOptions)
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify(data);
        var requestOptions = {
            method: method_type,
            headers: myHeaders,
            body: raw,
            redirect: "follow",
        };
        return fetch(url, requestOptions)
            .then(async (response) => {
                let result = await response.json();
                return result;
            })
            .catch(async (error) => {
                console.log("Error:", error);
                throw error;
            });
    }
};

export default fetch_In_One;
