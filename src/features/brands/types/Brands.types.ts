export type Brand = {
    _id: string;
    name: string;
    slug: string;
    image: string;
    createdAt: string;
    updatedAt: string;
}

export type BrandMetaData = {
    currentPage: number;
    numberOfPages: number;
    limit: number;
    results: number;
}

export type BrandsResponse = {
    results: number;
    metadata: BrandMetaData;
    data: Brand[];
}
