import { useId } from 'react';

// const articles = [
//     {
//         id: 1,
//         title: 'Article 1',
//         imageUrl: 'image1.jpg',
//     },
//     {
//         id: 2,
//         title: 'Article 2',
//         imageUrl: 'image2.jpg',
//     },
//     {
//         id: 3,
//         title: 'Article 3',
//         imageUrl: 'image3.jpg',
//     },
//     {
//         id: 3,
//         title: 'Article 3',
//         imageUrl: 'image3.jpg',
//     },
//     {
//         id: 3,
//         title: 'Article 3',
//         imageUrl: 'image3.jpg',
//     },

//     // Add more articles as needed
// ];

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
                        <h2 className="text-sm font-semibold">{article.title}</h2>
                    </div>
                ))) : null
            }
        </div>
    );
}

export default ArticleList;
