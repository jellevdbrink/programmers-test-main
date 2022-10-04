
export const getData = path => {
    return fetch(`http://localhost:8080/${path}`).then(response => response.json()).then(data => {
        console.log(data);
        return data;
    });
}
