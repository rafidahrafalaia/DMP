/*eslint-disable */

// note
// dt : datatable means the index table,
// reqQuery : req.query
// column : colums mapped == hit function column.columns()
//			- bring array of columnName to hit
//			- contain setting up which tabble allow searchable, orderable
// tableName : - filled by table name
//				- filled by raw query if you need to join between tables
// primary key : primary key of table,
// columsmap : colump mapped == hit function column.columnMaps()
//			- contain table name and table index mapped
//			- bring array of columnName to hit

const db = require('../../data/dbConn'); //connect to db instance
const NodeTable = require('./nodeTable');

export const dataTable = async (
    dt: any,
    reqQuery: any,
    column: any,
    tableName: any,
    primaryKey: any,
    columnsMap: any
) => {
    try {
        const usedDb = db;
        // define sort type
        const sortType = reqQuery.descending == 'true' ? 'desc' : 'asc';
        // define startpage /offset
        const startPage =
            (parseInt(reqQuery.page || 1) - 1) * parseInt(reqQuery.size || 10);

        const requestQuery = {
            draw: reqQuery.draw || '1', // contain draw
            columns: column, // column mapped
            order: [{ column: dt || '0', dir: sortType }], // index of order by example 0 and contain shortType(desc,asc)
            start: String(startPage), // where the page start
            length: String(reqQuery.size || 10), // length/limit
            search: { value: reqQuery.search || '', regex: 'false' }, // global search
            _: '1559552531843'
        };
        // create data table
        const nodeTable = new NodeTable(
            requestQuery,
            usedDb,
            tableName,
            primaryKey,
            columnsMap
        );

        const getTable = function getTable() {
            return new Promise((resolve, reject) => {
                nodeTable.output((err: any, data: any) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(data);
                    }
                });
            });
        };
        return await getTable();
    } catch (err) {
        throw err;
    }
};

/* eslint-enable */
