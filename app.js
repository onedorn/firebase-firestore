const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// Create new elements and render cafe-data to the DOM

function renderCafe(doc) {

    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;

    li.appendChild(name);
    li.appendChild(city);
    cafeList.appendChild(li);

}


// Getting data from Firestore

db.collection('cafes').get().then((snapshot) => {
   snapshot.docs.forEach(doc => {
       renderCafe(doc)
       
   })
})

// Saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('cafes').add({
        name: form.name.value,
        city: form.city.value
    })

    form.name.value = '';
    form.city.value = '';
})