////////////////////////////////////////////// Helper code, do not edit /////////////////////////////////////////
import { allIds, fetchOrderById } from "../api/index";

////////////////////////////////// Your code tasks is below //////////////////////////////////////////////////////

//   1. TODO: fetch all ids using the "fetchOrderById" and the given ids, make it work as efficient and clean as possible.
export const fetchAllOrders = () => {
    const ids = allIds;
    const promises = ids.map(id => fetchOrderById(id));
    return Promise.all(promises);
};

//   2. TODO: using the function from section 1 you should now bucket the orders by user.
// each key in the object (ordersByUsers) represents a userId and each value is an array of the orders of that user.
export const bucketOrdersByUsers = async () => {
    const orders = await fetchAllOrders();
    return orders.reduce((acc, obj) => {
        if(!(obj.userId in acc)){
            acc[obj.userId] = [];
        }
        acc[obj.userId].push(obj);
        return acc;
    }, {});
};

//   3. TODO: fetch all Ids and return array with only the last 2 weeks orders. make it work as efficient and clean as possible.
export const getLast2WeeksOrders = async () => {
    const twoWeeksInMs = 1.21e+9;
    const lastTwoWeeksInMs = new Date().getTime() - twoWeeksInMs;
    const orders = await fetchAllOrders();
    return orders.filter(order => order.timestamp > lastTwoWeeksInMs);
};

//   4. TODO: using the function from section 3 bucket the orders by date.
// each key in the object (ordersByDate) represents a day and each value is an array of the orders in that date.
export const bucketOrdersByDate = async () => {
    const orders = await getLast2WeeksOrders();
    return orders.reduce((acc, obj) => {
        if(!(obj.timestamp in acc)){
            acc[obj.timestamp] = [];
        }
        acc[obj.timestamp].push(obj);
        return acc;
    }, {});
};

fetchAllOrders().then(console.log);

bucketOrdersByUsers().then(console.log);

getLast2WeeksOrders().then(console.log);

bucketOrdersByDate().then(console.log);

////////////////////////////////////////
