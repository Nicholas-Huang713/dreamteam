import { useId } from 'react';

function ArticleList({ articles }) {
    const id = useId();
    const isSmallScreen = window.innerWidth < 640; // You can adjust the breakpoint

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {articles ?
                (articles.map((article, index) => (
                    <div
                        key={`${id}-${index}`}
                        className={`bg-white p-4 shadow-md rounded-lg ${isSmallScreen ? 'mb-4' : ''
                            }`}
                    >
                        <img
                            src={article.urlToImage}
                            alt={article.title}
                            className="w-full h-40 object-cover mb-2"
                        />
                        <h2 className="text-sm font-semibold hover:underline">{article.title}</h2>
                    </div>
                ))) : null
            }
        </div>
    );
}

export default ArticleList;
