export type Product = {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    stock: number;
    rating: number;
    reviews: number;
    description: string;
}

export type Account = {
    id: string,
    username: string,
    email: string,
}