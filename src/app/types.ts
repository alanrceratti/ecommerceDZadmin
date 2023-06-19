export interface SessionProps {
	session: {
		user: {
			name: string;
			email: string;
			image: string;
		};
	};
}

export interface DataProps {
	name: string;
	description: string;
	price: number;
	_id: Object;
	category: string;
}

export interface NewProductsProps {
	name?: string;
	description?: string;
	price?: number;
	images?: string[];
	_id?: string;
	category?: { name: string; _id: string };
	speed?: number;
	range?: number;
	camera?: string[];
	battery?: number;
	waterProof?: string[];
	skillLevel?: string[];
	ambient?: string[];
	followMode?: string[];
	autoReturn?: string[];
	weight?: number;
	bestSeller?: boolean;
	offer?: boolean;
	offerPrice?: number;
}

export interface Categories {
	_id: string;
	name: string;
}

export interface FilterOption {
	label: string;
	labelName: string;
	value: string;
}

export interface Filter {
	name: string;
	options: FilterOption[];
}

export interface Filters {
	filters: Filter[];
}

export interface Faq {
	id: string;
	question: string;
	answer: string;
}

export interface FAQtypes {
	questions: Faq[];
}
