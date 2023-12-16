import { useId } from 'react';

function ArticleList({ articles, setModalData, setModalOpen }) {
    const id = useId();
    const isSmallScreen = window.innerWidth < 640; // You can adjust the breakpoint

    const handleArticleClick = (articleData) => {
        setModalData(articleData);
        setModalOpen(prev => !prev);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {articles.length > 0 ?
                (articles.map((article, index) => (
                    <button
                        key={`${id}-${index}`}
                        className={`bg-white p-4 shadow-md rounded-lg ${isSmallScreen ? 'mb-4' : ''} hover:opacity-75 transition duration-300 ease-in-out`}
                        onClick={() => handleArticleClick(article)}
                    >
                        <img
                            src={article.image}
                            alt={article.title}
                            className="w-full h-40 object-cover mb-2"
                            loading="lazy"
                        />
                        <h2 className="text-sm font-semibold hover:underline">{article.title}</h2>
                    </button>
                ))) : null
            }
        </div>
    );
}

export default ArticleList;
