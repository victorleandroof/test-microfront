export interface IResultNews {
    status: string;
    totalResults: number;
    articles: IArticle[];
}

export interface IArticle {
    source: ISource;
    author?: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface ISource {
    id: string;
    name: string;
}
