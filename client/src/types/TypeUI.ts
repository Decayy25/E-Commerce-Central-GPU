import type React from "react";

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
};

export type LogoProps = {
  logo?: string;
  className?: string;
  loading?: string;
};

export type LabelProps = {
  className?: string;
  Title?: string;
  htmlfor?: string;
};

export type Hyperlink = {
  className?: string;
  toLink?: string;
  Title?: string;
};

export type LayoutProps = {
  className?: string;
  children: React.ReactNode;
};

export type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  name?: string;
};

export type FormFieldProps = {
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  icon: React.ReactNode;
};

export type CartOrderType = {
  id: number;
  name: string;
  price: number;
  image: string;
}