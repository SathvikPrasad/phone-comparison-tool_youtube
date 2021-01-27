
const rp = require('request-promise');
const $ = require('cheerio');
const cors = require("cors");

const express = require('express')
const app = express()
app.use(cors());
const port = 3000
const get_phone_details = async (phone_url) => {
    let PHONE_DETAILS

    let image = await GET_IMAGE_URL(phone_url)
    await rp(phone_url)
        .then(function (html) {
            // console.log($('[data-spec="year"]', html).text());

            let name = $('[data-spec="modelname"]', html).text()
            let launch = $('[data-spec="year"]', html).text()
            let weight = $('[data-spec="weight"]', html).text()
            let build = $('[data-spec="build"]', html).text()
            let display = $('[data-spec="displaytype"]', html).text()
            let chipset = $('[data-spec="chipset"]', html).text()
            let memory = $('[data-spec="internalmemory"]', html).text()
            let camera = $('[data-spec="cam1modules"]', html).text()
            let sound = $('th:contains("Sound")', html).next().next().text()
            let battery = $('[data-spec="batdescription1"]', html).text()

            PHONE_DETAILS = {
                name,
                image,
                launch,
                weight,
                build,
                display,
                chipset,
                memory,
                camera,
                sound,
                battery
            }




        })
        .catch(function (err) {
            //handle error
        });
    console.log(image);
    return PHONE_DETAILS
}

const GET_IMAGE_URL = async (url) => {



    url_new = url.replace('-', '-pictures-')
    let image_url


    await rp(url_new)
        .then(function (html) {
            let image = $('#pictures-list', html).children('img').attr('src')
            image_url = image
        })
        .catch(function (err) {

        });
    // 
    return image_url
}


app.get('/', async (req, res) => {
    let phone = req.query.phone_url
    let phone_data = await get_phone_details(phone)
    res.send(phone_data)
})

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});


