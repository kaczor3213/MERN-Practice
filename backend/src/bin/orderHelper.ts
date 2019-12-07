import { getConnection } from "typeorm";
import { Order, PaymentType, OrderStatus } from "../entity/Order";
import { User } from "../entity/User";
import { Equipment, EquipmentType } from "../entity/Equipment";

let TEST_ORDERS = [];

export const genTestOrder = async () => {
    let orderRepository = getConnection().getRepository(Order);
    let equipmentRepository = getConnection().getRepository(Equipment);
    let userRepository = getConnection().getRepository(User);
    
    let order = new Order();

    order.rent_from = new Date("2019-01-16").toString();
    order.rent_to = new Date("2019-01-19").toString();
    order.totalcost = 1200;
    order.payment = PaymentType.CASH;
    order.status = OrderStatus.OUTDATED;
    order.equipments = null;
    order.user = await userRepository.findOne(1);
    orderRepository.save(order);
    console.log(order.id);
}

export const delTestOrders = async () => {
    let orderRepository = getConnection().getRepository(Order);
    //orderRepository.save(order);
}
