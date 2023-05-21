// export interface SessionProps {
// 	session: {
// 		user: {
// 			name: string;
// 			email: string;
// 			image: string;
// 		};
// 	};
// }

export interface DataProps {
	name: string;
	description: string;
	price: number;
	_id: Object;
}

export interface NewProductsProps {
	name?: string;
	description?: string;
	price?: number;
	images?: string[];
	_id?: string;
	category?: string[];
}

export interface Categories {
	name?: string;
	_id?: string;
}
