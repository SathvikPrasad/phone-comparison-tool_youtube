
let PHONES = []



db.collection("phones")
    .get()
    .then((snapshot) => {
        snapshot.forEach((doc) => {

            let phone = {
                id: doc.id,
                ...doc.data()
            }
            PHONES.push(phone)
        })
    }).then(e => {
        console.log(PHONES);
        render_phones()

    })

const add_data_to_database = (data) => {
    console.log(data);
    db.collection("phones")
        .add({
            ...data
        })
        .then((ref) => {
            console.log(ref);
        }).then(() => {
            location.reload();
        })

        .catch((err) => console.log(err));
}


const render_phones = () => {
    PHONES.forEach(phone => {
        //  let html = `<button class="btn btn-outline-primary m-2" id='${phone.id}' onclick='select_phone(this)'>${phone.name}</button>`
        let html_2 = ` <div class="card m-2" style="width: 10rem;" onclick='select_phone(this)' id='${phone.id}'>
                        <img class="card-img-top" style="max-width: 100%;" src="${phone.image}"
                            alt="Card image cap">
                        <div class="card-body">
                            <h5 class="card-title">${phone.name}</h5>

                        </div>
                    </div>

        `
        //$('#phones_data').append(html)
        $('.phones_cards').append(html_2)

    })
}

let selected_phones = new Set()

const select_phone = (e) => {
    console.log(e.id);

    console.log(selected_phones.has(e.id));
    if (selected_phones.has(e.id)) {
        selected_phones.delete(e.id)
        $(e).toggleClass('selected')

    } else
        if (selected_phones.size < 2) {
            selected_phones.add(e.id)
            $(e).toggleClass('selected')

        }

    categorize([...selected_phones])

    console.log(selected_phones);
}


const get_local_data = (id) => {
    let phone_ = ''
    PHONES.forEach(phone => {
        if (phone.id == id) {
            console.log(phone, id);

            phone_ = phone
        }
    })
    return phone_
}