let arr = []

let images = ['2569919', '3253030', '3349785', '3349784'];
let optionList = [];
let searched = [];



window.onload = async function makeNotes() {
    document.getElementById('cards').innerHTML = ''
    let response = await fetch('http://localhost:3000/notes');
    let data = await response.json();
    buildCards(data);
    toSelectTag()
}



function buildCards(data) {
    data.forEach((Element, index) => {

        let randomNumber = images[Math.floor(Math.random() * images.length)]
        console.log(randomNumber)
        let backgroundColor;
        let delButton;
        if (randomNumber === `3349784`) {
            backgroundColor = '#f2d0a4', delButton = '#f2d0a4';
        }
        if (randomNumber === `2569919`) {
            backgroundColor = '#C8D6AF', delButton = '#C8D6AF';
        }
        if (randomNumber === `3253030`) {
            backgroundColor = '#46acc2', delButton = '#46acc2';
        }
        if (randomNumber === `3349785`) {
            backgroundColor = '#ffeccc', delButton = '#ffeccc';
        }


        let card = document.createElement('div');
        card.className = 'card'
        card.style = `background-color: ${backgroundColor};`


        let cover = document.createElement('div');
        cover.className = 'cover';


        cover.style = `background-image: url(./imgs/${randomNumber}.jpg);`

        let coverFront = document.createElement('div');
        coverFront.className = 'coverFront';

        let coverBack = document.createElement('div');
        coverBack.className = 'coverBack'

        let noteText = document.createElement('div');
        let p = document.createElement('p');
        p.className = `textNote`;

        let cardId = document.createElement('div');
        let span = document.createElement('span');
        cardId.className = 'cardId';
        cardId.appendChild(span);
        span.textContent = index;
        card.appendChild(cardId)


        let timeAndDate = document.createElement('p');
        timeAndDate.className = 'timeAndDate'

        let button = document.createElement('button');
        button.textContent = `DELETE`
        button.className = 'del'
        button.style = `background-color: ${delButton};`
        coverBack.appendChild(button);
        button.addEventListener('click', function deleteCard() {
            document.getElementById('cards').removeChild(card);
            $.ajax({
                type: "DELETE",
                url: "http://localhost:3000/notes",
                data: {
                    title: Element.title
                },
                success: function (response) {
                    console.log("deleted");
                }
            });
        })

        card.appendChild(cover);
        cover.appendChild(coverFront);
        coverFront.appendChild(timeAndDate);
        timeAndDate.textContent = `Date :\n\n ${Element.date} \n\n time : \n\n ${Element.time}`;
        cover.appendChild(coverBack);
        card.appendChild(noteText);
        noteText.appendChild(p);
        p.textContent = Element.title;

        document.getElementById('cards').appendChild(card);
        optionList.push(Element.title)
    })
}



async function takeValues() {
    document.getElementById('cards').innerHTML = ''
    $.ajax({
        type: "POST",
        url: "http://localhost:3000/notes",
        data: {
            date: document.getElementById('date').value,
            time: document.getElementById('time').value,
            note: document.getElementById('note').value,
        },
        dataType: "dataType",
        success: function () {
            console.log('to req body')
        }
    });
    let response = await fetch('http://localhost:3000/notes');
    let data = await response.json();
    buildCards(data)
    toSelectTag()
}



async function searchNote() {
    document.getElementById('cards').innerHTML = ''
    let searchNote = document.getElementById('search').value;
    let response = await fetch('http://localhost:3000/notes');
    let data = await response.json()
    data.forEach(Element => {
        if (Element.title === searchNote) {
            searched.push(Element)
        }
    })
    buildCards(searched)
}



async function toSelectTag() {
    let response = await fetch('http://localhost:3000/notes');
    let data = await response.json();
    data.forEach(Element => {
        let option = document.createElement('option');
        option.textContent = Element.title
        document.getElementById('search').appendChild(option)
    })
}