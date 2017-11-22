let desktopMapper = require('../../domain-layer/mappers/DesktopMapper');
let laptopMapper = require('../../domain-layer/mappers/LaptopMapper');
let monitorMapper = require('../../domain-layer/mappers/MonitorMapper');
let tabletMapper = require('../../domain-layer/mappers/TabletMapper');
let itemMapper = require('../../domain-layer/mappers/ItemMapper');

/**
 * Class describes a ProductCatalog.
 * @class ProductCatalog
 * @export
 */
class ProductCatalog {
    /**
     * @constructor
     */
    constructor() {
        this.productCatalogInstance = null;
    }

    /**
     * @static
     * @return {ProductCatalog} ProductCatalog instance
     */
    static getProductCatalogInstance() {
        if (this.productCatalogInstance == null) {
            this.productCatalogInstance = new ProductCatalog();
        }
        return this.productCatalogInstance;
    }

    /**
     * @param {string} productType product Type
     * @param {string} model model number of product.
     * @param {string} brand brand of product.
     * @param {string} processor processor in product.
     * @param {number} ram ram amount in product.
     * @param {number} storage storage size of product.
     * @param {number} cores amount of cores in processor in product.
     * @param {string} dimensions dimensions of product.
     * @param {number} weight weight of product.
     * @param {number} price price of product
     * @param {number} display  size of product screen.
     * @param {string} os operating system of product.
     * @param {string} battery battery information of product.
     * @param {string} camera camera information of product.
     * @param {boolean} touch is display touch or not.
     * @param {string} size is size of product
     */
    addProductSpecification(productType, model, brand, processor, ram, storage, cores, dimensions, weight, price, display, os, battery, camera, touch, size, version) {
        if (this.productCatalogSessionIsComplete()) {
            switch (productType) {
                case 'Desktop':
                    this.desktop = desktopMapper.create(model, brand, processor, ram, storage, cores, dimensions, weight, price, version);
                    desktopMapper.makeInsertion(this.desktop);
                    break;
                case 'Laptop':
                    this.laptop = laptopMapper.create(model, brand, display, processor, ram, storage, cores, os, battery, camera, touch, dimensions, weight, price, version);
                    laptopMapper.makeInsertion(this.laptop);
                    break;
                case 'Monitor':
                    this.monitor = monitorMapper.create(model, brand, size, weight, price, version);
                    monitorMapper.makeInsertion(this.monitor);
                    break;
                case 'Tablet':
                    this.tablet = tabletMapper.create(model, brand, display, processor, ram, storage, cores, os, battery, camera, dimensions, weight, price, version);
                    tabletMapper.makeInsertion(this.tablet);
                    break;
            }
        } else {
            return ('Begin Product Catalog Session to add Specifications.');
        }
    }

    /**
     * @param {string} productType product Type
     * @param {string} model model number of product.
     * @param {string} brand brand of product.
     * @param {string} processor processor in product.
     * @param {number} ram ram amount in product.
     * @param {number} storage storage size of product.
     * @param {number} cores amount of cores in processor in product.
     * @param {string} dimensions dimensions of product.
     * @param {number} weight weight of product.
     * @param {number} price price of product
     * @param {number} display  size of product screen.
     * @param {string} os operating system of product.
     * @param {string} battery battery information of product.
     * @param {string} camera camera information of product.
     * @param {boolean} touch is display touch or not.
     * @param {string} size is size of product
     */
    updateProductSpecification(productType, model, brand, processor, ram, storage, cores, dimensions, weight, price, display, os, battery, camera, touch, size, version) {
        let idMapVersion = parseInt(idMap.get(productType, model).version);
        let isVersion = parseInt(version) === idMapVersion;
        if (this.productCatalogSessionIsComplete()) {
            switch (productType) {
                case 'Desktop':
                    if (isVersion) {
                        this.desktop = desktopMapper.create(model, brand, processor, ram, storage, cores, dimensions, weight, price, version);
                        desktopMapper.makeUpdate(this.desktop);
                        return ('Desktop Specification Update was Successful');
                    } else {
                        return ('Error, Desktop Specification is not Current');
                    }
                    break;
                case 'Laptop':
                    if (isVersion) {
                        this.laptop = laptopMapper.create(model, brand, display, processor, ram, storage, cores, os, battery, camera,
                            touch, dimensions, weight, price,version);
                        laptopMapper.makeUpdate(this.laptop);
                        return ('Laptop Specification Update was Successful');
                    } else {
                        return ('Error, Laptop Specification is not Current');
                    }
                    break;
                case 'Monitor':
                    if (isVersion) {
                        this.monitor = monitorMapper.create(model, brand, size, weight, price, version);
                        monitorMapper.makeUpdate(this.monitor);
                        return ('Monitor Specification Update was Successful');
                    } else {
                        return ('Error, Monitor Specification is not Current');
                    }
                    break;
                case 'Tablet':
                    if (isVersion) {
                        this.tablet = tabletMapper.create(model, brand, display, processor, ram, storage, cores, os, battery, camera,
                            dimensions, weight, price, version);
                        tabletMapper.makeUpdate(this.tablet);
                        return ('Tablet Specification Update was Successful');
                    } else {
                        return ('Error, Tablet Specification is not Current');
                    }
                    break;
            }
        } else {
            return ('Begin Product Catalog Session to edit.');
        }
    }

    /**
     * @param {string} productType product Type
     * @param {string} modelNumber model number of product.
     */
    deleteProductSpecification(productType, modelNumber) {
        if (this.productCatalogSessionIsComplete()) {
            this.getProductSpecification(productType, modelNumber, function callback(err, result) {
                switch (productType) {
                    case 'Desktop':
                        desktopMapper.makeDeletion(result);
                        break;
                    case 'Laptop':
                        laptopMapper.makeDeletion(result);
                        break;
                    case 'Monitor':
                        monitorMapper.makeDeletion(result);
                        break;
                    case 'Tablet':
                        tabletMapper.makeDeletion(result);
                        break;
                }
            });
        } else {
            return ('Begin Product Catalog Session to edit.');
        }
    }

    /**
     * @param {string} productType product Type
     * @param {string} modelNumber model number of product.
     * @param {function} callback function
     */
    getProductSpecification(productType, modelNumber, callback) {
        switch (productType) {
            case 'Desktop':
                desktopMapper.find(modelNumber, function (err, result) {
                    if (err) {
                        console.log('Error during desktop find query', null);
                    } else {
                        return callback(null, result);
                    }
                });
                break;

            case 'Laptop':
                laptopMapper.find(modelNumber, function (err, result) {
                    if (err) {
                        console.log('Error during laptop find query', null);
                    } else {
                        return callback(null, result);
                    }
                });
                break;

            case 'Monitor':
                monitorMapper.find(modelNumber, function (err, result) {
                    if (err) {
                        console.log('Error during monitor find query', null);
                    } else {
                        return callback(null, result);
                    }
                });
                break;
            case 'Tablet':
                tabletMapper.find(modelNumber, function (err, result) {
                    if (err) {
                        console.log('Error during tablet find query', null);
                    } else {
                        return callback(null, result);
                    }
                });
                break;
        }
    }

    /**
     * @param {string} productType product Type
     * @param {function} callback function
     */
    getAllProductSpecification(productType, callback) {
        switch (productType) {
            case 'Desktop':
                desktopMapper.findAll(function (err, data) {
                    if (err) {
                        throw err;
                    }
                    return callback(null, data);
                });
                break;
            case 'Laptop':
                laptopMapper.findAll(function (err, data) {
                    if (err) {
                        throw err;
                    }
                    return callback(null, data);
                });
                break;
            case 'Monitor':
                monitorMapper.findAll(function (err, data) {
                    if (err) {
                        throw err;
                    }
                    return callback(null, data);
                });
                break;
            case 'Tablet':
                tabletMapper.findAll(function (err, data) {
                    if (err) {
                        throw err;
                    }
                    return callback(null, data);
                });
                break;
        }
    }

    /**
     * @param {string} serialNumber of product
     * @param {string} modelNumber model number of product specification
     */
    addItem(serialNumber, modelNumber) {
        if (this.productCatalogSessionIsComplete()) {
            this.item = itemMapper.create(serialNumber, modelNumber);
            itemMapper.makeInsertion(this.item);
        } else {
            return ('Begin Product Catalog Session to add items to catalog.');
        }
    }

    /**
     * @param {string} serialNumber of product
     */
    deleteItem(serialNumber) {
        if (this.productCatalogSessionIsComplete()) {

            let itemObject = itemMapper.create(serialNumber);
            itemMapper.makeDeletion(itemObject);
        } else {
            return ('Begin Product Catalog Session to delete items from catalog.');
        }
    }

    /**
     * @param {function} callback function
     */
    getItems(callback) {
        itemMapper.findAll(function (err, data) {
            if (err) {
                throw err;
            }
            return callback(null, data);
        });
    }

    /**
     * Gets and item and locks it
     * @param {*} modelNumber
     * @param {*} callback
     */
    getItemAndLock(modelNumber, callback) {
        itemMapper.getItemFromModel(modelNumber, function (err, result) {
            if (!err) {
                itemMapper.lockItem(result, function (err, result) {
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                });
                return callback(null, result);
            } else {
                return callback(err, null);
            }
        });
    }

    /**
     * Gets and item and locks it
     * @param {*} modelNumber
     * @param {*} callback
     */
    getItem(serialNumber, callback) {
        itemMapper.find(serialNumber, function (err, result) {
            if (!err) {
                return callback(null, result);
            }
        });
    }

    /**
     * Unlocks an item.
     * @param {*} serialNumber
     * @param {*} callback
     */
    unlockItem(serialNumber, callback) {
        itemMapper.find(serialNumber, function (err, result) {
            itemMapper.unlockItem(result, function (err, result) {
                if (err) {
                    console.log(err);
                    return callback(err, null);
                }
                return callback(null, result);
            });
        });
    }

    /**
     * @param {string} productType string of the Object
     * @param {function} callback function
     */
    getAllProductInventory(productType, callback) {
        switch (productType) {
            case 'Desktop':
                desktopMapper.getDesktop(function (err, data) {
                    return callback(null, data);
                });
                break;
            case 'Laptop':
                laptopMapper.getLaptop(function (err, data) {
                    return callback(null, data);
                });
                break;
            case 'Monitor':
                monitorMapper.getMonitor(function (err, data) {
                    return callback(null, data);
                });
                break;
            case 'Tablet':
                tabletMapper.getTablet(function (err, data) {
                    return callback(null, data);
                });
                break;
        }
    }

    startProductCatalogSession() {
        this.isComplete = true;
    }

    endProductCatalogSession() {
        this.isComplete = false;
    }

    productCatalogSessionIsComplete() {
        if (this.isComplete == null) {
            return false;
        }
        return this.isComplete;
    }

}

module.exports = ProductCatalog;
