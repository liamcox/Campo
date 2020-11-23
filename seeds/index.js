const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelper");
const Campground = require("../models/campground");

mongoose.connect("mongodb://localhost:27017/campo", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: "5fb7ef01fb1caeb5464071ad",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url:
                        "https://res.cloudinary.com/dtsjpkaqa/image/upload/v1606148976/Campo/oqcfpjr0kwr6djk9ooex.jpg",
                    filename: "Campo/oqcfpjr0kwr6djk9ooex",
                },
                {
                    url:
                        "https://res.cloudinary.com/dtsjpkaqa/image/upload/v1606148976/Campo/wplx73lmlq5w3rutnzhn.png",
                    filename: "Campo/wplx73lmlq5w3rutnzhn",
                },
            ],
            description:
                "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ex, accusantium dolores! Voluptas quisquam deleniti excepturi autem facilis distinctio omnis illum quidem. Necessitatibus consequatur eius repellendus hic? Soluta alias pariatur quam.",
            price,
        });
        await camp.save();
    }
};

seedDB().then(() => {
    mongoose.connection.close();
});
