const productModel = require('./product_manageModel');
const cloudinary = require('../../config/cloudinary.config');

/**
 * Get all admin or user
 * @param id
 * @returns {Promise<[Admin-User: model]>}
 */
module.exports.getProducts = async (id = null) => {
    try {
        if (id === null) {
            const products = await productModel.find().lean();
            for (let i = 0; i < products.length; i++) {
                products[i].thumbnail = products[i].img[0];
            }

            return products;
        } else {
            const product = await productModel.findById(id).lean();

            // remove first img
            product.thumbnail = product.img[0];
            const theRemovedElement = product.img.shift();
            return product;
        }

    } catch (err) {
        throw err;
    }
}

/**
 * Get all admin or user
 * @param body {Object}
 * @param file {object}
 * @returns {Promise<[Admin-User: model]>}
 */
module.exports.addProduct = async (body, file) => {
    try {
        // upload image
        let result;
        if (file) {
            result = await cloudinary.v2.uploader.upload(file.path, {
                folder: "product",
                use_filename: true,
            });
        }

        // get image url
        let { url } = result ?? "";
        if (url === undefined) {
            // default avatar
            url = 'https://res.cloudinary.com/web-hcmus/image/upload/v1648341181/Default_avatar/default-avtar_wmf6yf.jpg';
        }

        // body to model
        body['img'] = [url];
        if (body.brand === "") {
            body['brand'] = "BoBui";
        }

        if (body.category === undefined) {
            body['category'] = "Clothing";
        }
        if (body.size === undefined) {
            body['size'] = 28;
        }
        if (body.introduction === undefined) {
            body['introduction'] = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";
        }

        if (body.infomation === undefined) {
            body['infomation'] = 'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H.Rackham.';
        }

        // insert 
        await productModel.insertMany(body)

    } catch (err) {
        throw err;
    }
}