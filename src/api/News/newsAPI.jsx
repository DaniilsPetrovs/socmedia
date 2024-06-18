import {newsApi} from "../api";


export const fetchBitcoinNews = () => {
    return newsApi.get('everything', {
        params: {
            q: 'bitcoin',
            pageSize: 10,
            sortBy: 'publishedAt'
        }
    });
};
