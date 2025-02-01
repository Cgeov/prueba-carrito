export interface IDish{
    name: string;
    price: number;
    image: string;
    category: string;
}

export interface IDishData{
    name: string;
    price: number;
    image: IImage;
    category: string;
    subTotal?: number;
    quantity?: number
}
interface IImage{
    thumbnail: string,
    mobile: string,
    tablet: string,
    desktop: string,
}