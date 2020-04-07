var mongoose = require('mongoose');

const customerModel = require('../models/customerModel');
const customerMaster = mongoose.model('customer', customerModel.customerSchema);

const dao = require('../dao/baseDao');

class Usercontroller {
    async insertUser(req, res) {
        var { name, phone, address, membership } = req.body;
        let id = '0';

        var userData = {
            name: name,
            phone: phone,
            address: address,
            membership: membership
        };
        await customerModel.find({}).sort({ id: -1 }).then(async (data) => {

            if (data.length) {
                console.log('--->', data[0].id);
                id = parseInt(data[0].id) + 1;
            } else {
                id = "0";
            }
            userData.id = await id;
            customerModel.create(userData, (err, data) => {
                if (err) {
                    res.send({ status: 400, message: err.message });
                }
                else {
                    let obj = {
                        name: data.name,
                        phone: data.phone,
                        address: data.address,
                        membership: data.membership,
                        id: data.id
                    }
                    res.send(obj);
                }
            });

        })


    }

    getallUser(req, res) {

        let customerDao = new dao(customerMaster);
        let query = {
            isDelete: false
        };

        // let option = {
        //     sort: {
        //         'createdAt': -1
        //     }
        // };
        // var columnName = null
        // var clumnValue = null
        // var key = null
        // var cname = null
        // if (req.body['search']['value']) {
        //     query['$or'] = [];
        // }

        // // for global search
        // for (let i = 0; i < 5; i++) {
        //     // for if null value
        //     if (req.body['search']['value']) {

        //         if (req.body['columns'][i]['data']) {
        //             columnName = req.body['columns'][i]['data']
        //             clumnValue = req.body['search']['value'];
        //             key = columnName,
        //                 query['$or'].push({
        //                     [key]: {
        //                         $regex: clumnValue,
        //                         $options: 'i'
        //                     }
        //                 })
        //         }

        //     }
        //     if (req.body['order'][0]['column'] == i) {
        //         cname = req.body['columns'][i]['data'];
        //         option = {
        //             sort: {
        //                 [cname]: (req.body['order'][0]['dir'] == 'asc') ? 1 : -1
        //             }
        //         };
        //     }
        // }

        // option['offset'] = parseInt(req.body['start']);
        // option['limit'] = parseInt(req.body['length']);
        // option['collation'] = { locale: "en_US", numericOrdering: true }

        customerDao.find(query).then((data) => {
            res.send(data)
        }).catch((err) => {
            res.send({ status: 400, message: err.message });
        });
    }

    getUserById(req, res) {
        let customerDao = new dao(customerMaster);

        customerDao.findOne({ id: req.params.userId }).then((data) => {
            let obj = {
                name: data.name,
                phone: data.phone,
                address: data.address,
                membership: data.membership,
                id: data.id
            }
            res.send(obj);
        }).catch((err) => {
            res.send({ status: 400, message: err.message });
        });
    }


    deleteUserById(req, res) {

        let customerDao = new dao(customerMaster);


        customerDao.findOneAndUpdate({ id: req.params.userId }, { $set: { isDelete: true } }, { new: true }).then((data) => {
            let obj = {
                name: data.name,
                phone: data.phone,
                address: data.address,
                membership: data.membership,
                id: data.id
            }
            res.send(obj);
        }).catch((err) => {
            res.send({ status: 400, message: err.message });
        });
    }

    findByIdAndUpdate(req, res) {
        let customerDao = new dao(customerMaster);

        var { name, phone, address, membership } = req.body;

        var userData = {
            name: name,
            phone: phone,
            address: address,
            membership: membership
        };

        customerDao.findOneAndUpdate({ id: req.params.userId }, { $set: userData }, { new: true }).then((data) => {
            let obj = {
                name: data.name,
                phone: data.phone,
                address: data.address,
                membership: data.membership,
                id: data.id
            }
            res.send(obj);
        }).catch((err) => {
            res.send({ status: 400, message: err.message });
        })
    }

}

var user = new Usercontroller();

module.exports = user;