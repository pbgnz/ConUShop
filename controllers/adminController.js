let UserMapper = require('../domain-layer/mappers/UserMapper');

module.exports = {
    dashboard: function(req, res) {
        res.render('admin/dashboard');
    },

    desktop: function(req, res) {
        req.adminUser.getProductCatalog().getAllProductSpecification('Desktop', function(err, data) {
            res.render('admin/desktop', {
                data: data,
            });
        });
    },

    laptop: function(req, res) {
        req.adminUser.getProductCatalog().getAllProductSpecification('Laptop', function(err, data) {
            res.render('admin/laptop', {
                data: data,
            });
        });
    },

    monitor: function(req, res) {
        req.adminUser.getProductCatalog().getAllProductSpecification('Monitor', function(err, data) {
            res.render('admin/monitor', {
                data: data,
            });
        });
    },

    tablet: function(req, res) {
        req.adminUser.getProductCatalog().getAllProductSpecification('Tablet', function(err, data) {
            res.render('admin/tablet', {
                data: data,
            });
        });
    },

    inventory: function(req, res) {
        req.adminUser.getProductCatalog().getItems(function(err, data) {
            res.render('admin/inventory', {
                data: data,
            });
        });
    },

    clients: function(req, res) {
        UserMapper.findAllClients(function(err, data) {
            res.render('admin/clients', {
                data: data,
            });
        });
    },

    deleteItem: function(req, res) {
        let otherMsg = req.adminUser.getProductCatalog().deleteItem(req.body.serialNumber);
        req.flash('otherSess_msg', otherMsg);
        res.redirect(req.get('referer'));
    },

    addItem: function(req, res) {
        let otherMsg = req.adminUser.getProductCatalog().addItem(req.body.serialNumber, req.body.modelNumber);
        req.flash('otherSess_msg', otherMsg);
        res.redirect(req.get('referer'));
    },

    addProdSpec: function(req, res) {
        let prodType = req.body.formProductType;
        let model = req.body.model;
        let brand = req.body.brand;
        let processor = req.body.processor;
        let ram = req.body.ram;
        let storage = req.body.storage;
        let cores = req.body.cores;
        let dimensions = req.body.dimensions;
        let weight = req.body.weight;
        let price = req.body.price;
        let display = req.body.display;
        let os = req.body.os;
        let battery = req.body.battery;
        let camera = req.body.camera;
        let touch = req.body.touch;
        let size = req.body.size;

        switch (this.prodType) {
            case 'Desktop':
                // Validation
                req.checkBody('model', 'Can not be empty').notEmpty();
                req.checkBody('brand', 'Can not be empty').notEmpty();
                req.checkBody('processor', 'Can not be empty').notEmpty();
                req.checkBody('ram', 'Can not be empty').notEmpty();
                req.checkBody('storage', 'Can not be empty').notEmpty();
                req.checkBody('cores', 'Can not be empty').notEmpty();
                req.checkBody('dimensions', 'Can not be empty').notEmpty();
                req.checkBody('weight', 'Can not be empty').notEmpty();
                req.checkBody('price', 'Can not be empty').notEmpty();
                break;
            case 'Laptop':
                // Validation
                req.checkBody('model', 'Can not be empty').notEmpty();
                req.checkBody('brand', 'Can not be empty').notEmpty();
                req.checkBody('processor', 'Can not be empty').notEmpty();
                req.checkBody('ram', 'Can not be empty').notEmpty();
                req.checkBody('storage', 'Can not be empty').notEmpty();
                req.checkBody('cores', 'Can not be empty').notEmpty();
                req.checkBody('dimensions', 'Can not be empty').notEmpty();
                req.checkBody('weight', 'Can not be empty').notEmpty();
                req.checkBody('price', 'Can not be empty').notEmpty();
                req.checkBody('display', 'Can not be empty').notEmpty();
                req.checkBody('os', 'Can not be empty').notEmpty();
                req.checkBody('battery', 'Can not be empty').notEmpty();
                req.checkBody('camera', 'Can not be empty').notEmpty();
                req.checkBody('touch', 'Can not be empty').notEmpty();
                break;
            case 'Monitor':
                // Validation
                req.checkBody('model', 'Can not be empty').notEmpty();
                req.checkBody('brand', 'Can not be empty').notEmpty();
                req.checkBody('weight', 'Can not be empty').notEmpty();
                req.checkBody('price', 'Can not be empty').notEmpty();
                req.checkBody('size', 'Can not be empty').notEmpty();
                break;
            case 'Tablet':
                // Validation
                req.checkBody('model', 'Can not be empty').notEmpty();
                req.checkBody('brand', 'Can not be empty').notEmpty();
                req.checkBody('processor', 'Can not be empty').notEmpty();
                req.checkBody('ram', 'Can not be empty').notEmpty();
                req.checkBody('storage', 'Can not be empty').notEmpty();
                req.checkBody('cores', 'Can not be empty').notEmpty();
                req.checkBody('dimensions', 'Can not be empty').notEmpty();
                req.checkBody('weight', 'Can not be empty').notEmpty();
                req.checkBody('price', 'Can not be empty').notEmpty();
                req.checkBody('display', 'Can not be empty').notEmpty();
                req.checkBody('os', 'Can not be empty').notEmpty();
                req.checkBody('battery', 'Can not be empty').notEmpty();
                req.checkBody('camera', 'Can not be empty').notEmpty();
                break;
        }

        let errors = req.validationErrors();

        if (errors) {
            req.flash('otherSess_msg', errors);
            res.redirect(req.get('referer'));
        } else {
            let otherMsg = req.adminUser.getProductCatalog().addProductSpecification(prodType, model, brand, processor, ram, storage, cores, dimensions,
                weight, price, display, os, battery, camera, touch, size);
            req.flash('otherSess_msg', otherMsg);
            res.redirect(req.get('referer'));
        }
    },

    deleteProdSpec: function(req, res) {
        let admin = req.adminUser;
        if (idMap.get(req.body.prodType, req.body.model) !== null) {
            let msg = admin.getProductCatalog().deleteProductSpecification(req.body.prodType, req.body.model);
            req.flash('success_msg', msg);
        } else {
            req.flash('error_msg', 'Object no longer exists, Product Specifications are not current');
        }
        res.send({redirect: req.body.redi});
    },

    updateProdSpec: function(req, res) {
        let otherMsg;
        if (idMap.get(req.body.prodType, req.body.model) !== null) {
            let idMapVersion = parseInt(idMap.get(req.body.prodType, req.body.model).version);
            let clientVersion = parseInt(req.body.version);
            let isSessionComplete = req.adminUser.getProductCatalog().productCatalogSessionIsComplete();
            let isVersion = idMapVersion === clientVersion;
            switch (req.body.prodType) {
                case 'Desktop':
                    otherMsg = req.adminUser.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand,
                        req.body.processor, req.body.ram, req.body.storage, req.body.cores,
                        req.body.dimensions, req.body.weight, req.body.price, null, null, null, null, null, null, req.body.version);
                    break;
                case 'Laptop':
                    otherMsg = req.adminUser.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, req.body.processor, req.body.ram, req.body.storage,
                        req.body.cores, req.body.dimensions, req.body.weight, req.body.price, req.body.display, req.body.os, req.body.battery, req.body.camera, req.body.touch, null, req.body.version);
                    break;
                case 'Monitor':
                    otherMsg = req.adminUser.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, null, null, null, null,
                        null, req.body.weight, req.body.price, null, null, null, null, null, req.body.size, req.body.version);
                    break;
                case 'Tablet':
                    otherMsg = req.adminUser.getProductCatalog().updateProductSpecification(req.body.prodType, req.body.model, req.body.brand, req.body.processor, req.body.ram, req.body.storage,
                        req.body.cores, req.body.dimensions, req.body.weight, req.body.price, req.body.display, req.body.os, req.body.battery, req.body.camera, null, null, req.body.version);
                    break;
            }
            if (isSessionComplete) {
                if (isVersion) {
                    req.flash('success_msg', otherMsg);
                } else {
                    req.flash('error_msg', otherMsg);
                }
            } else {
                req.flash('otherSess_msg', otherMsg);
            }
        } else {
            req.flash('error_msg', 'Object no longer exists, Product Specification is not current');
        }
        res.send({redirect: req.body.redi});
    },
    startProductCatalogSession: function(req, res) {
        req.adminUser.getProductCatalog().startProductCatalogSession();
        req.flash('sessStart_msg', 'Started Product Catalog Session. You can now make changes to Product Catalog');
        res.send({redirect: req.body.redi});
    },
    endProductCatalogSession: function(req, res) {
        req.adminUser.getProductCatalog().endProductCatalogSession();
        req.flash('sessEnd_msg', 'Ended Product Catalog Session. You can no longer make changes to Product Catalog');
        res.send({redirect: req.body.redi});
    },
};
