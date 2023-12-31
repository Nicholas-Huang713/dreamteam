import { useContext } from 'react';
import Modal from '../../components/Modal/Modal';
import { UserContext } from '../../providers/UserProvider';

const ArticleModal = () => {
    const { articleModalData, articleModalOpen, setArticleModalOpen } = useContext(UserContext);
    const { image, title, link } = articleModalData;

    return (
        <>
            <Modal
                isOpen={articleModalOpen}
                setIsOpen={() => setArticleModalOpen(prev => !prev)}
            >
                {articleModalOpen ? (
                    <article className="bg-white w-100">
                        <h1 className="text-3xl font-bold mb-4">{title}</h1>
                        <img src={image} alt={title} className="w-full rounded-lg mb-4" />
                        {/* <p className="text-gray-500 mb-4">{title}</p> */}
                        {/* <p className="text-gray-700 font-semibold mb-2">Author: {author}</p> */}
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-orange-600 hover:underline"
                        >
                            Read More
                        </a>
                    </article>
                ) : null

                }

            </Modal >
        </>
    );
}

export default ArticleModal;
