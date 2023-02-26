let myLeads = []
let copy = []
const inputEl = document.getElementById('input-el')
const inputBtn = document.getElementById('input-btn')
const ulEl = document.getElementById('ul-el')
const search = document.getElementById('search-el')
let filtered = null
const savedLeads = JSON.parse(localStorage.getItem('leads'))
const deleteBtn = document.getElementById('delete')

const deleteLead = (e) => {
    const { id } = e.target
    deleteFunction(myLeads, id)
}

const deleteFunction = (data, id) => {
    const newData = data.filter((elem) => {
        if (elem != id) {
            return elem
        }
    })

    myLeads = newData
    localStorage.setItem('leads', JSON.stringify(myLeads))

    renderLeads()
}

const WatchListListener = () => {
    if (document.querySelector('.delete')) {
        const deleteBtn = document.querySelectorAll('.delete')
        for (const btnElm of deleteBtn) {
            btnElm.addEventListener('click', deleteLead)
        }
    } else {
        console.log('fail')
    }
}

if (savedLeads) {
    console.log('sat')
    myLeads = savedLeads
    renderLeads()
}

const searchBtn = (e) => {
    myLeads.forEach((elem) => {
        if (elem.includes(e.target.value)) {
            copy.push(elem)
        }
    })

    renderLeads()
    copy = []
}

if (myLeads) {
    search.addEventListener('input', searchBtn)
}

inputBtn.addEventListener('click', function () {
    if (inputEl.value.length > 0) {
        myLeads.push(inputEl.value)
        localStorage.setItem('leads', JSON.stringify(myLeads))
        inputEl.value = ''
        renderLeads()
    }
})

document.getElementById('delete-btn').addEventListener('dblclick', function () {
    localStorage.clear()
    ulEl.innerHTML = ''
})

document.getElementById('save-btn').addEventListener('click', function () {
    chrome.tabs.query({ active: true, lastFocusedWindow: true }, (tabs) => {
        let url = tabs[0].url
        myLeads.push(url)
        localStorage.setItem('leads', JSON.stringify(myLeads))
        renderLeads()
    })
})

function renderLeads() {
    let listItems = ''
    if (copy.length > 0) {
        ulEl.innerHTML = ''
        console.log('yo')
        for (let i = 0; i < copy.length; i++) {
            listItems += `
            <li>
                <button class="delete" id=${copy[i]} >delete</button>
                <a target='_blank' href='${copy[i]}'>
                    ${copy[i]}
                </a>
            </li>
        `
        }
        ulEl.innerHTML = listItems
    } else {
        ulEl.innerHTML = ''
        for (let i = 0; i < myLeads.length; i++) {
            listItems += `
            <li>
                <button class="delete" id=${myLeads[i]} >delete</button>
                <a target='_blank' href='${myLeads[i]}'>
                    ${myLeads[i]}
                </a>
            </li>
        `
        }
        ulEl.innerHTML = listItems
    }
    WatchListListener()
}
