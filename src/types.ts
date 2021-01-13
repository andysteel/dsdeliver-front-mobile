export type Order = {
    id: number;
    address: string
    latitude: number;
    longitude: number;
    timestamp: string;
    status: string;
    products: Product[];
    total: number;
}

export type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    imageUri: string;
}