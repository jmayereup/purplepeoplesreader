export interface Pagination {
    page: number;
    perPage: number;
    totalItems: number;
    totalPages: number;
}

export interface PostItem {
    collectionId: string;
    collectionName: string;
    content: string;
    created: string;
    creatorEmail: string;
    id: string;
    title: string;
    updated: string;
}

export interface PostResponseData {
    pagination?: Pagination;
    items: PostItem[];
}


