const cafeList = document.querySelector('#cafe-list');
const form = document.querySelector('#add-cafe-form');

// Create new elements and render cafe-data to the DOM

function renderCafe(doc) {

    let li = document.createElement('li');
    let name = document.createElement('span');
    let city = document.createElement('span');
    let cross = document.createElement('div');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    city.textContent = doc.data().city;
    cross.textContent = 'x';

    li.appendChild(name);
    li.appendChild(city);
    li.appendChild(cross)

    cafeList.appendChild(li);

    // Deleting data
    cross.addEventListener( 'click', (e) => {
        e.stopPropagation();
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('cafes').doc(id).delete();
    })

}


// Getting data from Firestore

db.collection('cafes').orderBy('name' ).get().then((snapshot) => {
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