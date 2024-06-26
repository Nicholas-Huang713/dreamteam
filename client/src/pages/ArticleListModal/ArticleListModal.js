import { useContext } from 'react';
import Modal from '../../components/Modal/Modal';
import { UserContext } from '../../providers/UserProvider';
import CloseButton from '../../components/CloseButton/CloseButton';

const ArticleListModal = () => {
    const { articleListModalOpen, setArticleListModalOpen, articleListModalData, setArticleListModalData } = useContext(UserContext);

    const handleCloseModal = () => {
        setArticleListModalOpen(prev => !prev);
        setArticleListModalData([])
    }
    return (
        <Modal
            isOpen={articleListModalOpen}
            setIsOpen={handleCloseModal}
        >
            <CloseButton setIsOpen={handleCloseModal} />
            <ul className="divide-y divide-gray-100 mt-1">
                {articleListModalData.length > 0 && articleListModalData.map((article, index) => (
                    <li
                        key={index}
                        className={` gap-x-6 py-5`}
                    >
                        <img
                            src={article.image}
                            alt={article.title}
                            className="h-auto w-full rounded-md"
                            loading="lazy"
                        />
                        <div>
                            <h2 className="text-xl font-semibold mb-2">{article.title}</h2>
                            <a
                                href={article.link}
                                className="text-orange-500 hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                Read More
                            </a>
                        </div>
                    </li>
                ))}
            </ul>
        </Modal>
    );
}

export default ArticleListModal;
