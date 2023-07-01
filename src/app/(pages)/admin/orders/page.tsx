"use client";
import { useEffect, useState } from "react";

interface LineItem {
	quantity: number;
	price_data: {
		currency: string;
		product_data: {
			name: string;
		};
		unit_amount: number;
	};
}

interface Order {
	_id: string;
	line_items: LineItem[];
	name: string;
	email: string;
	paid: boolean;
	createdAt: string;
	updatedAt: string;
	__v: number;
}

export default function Orders() {
	const [orders, setOrders] = useState<Order[]>([]);

	useEffect(() => {
		selectedProduct();
	}, []);

	const selectedProduct = async () => {
		try {
			const response = await fetch("/api/orders");
			const data = await response.json();
			setOrders(data);
		} catch (error) {
			console.error(error);
		}
	};
	console.log(orders);
	return (
		<section>
			<h1 className="h1">Orders</h1>
			<table className="w-full">
				<thead>
					<tr>
						<td>ID</td>
						<td>Recipients</td>
						<td>Products</td>
					</tr>
				</thead>
				<tbody>
					{orders &&
						orders.map(
							(order: Order) =>
								order.paid === true && (
									<tr key={order._id}>
										<td>{order.createdAt}</td>

										<td>
											{order.name}
											<br></br>
											{order.email}
										</td>
										<td>
											{order.line_items.map(
												(line, index) => (
													<h1 key={index}>
														{
															line.price_data
																?.product_data
																?.name
														}{" "}
														x {line.quantity}
													</h1>
												)
											)}
										</td>
										{/* <td className="text-center flex gap-2 justify-center mx-2"> */}
									</tr>
								)
						)}
				</tbody>
			</table>
		</section>
	);
}
