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
    expand: {
        tags: Tag[];
    }
    tags: string[];

}

export interface PostResponseData {
    pagination?: Pagination;
    items: PostItem[];
}

export interface Tag {
    collectionId: string;
    collectionName: string;
    created: string;
    id: string;
    tag: string;
    updated: string;
  }


export const INIT_POST_ITEM: PostItem = {
    collectionId:  "",
    collectionName:  "",
    content:  "",
    created:  "",
    creatorEmail:  "",
    id:  "",
    title:  "",
    updated:  "",
    expand: {
        tags: []
    },
    tags:  []
}