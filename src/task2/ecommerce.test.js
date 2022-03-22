import { fetchAllOrders, bucketOrdersByUsers } from "../task2/ecommerce";

describe("Ecommerce - fetchAllOrders", () => {
    test("should return all orders", async () => {
        const orders = await fetchAllOrders();
        expect(orders).toHaveLength(100);
    });
});

describe("Ecommerce - bucketOrdersByUsers", () => {
    test("should return all users", async () => {
        const usersOrders = await bucketOrdersByUsers();
        const usersIds = Object.keys(usersOrders);
        expect(usersIds).toHaveLength(10);
    });
    test("should return users orders in array", async () => {
        const usersOrders = await bucketOrdersByUsers();
        const orders = Object.values(usersOrders);
        expect(orders[0]).toBeInstanceOf(Array);
    });
});
