import { useEffect, useState, useContext } from 'react';
import { getTeamNews, getNbaNews } from '../../api/nbaNewsService';
import ArticleList from '../../components/ArticleList/ArticleList';
import { getUser } from '../../api/userService';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserData } from '../../store/actions/userActions';
import SelectComponent from '../../components/SelectComponent/SelectComponent';
import { nbaTeamData } from '../../api/nbaTeamData';
import { UserContext } from '../../providers/UserProvider';
import GameHistoryTable from '../../components/GameHistoryTable/GameHistoryTable';
import { getTeamHighlights } from '../../api/userService';
import axios from 'axios';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const filteredTeamData = nbaTeamData.map((data) => {
    return {
        value: data.displayName
    }
})

const HomePage = () => {
    const dispatch = useDispatch();
    const { affiliation, firstName } = useSelector(state => state.user);
    const { setArticleModalData, setArticleModalOpen, setArticleListModalData, setArticleListModalOpen } = useContext(UserContext);
    const topGamesList = useSelector(state => state.topGames);
    const [teamHighlights, setTeamHighlights] = useState([]);
    const [nbaArticles, setNbaArticles] = useState([]);
    const [isLoadingImages, setIsLoadingImages] = useState(false);
    const [currentViewingTeam, setCurrentViewingTeam] = useState(false);

    const handleSelectOptionChange = (teamName) => {
        retrieveTeamHighlights(teamName);
        setCurrentViewingTeam(teamName);
    };

    const retrieveTeamHighlights = async (team, pageSize = 4) => {
        try {
            setIsLoadingImages(true);
            // const teamArticlesFromApi = await getTeamNews(team, pageSize);
            const res = await axios.get(`${getTeamHighlights}/${team}`);
            setTeamHighlights(res.data.items);
            setIsLoadingImages(false);
        } catch (e) {
            console.log('error', e)
        }
    };

    // const retrieveNbaArticles = async (pageSize = 4) => {
    //     try {
    //         setIsLoadingImages(true);
    //         const nbaArticlesFromApi = await getNbaNews(pageSize);
    //         setIsLoadingImages(false);
    //         setNbaArticles(nbaArticlesFromApi);
    //     } catch (e) {
    //         console.log('error', e)
    //     }
    // };

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

    // const renderLoadingArticleComponent = () => {
    //     return (
    //         <div className="flex h-10">
    //             <div className="flex-1 border h-full"></div>
    //             <div className="flex-1 border h-full"></div>
    //             <div className="flex-1 border h-full"></div>
    //             <div className="flex-1 border h-full"></div>
    //         </div>
    //     )
    // };

    const handleSeeMoreClick = async (type) => {
        if (type === "team") await retrieveTeamArticlesForModal(currentViewingTeam, 10);
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
            retrieveTeamHighlights(affiliation.displayName);
            // retrieveNbaArticles();
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

    // const getVideos = async () => {
    //     const res = await axios.get(`${getTeamHighlights}/lakers`)
    //     // const res = await axios.get(`/api/youtube?teamName=${teamName}`)
    //     console.log('response', res.data)
    // }
    // useEffect(() => {
    //     getVideos()
    // }, [])

    return (
        <>
            <SelectComponent
                currentOptions={filteredTeamData}
                showLabel={false}
                handleOptionChange={handleSelectOptionChange}
                defaultVal={affiliation.displayName}
            />
            {teamHighlights.length > 0 ?
                <ul className='flex flex-row flex-wrap justify-between'>
                    {teamHighlights.map((video) => (
                        <li key={video.id.videoId} className='w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-2'>
                            <iframe
                                className='w-full h-full'
                                title={video.snippet.title}
                                // width="560"
                                height="auto"
                                // height="315"
                                src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                frameBorder="0"
                                allowFullScreen
                            ></iframe>
                            {/* <VideoPlayer videoId={video.id.videoId} /> */}
                        </li>
                    ))}
                </ul>
                : null
            }

            {/* {isLoadingImages ?
                renderLoadingArticleComponent()
                : <>
                    <ArticleList
                        articles={teamArticles}
                        setModalData={setArticleModalData}
                        setModalOpen={() => setArticleModalOpen(prev => !prev)}
                    />
                    {renderSeeMore('team')}
                </>
            } */}
            <div style={{ marginTop: '-20px', marginBottom: '30px' }}>

                <GameHistoryTable gameHistory={topGamesList} isTopGames={true} />
            </div>
            <h1>NBA News</h1>
            {/* {isLoadingImages ?
                renderLoadingArticleComponent()
                : <>
                    <ArticleList
                        articles={nbaArticles}
                        setModalData={setArticleModalData}
                        setModalOpen={() => setArticleModalOpen(prev => !prev)}
                    />
                    {renderSeeMore('nba')}
                </>

            } */}


        </>
    );
}

export default HomePage;
