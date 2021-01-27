$('#form_data').on("submit", (e) => {
    e.preventDefault()
    let phone = { data: {} }
    const { name, image, weight, sound, memory, launch, display, chipset, cameras, build, battery } = e.target
    phone.name = name.value
    phone.image = image.value
    phone.data.weight = weight.value
    phone.data.sound = sound.value
    phone.data.memory = memory.value
    phone.data.launch = launch.value
    phone.data.display = display.value
    phone.data.chipset = chipset.value
    phone.data.cameras = cameras.value
    phone.data.build = build.value
    phone.data.battery = battery.value
    console.log(phone);
    add_data_to_database(phone)
})