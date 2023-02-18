// name contain table name will showed in array

export const columns = async (name: string[]) => {
    const column = [];
    for (let i = 0; i < name.length; i += 1) {
        const columMaps = {
            data: i.toString(),
            name: '',
            searchable: 'true',
            orderable: 'true',
            search: [Object],
        };
        column.push(columMaps);
    }
    return column;
};

// shortBy contain the name of field will orderedBy
// tableName contain table name will showed in array
export const columnsMap = async (sortBy: string, tableName: string[]) => {
    const col = [];
    for (let i = 0; i < tableName.length; i += 1) {
        const columnss = {
            db: tableName[i],
            dt: i,
        };
        col.push(columnss);
    }
    // select dt based on
    const newArray = col.filter(el => el.db === (sortBy || 'id'));
    const { dt } = newArray[0];
    return {
        col,
        dt,
    };
};
