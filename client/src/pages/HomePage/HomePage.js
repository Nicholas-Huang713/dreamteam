import { useEffect, useState, useContext } from 'react';
import Table from '../../components/Table/Table';
import { getTeamNews } from '../../api/nbaNewsService';
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
    const { setArticleModalData, setArticleModalOpen } = useContext(UserContext);
    const [articles, setArticles] = useState([]);
    const [isLoadingImages, setIsLoadingImages] = useState(false);

    const handleSelectOptionChange = (teamName) => {
        retrieveTeamArticles(teamName);
    };

    const retrieveTeamArticles = async (team) => {
        try {
            setIsLoadingImages(true);
            const teamArticlesFromApi = await getTeamNews(team);
            setIsLoadingImages(false);
            setArticles(teamArticlesFromApi);
            console.log(teamArticlesFromApi);
        } catch (e) {
            console.log('error', e)
        }
    };

    useEffect(() => {
        if (affiliation.team && affiliation.team !== '') {
            retrieveTeamArticles(affiliation.displayName);
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
                (
                    <div className="flex h-10">
                        <div className="flex-1 border h-full"></div>
                        <div className="flex-1 border h-full"></div>
                        <div className="flex-1 border h-full"></div>
                        <div className="flex-1 border h-full"></div>
                    </div>
                )
                : <ArticleList
                    articles={articles}
                    setModalData={setArticleModalData}
                    setModalOpen={() => setArticleModalOpen(prev => !prev)}
                />

            }
        </>
    );
}

export default HomePage;
