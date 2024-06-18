import React, {useState, useEffect} from 'react';
import {fetchBitcoinNews} from "../../api/News/newsAPI";
import styles from '../RightSideBar/RightSideBar.module.css'

export const RightSideBar = () => {
    const [news, setNews] = useState([]);
    console.log()

    useEffect(() => {
        fetchBitcoinNews()
            .then(response => setNews(response.data.articles))
            .catch(error => console.error('Error fetching news:', error));
    }, []);

    return (
        <section>
            <div className={styles.rightSideBar}>
                <div className={styles.newsList}>
                    <ul>
                        {news.map((article, index) => (
                            <li key={index} className={styles.newsItem}>
                                <img src={article.urlToImage} alt={article.title} className={styles.image}/>
                                <div className={styles.newsContent}>
                                    <h3 className={styles.title}>{article.title}</h3>
                                    <p className={styles.description}>{article.description}</p>
                                    <a href={article.url} target="_blank" rel="noopener noreferrer" className={styles.link}>Read more</a>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </section>
    );
};

export default RightSideBar;
