"use client";
import useMedia from "@/app/hooks/useMedia";
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
	const mobile = useMedia("(max-width:767px)");

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
			{!mobile ? (
				<table className="w-full mx-4">
					<thead>
						<tr>
							<td className="px-2">Data</td>
							<td className="px-2">Paid</td>
							<td className="px-2">Recipients</td>
							<td className="px-2">Products</td>
						</tr>
					</thead>
					<tbody>
						{orders &&
							orders.map((order: Order) => (
								<tr key={order._id}>
									<td className="px-2">{order.createdAt}</td>
									<td
										className={`	${
											order.paid
												? "text-green-600"
												: "text-red-600"
										} px-2`}
									>
										{order.paid ? "Yes" : "No"}
									</td>

									<td className="px-2">
										{order.name}
										<br></br>
										{order.email}
									</td>
									<td className="px-2">
										{order.line_items.map((line, index) => (
											<h1 key={index}>
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
							))}
					</tbody>
				</table>
			) : (
				<h1 className="m-2"> Please log in a desktop</h1>
			)}
		</section>
	);
}
