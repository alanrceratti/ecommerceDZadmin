export interface SessionProps {
	name: string;
	email: string;
	image: string;
}

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
}
