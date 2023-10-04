import { useEffect, useState, useContext } from 'react';
import Table from '../../components/Table/Table';
import { getTeamNews, getNbaNews } from '../../api/nbaNewsService';
import ArticleList from '../../components/ArticleList/ArticleList';
import { useSelector } from 'react-redux/es/hooks/useSelector';
import { getUser } from '../../api/userService';
import { useDispatch } from 'react-redux';
import { updateUserData } from '../../store/actions/userActions';
import SelectComponent from '../../components/SelectComponent/SelectComponent';
import { nbaTeamData } from '../../api/nbaTeamData';
import { UserContext } from '../../providers/UserProvider';

const filteredTeamData = nbaTeamData.map((data) => {
    return {
        value: data.displayName
    }
})

const HomePage = () => {
    const dispatch = useDispatch();
    const { affiliation, firstName } = useSelector(state => state.user);
    const { setArticleModalData, setArticleModalOpen, setArticleListModalData, setArticleListModalOpen } = useContext(UserContext);
    const [teamArticles, setTeamArticles] = useState([]);
    const [nbaArticles, setNbaArticles] = useState([]);
    const [isLoadingImages, setIsLoadingImages] = useState(false);

    const handleSelectOptionChange = (teamName) => {
        retrieveTeamArticles(teamName);
    };

    const retrieveTeamArticles = async (team, pageSize = 4) => {
        try {
            setIsLoadingImages(true);
            const teamArticlesFromApi = await getTeamNews(team, pageSize);
            setIsLoadingImages(false);
            setTeamArticles(teamArticlesFromApi);
        } catch (e) {
            console.log('error', e)
        }
    };

    const retrieveNbaArticles = async (pageSize = 4) => {
        try {
            setIsLoadingImages(true);
            const nbaArticlesFromApi = await getNbaNews(pageSize);
            setIsLoadingImages(false);
            setNbaArticles(nbaArticlesFromApi);
        } catch (e) {
            console.log('error', e)
        }
    };

    const retrieveNbaArticlesForModal = async (pageSize) => {
        try {
            const nbaArticlesFromApi = await getNbaNews(pageSize);
            setArticleListModalData(nbaArticlesFromApi)
        } catch (e) {
            console.log('error', e)
        }
    }

    const retrieveTeamArticlesForModal = async (team, pageSize) => {
        try {
            const teamArticlesFromApi = await getTeamNews(team, pageSize);
            setArticleListModalData(teamArticlesFromApi)
        } catch (e) {
            console.log('error', e)
        }
    };

    const renderLoadingArticleComponent = () => {
        return (
            <div className="flex h-10">
                <div className="flex-1 border h-full"></div>
                <div className="flex-1 border h-full"></div>
                <div className="flex-1 border h-full"></div>
                <div className="flex-1 border h-full"></div>
            </div>
        )
    };

    const handleSeeMoreClick = async (type) => {
        if (type === "team") await retrieveTeamArticlesForModal(affiliation.displayName, 10);
        if (type === "nba") await retrieveNbaArticlesForModal(10);
        setArticleListModalOpen(prev => !prev)
    };

    const renderSeeMore = (articleType) => {
        return (
            <div className="flex justify-end my-2">
                <button
                    onClick={() => handleSeeMoreClick(articleType)}
                    className="text-orange-600 hover:underline"
                >
                    See more
                </button>
            </div>
        )
    };

    useEffect(() => {
        if (affiliation.team && affiliation.team !== '') {
            retrieveTeamArticles(affiliation.displayName);
            retrieveNbaArticles();
        }
    }, [affiliation.displayName])

    useEffect(() => {
        if (!firstName) {
            const getUserInfo = async () => {
                const info = await getUser();
                dispatch(updateUserData(info));
            }
            getUserInfo()
        }
    }, [dispatch, firstName])


    return (
        <>
            <SelectComponent
                currentOptions={filteredTeamData}
                showLabel={false}
                handleOptionChange={handleSelectOptionChange}
                defaultVal={affiliation.displayName}
            />
            {isLoadingImages ?
                renderLoadingArticleComponent()
                : <>
                    <ArticleList
                        articles={teamArticles}
                        setModalData={setArticleModalData}
                        setModalOpen={() => setArticleModalOpen(prev => !prev)}
                    />
                    {renderSeeMore('team')}
                </>
            }

            <h1>NBA News</h1>
            {isLoadingImages ?
                renderLoadingArticleComponent()
                : <>
                    <ArticleList
                        articles={nbaArticles}
                        setModalData={setArticleModalData}
                        setModalOpen={() => setArticleModalOpen(prev => !prev)}
                    />
                    {renderSeeMore('nba')}
                </>

            }


        </>
    );
}

export default HomePage;
