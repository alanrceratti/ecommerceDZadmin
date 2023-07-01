"use client";
import { useEffect, useState } from "react";

export default function Orders() {
	const [orders, setOrders] = useState() || [];

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
							(order) =>
								order.paid === true && (
									<tr key={order._id}>
										<td>{order.createdAt}</td>

										<td>
											{order.name}
											<br></br>
											{order.email}
										</td>
										<td>
											{order.line_items.map((line) => (
												<h1 key={line._id}>
													{
														line.price_data
															?.product_data?.name
													}{" "}
													x {line.quantity}
												</h1>
											))}
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
